const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    excerpt: {
        type: String,
        trim: true,
        maxlength: [300, 'Excerpt cannot exceed 300 characters']
    },
    content: {
        type: String,
        required: [true, 'Blog content is required']
    },
    coverImage: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: 'General',
        trim: true
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    author: {
        type: String,
        default: 'Admin',
        trim: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Auto-generate slug from title before saving
blogSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            + '-' + Date.now();
    }
    if (this.isPublished && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});

module.exports = mongoose.model('Blog', blogSchema);