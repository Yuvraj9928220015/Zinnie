const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getAllBlogs,
    getBlogBySlug,
    getAdminBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    togglePublish
} = require('../controllers/blogController');

// ─── Multer Config for Blog Cover Images ───
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `blog-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only image files are allowed!'), false);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// ─── PUBLIC ROUTES ───
// GET all published blogs (with pagination, filter)
router.get('/', getAllBlogs);

// GET single published blog by slug
router.get('/post/:slug', getBlogBySlug);

// ─── ADMIN ROUTES ──────────────────────────────────────────────────────────

// GET all blogs (drafts + published)
router.get('/admin/all', getAdminBlogs);

// ⚠️ IMPORTANT: /admin/create MUST be before /admin/:id
// otherwise Express treats "create" as an :id param → 404
router.post('/admin/create', upload.single('coverImage'), createBlog);

// GET single blog by ID (for edit form)
router.get('/admin/:id', getBlogById);

// PUT update blog
router.put('/admin/:id', upload.single('coverImage'), updateBlog);

// PATCH toggle publish/draft
router.patch('/admin/:id/toggle', togglePublish);

// DELETE blog
router.delete('/admin/:id', deleteBlog);

module.exports = router;