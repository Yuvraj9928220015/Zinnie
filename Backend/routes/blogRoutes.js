const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const router = express.Router();
const Blog = require("../models/Blog");
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, author, content, altTag, pageTitle, metaDescription, script } = req.body;
    let { urlHandle } = req.body;

    if (urlHandle) urlHandle = urlHandle.trim().toLowerCase().slice(0, 80);

    const existing = await Blog.findOne({ urlHandle });
    if (existing) {
      return res.json({ success: false, message: "URL handle already exists, use a different one." });
    }

    const newBlog = new Blog({
      title,
      author,
      content,
      altTag,
      pageTitle,
      metaDescription,
      urlHandle,
      script,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newBlog.save();
    res.json({ success: true, blog: newBlog });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE (by urlHandle)
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ urlHandle: req.params.slug });
    if (!blog) return res.json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/:slug", upload.single("image"), async (req, res) => {
  try {
    const blog = await Blog.findOne({ urlHandle: req.params.slug });
    if (!blog) return res.json({ success: false, message: "Blog not found" });

    const { title, author, content, altTag, pageTitle, metaDescription, script } = req.body;
    let { urlHandle } = req.body;

    if (urlHandle) urlHandle = urlHandle.trim().toLowerCase().slice(0, 80);

    blog.title = title || blog.title;
    blog.author = author || blog.author;
    blog.content = content || blog.content;
    blog.altTag = altTag || blog.altTag;
    blog.pageTitle = pageTitle || blog.pageTitle;
    blog.metaDescription = metaDescription || blog.metaDescription;
    blog.urlHandle = urlHandle || blog.urlHandle;
    blog.script = script || blog.script;
    if (req.file) blog.image = `/uploads/${req.file.filename}`;

    await blog.save();
    res.json({ success: true, blog });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// DELETE
router.delete("/:slug", async (req, res) => {
  try {
    await Blog.findOneAndDelete({ urlHandle: req.params.slug });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;