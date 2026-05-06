const Product = require('../models/productModel');
const fs = require('fs');
const path = require('path');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { title, description, category, priceVariations } = req.body;
        const image = req.file ? req.file.path.replace(/\\/g, '/') : null;

        if (!title || !description || !category || !image) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(400).json({ message: 'Please fill all fields including image.' });
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

        const newProduct = new Product({ title, description, category, priceVariations: parsedPriceVariations, image });
        const saved = await newProduct.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("addProduct error:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { title, description, category, priceVariations } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(404).json({ message: 'Product not found' });
        }

        if (req.file) {
            if (product.image) fs.unlink(path.resolve(product.image), () => {});
            product.image = req.file.path.replace(/\\/g, '/');
        }

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

        const updated = await product.save();
        res.status(200).json(updated);
    } catch (error) {
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