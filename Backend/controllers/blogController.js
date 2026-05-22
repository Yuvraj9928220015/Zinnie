const Blog = require('../models/blog');
const path = require('path');
const fs = require('fs');

exports.getAllBlogs = async (req, res) => {
    try {
        const { category, tag, page = 1, limit = 9 } = req.query;

        const filter = { isPublished: true };
        if (category) filter.category = category;
        if (tag) filter.tags = tag;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [blogs, total] = await Promise.all([
            Blog.find(filter)
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .select('-content'),
            Blog.countDocuments(filter)
        ]);

        res.json({
            success: true,
            blogs,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page),
            total
        });
    } catch (err) {
        console.error('getAllBlogs error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { slug: req.params.slug, isPublished: true },
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        res.json({ success: true, blog });
    } catch (err) {
        console.error('getBlogBySlug error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getAdminBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})
            .sort({ createdAt: -1 })
            .select('-content');

        res.json({ success: true, blogs });
    } catch (err) {
        console.error('getAdminBlogs error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.json({ success: true, blog });
    } catch (err) {
        console.error('getBlogById error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { title, excerpt, content, category, tags, author, isPublished } = req.body;

        const coverImage = req.file
            ? `/uploads/${req.file.filename}`
            : '';

        const tagsArray = tags
            ? tags.split(',').map(t => t.trim()).filter(Boolean)
            : [];

        const blog = new Blog({
            title,
            excerpt,
            content,
            category,
            tags: tagsArray,
            author: author || 'Admin',
            coverImage,
            isPublished: isPublished === 'true' || isPublished === true
        });

        await blog.save(); // pre('save') hook will generate slug + publishedAt
        res.status(201).json({ success: true, message: 'Blog created successfully', blog });
    } catch (err) {
        console.error('createBlog error:', err);
        // Handle duplicate slug error gracefully
        if (err.code === 11000 && err.keyPattern?.slug) {
            return res.status(400).json({ success: false, message: 'A blog with a similar title already exists. Please use a different title.' });
        }
        res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, excerpt, content, category, tags, author, isPublished } = req.body;

        // FIX: Use findById + save so pre('save') hook fires for slug regeneration
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        const publishedBool = isPublished === 'true' || isPublished === true;

        blog.title = title;
        blog.excerpt = excerpt;
        blog.content = content;
        blog.category = category;
        blog.author = author;
        blog.isPublished = publishedBool;
        blog.tags = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];

        if (req.file) {
            // Delete old cover image if exists
            if (blog.coverImage) {
                const oldPath = path.join(__dirname, '..', blog.coverImage);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            blog.coverImage = `/uploads/${req.file.filename}`;
        }

        // Manually set publishedAt if publishing for the first time
        if (publishedBool && !blog.publishedAt) {
            blog.publishedAt = new Date();
        }

        await blog.save();

        res.json({ success: true, message: 'Blog updated successfully', blog });
    } catch (err) {
        console.error('updateBlog error:', err);
        if (err.code === 11000 && err.keyPattern?.slug) {
            return res.status(400).json({ success: false, message: 'A blog with a similar title already exists.' });
        }
        res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        // Delete cover image from uploads if exists
        if (blog.coverImage) {
            const imgPath = path.join(__dirname, '..', blog.coverImage);
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }

        res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (err) {
        console.error('deleteBlog error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.togglePublish = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        blog.isPublished = !blog.isPublished;
        if (blog.isPublished && !blog.publishedAt) blog.publishedAt = new Date();
        await blog.save();

        res.json({
            success: true,
            message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully`,
            isPublished: blog.isPublished
        });
    } catch (err) {
        console.error('togglePublish error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};