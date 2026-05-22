const mongoose = require('mongoose');

const VALID_SIZES = [
    '100 ML', '160 ML', '200 ML - 24 Pack', '200 ML - 30 Pack',
    '250 ML', '300 ML', '500 ML', '600 ML',
    '600 ML - With Sugar', '750 ML'
];

const priceVariationSchema = new mongoose.Schema({
    size: { type: String, required: true, enum: VALID_SIZES },
    price: { type: Number, required: true, min: 0 }
});

const productSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Please add a title'], trim: true },
    slug: { type: String, unique: true, lowercase: true },   //sirf ek baar
    description: { type: String, required: [true, 'Please add a description'] },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    category: { type: String, required: [true, 'Please add a category'] },
    priceVariations: {
        type: [priceVariationSchema],
        required: [true, 'Please add at least one price variation'],
        validate: {
            validator: function (v) { return v && v.length > 0; },
            message: 'At least one price variation is required'
        }
    },
    image: { type: String, required: [true, 'Please add an image'] }
}, { timestamps: true });

// Auto-generate slug from title (only if slug not manually provided)
productSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
    // Unique sizes check
    const sizes = this.priceVariations.map(v => v.size);
    if (sizes.length !== new Set(sizes).size) {
        return next(new Error('Duplicate sizes are not allowed'));
    }
    next();
});

productSchema.virtual('priceRange').get(function () {
    if (!this.priceVariations?.length) return { min: 0, max: 0 };
    const prices = this.priceVariations.map(v => v.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);