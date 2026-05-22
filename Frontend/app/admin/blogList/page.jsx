'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.zinniezeera.com';

const CATEGORIES = [
    'General', 'Technology', 'Fashion', 'Lifestyle',
    'Health', 'Travel', 'Food', 'Business', 'Other'
];

function ToolbarBtn({ onClick, title, children, active }) {
    return (
        <button
            type="button"
            title={title}
            onMouseDown={(e) => { e.preventDefault(); onClick(); }}
            style={{
                ...tb.btn,
                background: active ? '#dbeafe' : 'transparent',
                color: active ? '#1d4ed8' : '#374151',
            }}
        >
            {children}
        </button>
    );
}

// ─── Rich Text Editor ────────────────────────────────────────────────────────
function RichEditor({ value, onChange }) {
    const editorRef = useRef(null);
    const isUpdating = useRef(false);

    useEffect(() => {
        if (editorRef.current && !isUpdating.current) {
            if (editorRef.current.innerHTML !== value) {
                editorRef.current.innerHTML = value || '';
            }
        }
    }, [value]);

    const exec = (cmd, val = null) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, val);
        handleInput();
    };

    const handleInput = useCallback(() => {
        isUpdating.current = true;
        onChange(editorRef.current?.innerHTML || '');
        setTimeout(() => { isUpdating.current = false; }, 0);
    }, [onChange]);

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) exec('createLink', url);
    };

    const insertImage = () => {
        const url = prompt('Enter image URL:');
        if (url) exec('insertImage', url);
    };

    const formatBlock = (tag) => {
        const editor = editorRef.current;
        if (!editor) return;

        editor.focus();

        if (!editor.innerHTML || editor.innerHTML === '' || editor.innerHTML === '<br>') {
            document.execCommand('insertHTML', false, '\u200B');
        }

        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0 || !editor.contains(sel.anchorNode)) {
            const range = document.createRange();
            range.selectNodeContents(editor);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }

        document.execCommand('formatBlock', false, tag);
        handleInput();
    };

    return (
        <div style={tb.wrapper}>
            {/* Toolbar */}
            <div style={tb.toolbar}>
                <select
                    value=""
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val) formatBlock(val);
                    }}
                    style={tb.select}
                >
                    <option value="" disabled>Heading</option>
                    <option value="h1">H1 — Large</option>
                    <option value="h2">H2 — Medium</option>
                    <option value="h3">H3 — Small</option>
                    <option value="p">Normal Text</option>
                </select>

                <span style={tb.divider} />

                <ToolbarBtn onClick={() => exec('bold')} title="Bold"><b>B</b></ToolbarBtn>
                <ToolbarBtn onClick={() => exec('italic')} title="Italic"><i>I</i></ToolbarBtn>
                <ToolbarBtn onClick={() => exec('underline')} title="Underline"><u>U</u></ToolbarBtn>
                <ToolbarBtn onClick={() => exec('strikeThrough')} title="Strikethrough"><s>S</s></ToolbarBtn>

                <span style={tb.divider} />

                <ToolbarBtn onClick={() => exec('insertUnorderedList')} title="Bullet List">☰</ToolbarBtn>
                <ToolbarBtn onClick={() => exec('insertOrderedList')} title="Numbered List">1.</ToolbarBtn>
                <ToolbarBtn onClick={() => formatBlock('blockquote')} title="Blockquote">"</ToolbarBtn>
                <ToolbarBtn onClick={() => formatBlock('pre')} title="Code Block">{'</>'}</ToolbarBtn>

                <span style={tb.divider} />

                <ToolbarBtn onClick={insertLink} title="Insert Link">🔗</ToolbarBtn>
                <ToolbarBtn onClick={insertImage} title="Insert Image URL">🖼</ToolbarBtn>

                <span style={tb.divider} />

                <ToolbarBtn onClick={() => exec('justifyLeft')} title="Align Left">⬅</ToolbarBtn>
                <ToolbarBtn onClick={() => exec('justifyCenter')} title="Center">↔</ToolbarBtn>
                <ToolbarBtn onClick={() => exec('justifyRight')} title="Align Right">➡</ToolbarBtn>

                <span style={tb.divider} />

                <ToolbarBtn onClick={() => exec('undo')} title="Undo">↩</ToolbarBtn>
                <ToolbarBtn onClick={() => exec('redo')} title="Redo">↪</ToolbarBtn>
                <ToolbarBtn onClick={() => exec('removeFormat')} title="Clear Format">✕</ToolbarBtn>
            </div>

            {/* Editable Area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                style={tb.editable}
                data-placeholder="Write your blog content here..."
            />

            <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
        [contenteditable] h1 { font-size:2em; font-weight:700; margin:.4em 0; line-height:1.2; }
        [contenteditable] h2 { font-size:1.5em; font-weight:700; margin:.4em 0; line-height:1.3; }
        [contenteditable] h3 { font-size:1.2em; font-weight:600; margin:.4em 0; line-height:1.4; }
        [contenteditable] p  { margin: .5em 0; }
        [contenteditable] blockquote {
          border-left:4px solid #3b82f6;
          padding-left:1rem;
          color:#475569;
          font-style:italic;
          margin:1rem 0;
        }
        [contenteditable] pre {
          background:#0f172a;
          color:#e2e8f0;
          padding:1rem;
          border-radius:6px;
          font-family:monospace;
          overflow-x:auto;
          white-space: pre-wrap;
        }
        [contenteditable] a { color:#2563eb; text-decoration:underline; }
        [contenteditable] img { max-width:100%; border-radius:6px; margin:8px 0; }
        [contenteditable] ul { padding-left:1.5rem; list-style:disc; }
        [contenteditable] ol { padding-left:1.5rem; list-style:decimal; }
      `}</style>
        </div>
    );
}

const tb = {
    wrapper: {
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        overflow: 'hidden',
        background: '#fff',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        padding: '6px 10px',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
    },
    btn: {
        border: 'none',
        borderRadius: 4,
        padding: '4px 7px',
        cursor: 'pointer',
        fontSize: '0.82rem',
        minWidth: 28,
        transition: 'background 0.15s',
    },
    divider: {
        display: 'inline-block',
        width: 1,
        height: 18,
        background: '#e2e8f0',
        margin: '0 4px',
    },
    select: {
        border: '1px solid #e2e8f0',
        borderRadius: 4,
        padding: '3px 6px',
        fontSize: '0.8rem',
        background: '#fff',
        cursor: 'pointer',
        color: '#374151',
    },
    editable: {
        minHeight: 340,
        padding: '1rem 1.25rem',
        outline: 'none',
        fontSize: '0.95rem',
        lineHeight: 1.75,
        color: '#1e293b',
        overflowY: 'auto',
    },
};

// ─── Main Page ───────────────────────────────────────────────────────────────
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
    const fileRef = useRef(null);

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

        // Validate title
        if (!form.title.trim()) return setError('Title is required');

        // Validate content — strip HTML tags and check if actual text exists
        const strippedContent = form.content.replace(/<[^>]*>/g, '').trim();
        if (!strippedContent) return setError('Content is required');

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('excerpt', form.excerpt);
            formData.append('content', form.content);
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

    if (fetchLoading) {
        return <div style={s.center}>Loading blog data...</div>;
    }

    return (
        <div style={s.container}>
            <div style={s.header}>
                <div>
                    <h1 style={s.title}>{isEdit ? 'Edit Blog' : 'Create New Blog'}</h1>
                    <p style={s.subtitle}>{isEdit ? 'Update your blog post' : 'Write and publish a new blog post'}</p>
                </div>
                <button onClick={() => router.push('/admin/blogList')} style={s.backBtn}>
                    ← Back to List
                </button>
            </div>

            {error && <div style={s.errorBox}>{error}</div>}
            {success && <div style={s.successBox}>{success}</div>}

            <form onSubmit={handleSubmit}>
                <div style={s.grid}>
                    {/* LEFT */}
                    <div style={s.leftCol}>
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

                        <div style={s.field}>
                            <label style={s.label}>Blog Content *</label>
                            <RichEditor
                                value={form.content}
                                onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
                            />
                        </div>
                    </div>

                    {/* RIGHT */}
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

                        {/* Settings */}
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
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={s.label}>Publish immediately</label>
                                <div
                                    onClick={() => setForm((p) => ({ ...p, isPublished: !p.isPublished }))}
                                    style={{
                                        width: 44,
                                        height: 24,
                                        borderRadius: 12,
                                        background: form.isPublished ? '#22c55e' : '#cbd5e1',
                                        padding: 2,
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        background: '#fff',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                        transform: form.isPublished ? 'translateX(20px)' : 'translateX(0)',
                                        transition: 'transform 0.2s',
                                    }} />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? 'Saving...' : isEdit ? '✓ Update Blog' : '✓ Create Blog'}
                            </button>
                            <button type="button" onClick={() => router.push('/admin/blogList')} style={s.cancelBtn}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

const s = {
    container: { padding: '2rem', fontFamily: 'Segoe UI, sans-serif', background: '#f8fafc', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' },
    title: { fontSize: '1.8rem', fontWeight: 700, color: '#1e293b', margin: 0 },
    subtitle: { color: '#64748b', fontSize: '0.9rem', marginTop: 4 },
    backBtn: { background: '#f1f5f9', color: '#475569', border: 'none', padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 },
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
};