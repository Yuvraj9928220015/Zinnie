'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// ✅ MDX Editor — SSR disabled (uses browser APIs)
// npm install @uiw/react-md-editor
// Add to your root layout.js:
// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
const MDPreview = dynamic(() => import('@uiw/react-markdown-preview'), { ssr: false });

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.zinniezeera.com';

const CATEGORIES = [
    'General', 'Technology', 'Fashion', 'Lifestyle',
    'Health', 'Travel', 'Food', 'Business', 'Other'
];

// ─── Blog Preview Modal ───────────────────────────────────────────────────────
function PreviewModal({ form, previewUrl, onClose }) {
    return (
        <div style={modal.overlay} onClick={onClose}>
            <div style={modal.box} onClick={(e) => e.stopPropagation()}>
                <div style={modal.header}>
                    <span style={modal.headerTitle}>👁 Blog Preview</span>
                    <button onClick={onClose} style={modal.closeBtn}>✕ Close</button>
                </div>
                <div style={modal.body}>
                    {previewUrl && (
                        <img src={previewUrl} alt="Cover" style={modal.coverImg} />
                    )}
                    <div style={modal.meta}>
                        <span style={modal.category}>{form.category}</span>
                        {form.tags && form.tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                            <span key={tag} style={modal.tag}>#{tag}</span>
                        ))}
                    </div>
                    <h1 style={modal.title}>{form.title || 'Untitled Blog'}</h1>
                    {form.excerpt && <p style={modal.excerpt}>{form.excerpt}</p>}
                    <div style={modal.authorRow}>
                        <span style={modal.authorDot}>{form.author || 'Admin'}</span>
                        <span style={{ color: '#94a3b8' }}>•</span>
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                            {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                    <hr style={modal.hr} />
                    <div data-color-mode="light" style={modal.content}>
                        <MDPreview source={form.content || '_No content yet…_'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const modal = {
    overlay: {
        position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)',
        zIndex: 1000, display: 'flex', alignItems: 'flex-start',
        justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto',
        backdropFilter: 'blur(4px)',
    },
    box: {
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 760,
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)', overflow: 'hidden',
        maxHeight: '90vh', overflowY: 'auto',
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 1.5rem', background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 10,
    },
    headerTitle: { fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' },
    closeBtn: {
        background: '#ef4444', color: '#fff', border: 'none',
        padding: '0.35rem 0.85rem', borderRadius: 6, cursor: 'pointer',
        fontSize: '0.82rem', fontWeight: 600,
    },
    body: { padding: '2rem' },
    coverImg: {
        width: '100%', height: 280, objectFit: 'cover',
        borderRadius: 12, marginBottom: '1.25rem', display: 'block',
    },
    meta: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '0.75rem' },
    category: {
        background: '#eff6ff', color: '#2563eb', fontSize: '0.75rem',
        fontWeight: 600, padding: '2px 10px', borderRadius: 20,
    },
    tag: {
        background: '#f1f5f9', color: '#64748b', fontSize: '0.75rem',
        padding: '2px 10px', borderRadius: 20,
    },
    title: { fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0', lineHeight: 1.25 },
    excerpt: { fontSize: '1.05rem', color: '#475569', lineHeight: 1.65, margin: '0.5rem 0 1rem' },
    authorRow: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: '1rem' },
    authorDot: { fontWeight: 600, fontSize: '0.9rem', color: '#374151' },
    hr: { border: 'none', borderTop: '1px solid #e2e8f0', margin: '1.25rem 0' },
    content: { fontSize: '1rem', lineHeight: 1.8, color: '#1e293b' },
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AddEditBlog() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const blogId = searchParams.get('id');
    const isEdit = !!blogId;

    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'General',
        tags: '',
        author: 'Admin',
        isPublished: false,
    });

    const [coverImage, setCoverImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [editorMode, setEditorMode] = useState('edit'); // 'edit' | 'live' | 'preview'
    const fileRef = useRef(null);

    // ─── Fetch blog when editing ──────────────────────────────────────────────
    useEffect(() => {
        if (!blogId) return;
        const fetchBlog = async () => {
            setFetchLoading(true);
            try {
                const res = await fetch(`${API_BASE}/api/blogs/admin/${blogId}`);
                const data = await res.json();
                if (data.success) {
                    const b = data.blog;
                    setForm({
                        title: b.title || '',
                        excerpt: b.excerpt || '',
                        content: b.content || '',
                        category: b.category || 'General',
                        tags: Array.isArray(b.tags) ? b.tags.join(', ') : '',
                        author: b.author || 'Admin',
                        isPublished: b.isPublished || false,
                    });
                    if (b.coverImage) setPreviewUrl(`${API_BASE}${b.coverImage}`);
                }
            } catch {
                setError('Failed to load blog data');
            } finally {
                setFetchLoading(false);
            }
        };
        fetchBlog();
    }, [blogId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!form.title.trim()) return setError('Title is required');
        if (!form.content.trim()) return setError('Content is required');

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('excerpt', form.excerpt);
            formData.append('content', form.content);   // raw Markdown
            formData.append('category', form.category);
            formData.append('tags', form.tags);
            formData.append('author', form.author);
            formData.append('isPublished', String(form.isPublished));
            if (coverImage) formData.append('coverImage', coverImage);

            const url = isEdit
                ? `${API_BASE}/api/blogs/admin/${blogId}`
                : `${API_BASE}/api/blogs/admin/create`;
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, { method, body: formData });
            const data = await res.json();

            if (data.success) {
                setSuccess(isEdit ? 'Blog updated successfully!' : 'Blog created successfully!');
                setTimeout(() => router.push('/admin/blogList'), 1500);
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch {
            setError('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) return <div style={s.center}>Loading blog data...</div>;

    return (
        <div style={s.container}>
            {/* Preview Modal */}
            {showPreview && (
                <PreviewModal
                    form={form}
                    previewUrl={previewUrl}
                    onClose={() => setShowPreview(false)}
                />
            )}

            {/* Header */}
            <div style={s.header}>
                <div>
                    <h1 style={s.title}>{isEdit ? 'Edit Blog' : 'Create New Blog'}</h1>
                    <p style={s.subtitle}>{isEdit ? 'Update your blog post' : 'Write and publish a new blog post'}</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setShowPreview(true)} style={s.previewBtn}>
                        👁 Preview
                    </button>
                    <button onClick={() => router.push('/admin/blogList')} style={s.backBtn}>
                        ← Back to List
                    </button>
                </div>
            </div>

            {error && <div style={s.errorBox}>{error}</div>}
            {success && <div style={s.successBox}>{success}</div>}

            <form onSubmit={handleSubmit}>
                <div style={s.grid}>

                    {/* ── LEFT COLUMN ──────────────────────────────── */}
                    <div style={s.leftCol}>

                        {/* Title */}
                        <div style={s.field}>
                            <label style={s.label}>Blog Title *</label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Enter blog title..."
                                style={s.input}
                                required
                            />
                        </div>

                        {/* Excerpt */}
                        <div style={s.field}>
                            <label style={s.label}>Excerpt / Short Description</label>
                            <textarea
                                name="excerpt"
                                value={form.excerpt}
                                onChange={handleChange}
                                placeholder="Brief description shown on blog cards..."
                                style={{ ...s.input, height: 80, resize: 'vertical' }}
                                maxLength={300}
                            />
                            <span style={s.charCount}>{form.excerpt.length}/300</span>
                        </div>

                        {/* MDX Editor */}
                        <div style={s.field}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={s.label}>Blog Content * (Markdown)</label>
                                <div style={s.modeTabs}>
                                    {['edit', 'live', 'preview'].map(mode => (
                                        <button
                                            key={mode}
                                            type="button"
                                            onClick={() => setEditorMode(mode)}
                                            style={{
                                                ...s.modeTab,
                                                background: editorMode === mode ? '#0f172a' : '#f1f5f9',
                                                color: editorMode === mode ? '#fff' : '#64748b',
                                            }}
                                        >
                                            {mode === 'edit' ? '✏️ Edit' : mode === 'live' ? '⚡ Live' : '👁 Preview'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Markdown Tips */}
                            <div style={s.tipBox}>
                                <span style={s.tipTitle}>📌 Markdown Tips:</span>
                                <span style={s.tip}><code>**bold**</code></span>
                                <span style={s.tip}><code>*italic*</code></span>
                                <span style={s.tip}><code># H1</code></span>
                                <span style={s.tip}><code>## H2</code></span>
                                <span style={s.tip}><code>- list</code></span>
                                <span style={s.tip}><code>1. ordered</code></span>
                                <span style={s.tip}><code>[link](url)</code></span>
                                <span style={s.tip}><code>![img](url)</code></span>
                                <span style={s.tip}><code>`code`</code></span>
                                <span style={s.tip}><code>```block```</code></span>
                                <span style={s.tip}><code>&gt; quote</code></span>
                                <span style={s.tipHighlight}>Table: | Col1 | Col2 | → Enter → | --- | --- |</span>
                            </div>

                            <div data-color-mode="light">
                                <MDEditor
                                    value={form.content}
                                    onChange={(val) =>
                                        setForm((prev) => ({ ...prev, content: val || '' }))
                                    }
                                    height={480}
                                    preview={editorMode}
                                    visibleDragbar={true}
                                    enableScroll={true}
                                    style={{
                                        borderRadius: 8,
                                        border: '1px solid #e2e8f0',
                                        fontSize: '0.95rem',
                                    }}
                                    // ✅ This enables GFM tables
                                    previewOptions={{
                                        rehypePlugins: [],
                                        remarkPlugins: [],
                                    }}
                                    textareaProps={{
                                        placeholder: `Write your blog here using Markdown...

## Example Table:
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |

Use the toolbar above or type Markdown directly.`,
                                    }}
                                />
                            </div>

                            {/* Table Quick Insert */}
                            <button
                                type="button"
                                onClick={() => {
                                    const tableTemplate = `\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Row 1    | Data     | Data     |\n| Row 2    | Data     | Data     |\n`;
                                    setForm(prev => ({ ...prev, content: (prev.content || '') + tableTemplate }));
                                }}
                                style={s.tableBtn}
                            >
                                ＋ Insert Table
                            </button>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN ──────────────────────────────── */}
                    <div style={s.rightCol}>

                        {/* Cover Image */}
                        <div style={s.card}>
                            <h3 style={s.cardTitle}>Cover Image</h3>
                            {previewUrl ? (
                                <div style={{ position: 'relative' }}>
                                    <img src={previewUrl} alt="Preview" style={s.imgPreview} />
                                    <button
                                        type="button"
                                        onClick={() => { setPreviewUrl(''); setCoverImage(null); }}
                                        style={s.removeImg}
                                    >
                                        ✕ Remove
                                    </button>
                                </div>
                            ) : (
                                <div style={s.uploadBox} onClick={() => fileRef.current.click()}>
                                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>🖼️</div>
                                    <p style={{ color: '#374151', fontWeight: 500, margin: '4px 0', fontSize: '0.9rem' }}>
                                        Click to upload cover image
                                    </p>
                                    <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0 }}>
                                        PNG, JPG, WebP up to 5MB
                                    </p>
                                </div>
                            )}
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                            {!previewUrl && (
                                <button type="button" onClick={() => fileRef.current.click()} style={s.uploadBtn}>
                                    Choose Image
                                </button>
                            )}
                        </div>

                        {/* SEO Preview Card */}
                        <div style={s.card}>
                            <h3 style={s.cardTitle}>🔍 SEO Preview</h3>
                            <div style={s.seoBox}>
                                <div style={s.seoUrl}>zinniezeera.com › blog › {form.title
                                    ? form.title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-').slice(0, 40)
                                    : 'your-blog-slug'}</div>
                                <div style={s.seoTitle}>
                                    {form.title ? (form.title.length > 60 ? form.title.slice(0, 57) + '...' : form.title) : 'Blog Title'}
                                    <span style={{ color: form.title.length > 60 ? '#ef4444' : '#94a3b8', fontSize: '0.7rem', marginLeft: 6 }}>
                                        {form.title.length}/60
                                    </span>
                                </div>
                                <div style={s.seoDesc}>
                                    {form.excerpt
                                        ? (form.excerpt.length > 155 ? form.excerpt.slice(0, 152) + '...' : form.excerpt)
                                        : 'Meta description will show here. Write a good excerpt for SEO (max 155 chars).'}
                                    <span style={{ color: form.excerpt.length > 155 ? '#ef4444' : '#94a3b8', fontSize: '0.7rem', marginLeft: 4 }}>
                                        {form.excerpt.length}/155
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Publish Settings */}
                        <div style={s.card}>
                            <h3 style={s.cardTitle}>Publish Settings</h3>

                            <div style={s.field}>
                                <label style={s.label}>Category</label>
                                <select name="category" value={form.category} onChange={handleChange} style={s.select}>
                                    {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>

                            <div style={s.field}>
                                <label style={s.label}>Author</label>
                                <input name="author" value={form.author} onChange={handleChange} style={s.input} />
                            </div>

                            <div style={s.field}>
                                <label style={s.label}>Tags (comma separated)</label>
                                <input
                                    name="tags"
                                    value={form.tags}
                                    onChange={handleChange}
                                    style={s.input}
                                    placeholder="fashion, style, trends"
                                />
                                {/* Tag Pills Preview */}
                                {form.tags && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                                        {form.tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                                            <span key={tag} style={s.tagPill}>#{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Publish Toggle */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <label style={s.label}>Publish immediately</label>
                                    <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '2px 0 0' }}>
                                        {form.isPublished ? '✅ Will go live on save' : '📝 Saved as draft'}
                                    </p>
                                </div>
                                <div
                                    onClick={() => setForm((p) => ({ ...p, isPublished: !p.isPublished }))}
                                    style={{
                                        width: 44, height: 24, borderRadius: 12,
                                        background: form.isPublished ? '#22c55e' : '#cbd5e1',
                                        padding: 2, cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        display: 'flex', alignItems: 'center', flexShrink: 0,
                                    }}
                                >
                                    <div style={{
                                        width: 20, height: 20, borderRadius: '50%',
                                        background: '#fff',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                        transform: form.isPublished ? 'translateX(20px)' : 'translateX(0)',
                                        transition: 'transform 0.2s',
                                    }} />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? 'Saving...' : isEdit ? '✓ Update Blog' : '✓ Create Blog'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowPreview(true)}
                                style={s.previewBtnFull}
                            >
                                👁 Preview Before Publishing
                            </button>
                            <button type="button" onClick={() => router.push('/admin/blogList')} style={s.cancelBtn}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Global MDX editor table styles */}
            <style>{`
                .w-md-editor-text-pre > code,
                .w-md-editor-text-input {
                    font-size: 0.95rem !important;
                    line-height: 1.7 !important;
                }
                .wmde-markdown table {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 1rem 0;
                    font-size: 0.9rem;
                }
                .wmde-markdown table th,
                .wmde-markdown table td {
                    border: 1px solid #e2e8f0;
                    padding: 8px 12px;
                    text-align: left;
                }
                .wmde-markdown table th {
                    background: #f1f5f9;
                    font-weight: 600;
                    color: #1e293b;
                }
                .wmde-markdown table tr:nth-child(even) {
                    background: #f8fafc;
                }
                .wmde-markdown blockquote {
                    border-left: 4px solid #3b82f6;
                    padding-left: 1rem;
                    color: #475569;
                    font-style: italic;
                    margin: 1rem 0;
                    background: #eff6ff;
                    border-radius: 0 6px 6px 0;
                }
                .wmde-markdown pre {
                    background: #0f172a;
                    border-radius: 8px;
                }
                .wmde-markdown img {
                    max-width: 100%;
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
}

const s = {
    container: { padding: '2rem', fontFamily: 'Segoe UI, sans-serif', background: '#f8fafc', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 12 },
    title: { fontSize: '1.8rem', fontWeight: 700, color: '#1e293b', margin: 0 },
    subtitle: { color: '#64748b', fontSize: '0.9rem', marginTop: 4 },
    backBtn: { background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 },
    previewBtn: { background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 },
    previewBtnFull: { background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', padding: '0.6rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, width: '100%' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' },
    leftCol: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
    rightCol: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    field: { display: 'flex', flexDirection: 'column', gap: 6 },
    label: { fontSize: '0.83rem', fontWeight: 600, color: '#374151' },
    input: { padding: '0.55rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.92rem', background: '#fff', outline: 'none', fontFamily: 'inherit', color: '#1e293b', width: '100%', boxSizing: 'border-box' },
    select: { padding: '0.55rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.92rem', background: '#fff', color: '#1e293b', width: '100%', boxSizing: 'border-box' },
    charCount: { fontSize: '0.75rem', color: '#94a3b8', textAlign: 'right' },
    card: { background: '#fff', borderRadius: 12, padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    cardTitle: { fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', margin: 0 },
    uploadBox: { border: '2px dashed #cbd5e1', borderRadius: 8, padding: '2rem 1rem', textAlign: 'center', cursor: 'pointer', background: '#f8fafc' },
    uploadBtn: { background: '#eff6ff', color: '#2563eb', border: 'none', padding: '0.45rem 1rem', borderRadius: 6, cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem', alignSelf: 'flex-start' },
    imgPreview: { width: '100%', height: 160, objectFit: 'cover', borderRadius: 8, display: 'block' },
    removeImg: { position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', padding: '3px 8px', borderRadius: 4, cursor: 'pointer', fontSize: '0.75rem' },
    submitBtn: { background: '#0f172a', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: 8, fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', width: '100%' },
    cancelBtn: { background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.6rem', borderRadius: 8, fontSize: '0.88rem', cursor: 'pointer', width: '100%' },
    errorBox: { background: '#fff1f2', color: '#dc2626', padding: '0.85rem 1rem', borderRadius: 8, marginBottom: '1rem', fontSize: '0.9rem' },
    successBox: { background: '#f0fdf4', color: '#16a34a', padding: '0.85rem 1rem', borderRadius: 8, marginBottom: '1rem', fontSize: '0.9rem' },
    center: { textAlign: 'center', padding: '3rem', color: '#64748b' },
    tipBox: { display: 'flex', flexWrap: 'wrap', gap: 6, padding: '0.6rem 0.85rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', alignItems: 'center' },
    tipTitle: { fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginRight: 4 },
    tip: { fontSize: '0.72rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: 4, color: '#475569', fontFamily: 'monospace' },
    tipHighlight: { fontSize: '0.72rem', background: '#fef9c3', color: '#854d0e', padding: '2px 8px', borderRadius: 4, fontWeight: 500 },
    modeTabs: { display: 'flex', gap: 4 },
    modeTab: { border: 'none', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.15s' },
    tableBtn: { alignSelf: 'flex-start', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, marginTop: 4 },
    seoBox: { background: '#f8fafc', borderRadius: 8, padding: '0.85rem', border: '1px solid #e2e8f0' },
    seoUrl: { color: '#16a34a', fontSize: '0.75rem', marginBottom: 2 },
    seoTitle: { color: '#1a0dab', fontSize: '0.95rem', fontWeight: 600, marginBottom: 3, lineHeight: 1.3 },
    seoDesc: { color: '#474747', fontSize: '0.78rem', lineHeight: 1.5 },
    tagPill: { background: '#f1f5f9', color: '#475569', fontSize: '0.72rem', padding: '2px 8px', borderRadius: 20 },
};