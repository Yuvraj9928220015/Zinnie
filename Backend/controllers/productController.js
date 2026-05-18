const Product = require('../models/productModel');
const fs = require('fs');
const path = require('path');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Slug generate helper
function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

exports.addProduct = async (req, res) => {
    try {
        const {
            title, description, category,
            priceVariations, metaTitle, metaDescription, slug
        } = req.body;

        const image = req.file ? req.file.path.replace(/\\/g, '/') : null;

        // ✅ metaTitle, metaDescription, slug are now OPTIONAL (default values set)
        if (!title || !description || !category) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(400).json({ message: 'Title, description aur category required hain.' });
        }

        if (!image) {
            return res.status(400).json({ message: 'Image required hai.' });
        }

        let parsedPriceVariations;
        try {
            parsedPriceVariations = typeof priceVariations === 'string'
                ? JSON.parse(priceVariations)
                : priceVariations;
        } catch {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(400).json({ message: 'Invalid price variations format' });
        }

        if (!parsedPriceVariations?.length) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(400).json({ message: 'At least one price variation is required' });
        }

        // ✅ Slug: provided use karo, warna title se auto-generate
        const finalSlug = slug
            ? slug.toLowerCase().trim().replace(/\s+/g, '-')
            : generateSlug(title);

        // ✅ Slug uniqueness check
        const existing = await Product.findOne({ slug: finalSlug });
        if (existing) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(400).json({ message: `Slug "${finalSlug}" already exists. Koi aur slug use karein.` });
        }

        const newProduct = new Product({
            title,
            description,
            category,
            priceVariations: parsedPriceVariations,
            image,
            metaTitle: metaTitle || title,           // fallback to title
            metaDescription: metaDescription || description.slice(0, 160),  // fallback
            slug: finalSlug,
        });

        const saved = await newProduct.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("addProduct error:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const {
            title, description, category,
            priceVariations, metaTitle, metaDescription, slug
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(404).json({ message: 'Product not found' });
        }

        // Image update
        if (req.file) {
            if (product.image) {
                fs.unlink(path.resolve(product.image), () => {});
            }
            product.image = req.file.path.replace(/\\/g, '/');
        }

        // Price variations update
        if (priceVariations) {
            try {
                product.priceVariations = typeof priceVariations === 'string'
                    ? JSON.parse(priceVariations)
                    : priceVariations;
            } catch {
                return res.status(400).json({ message: 'Invalid price variations format' });
            }
        }

        if (title) product.title = title;
        if (description) product.description = description;
        if (category) product.category = category;
        if (metaTitle !== undefined) product.metaTitle = metaTitle;
        if (metaDescription !== undefined) product.metaDescription = metaDescription;

        // ✅ Slug update: check uniqueness before saving
        if (slug) {
            const newSlug = slug.toLowerCase().trim().replace(/\s+/g, '-');
            if (newSlug !== product.slug) {
                const existing = await Product.findOne({ slug: newSlug });
                if (existing) {
                    return res.status(400).json({ message: `Slug "${newSlug}" already exists.` });
                }
                product.slug = newSlug;
            }
        }

        const updated = await product.save();
        res.status(200).json(updated);
    } catch (error) {
        console.error("updateProduct error:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.image) fs.unlink(path.resolve(product.image), () => {});
        await product.deleteOne();
        res.status(200).json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};