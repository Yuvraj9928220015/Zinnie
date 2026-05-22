// app/blog/page.jsx
// ✅ Server component — fetches blogs from API at render time
// Add revalidate for ISR (optional): export const revalidate = 60;

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.zinniezeera.com';

export const metadata = {
    title: 'Blog | Zinnie Zeera',
    description:
        'Explore our latest blogs on cold drinks, fruit drinks, desi beverages, and refreshing summer drinks in India.',
};

async function getBlogs(page = 1, category = '', tag = '') {
    try {
        const params = new URLSearchParams({ page, limit: 9 });
        if (category) params.append('category', category);
        if (tag) params.append('tag', tag);

        const res = await fetch(`${API_BASE}/api/blogs?${params}`, {
            next: { revalidate: 60 }, // ISR — revalidate every 60s
        });

        if (!res.ok) return { blogs: [], totalPages: 1, total: 0 };
        const data = await res.json();
        return data.success ? data : { blogs: [], totalPages: 1, total: 0 };
    } catch {
        return { blogs: [], totalPages: 1, total: 0 };
    }
}

// ─── Blog Card ────────────────────────────────────────────────────────────────
import Link from 'next/link';

function BlogCard({ blog }) {
    const formattedDate = blog.publishedAt
        ? new Date(blog.publishedAt).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'long', day: 'numeric',
        })
        : '';

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="Blog-Section">
                    <div className="blog-img-wrapper">
                        <img
                            src={blog.coverImage ? `${API_BASE}${blog.coverImage}` : '/images/blog-placeholder.jpg'}
                            alt={blog.title}
                            loading="lazy"
                        />
                    </div>
                    <div className="blog-content">
                        <div className="blog-meta">
                            <span className="blog-category">{blog.category || 'General'}</span>
                            <span>{formattedDate}</span>
                        </div>
                        <div className="Blog-title">{blog.title}</div>
                        <div className="Blog-des">
                            {blog.excerpt || ''}
                        </div>
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="blog-tags">
                                {blog.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="blog-tag">#{tag}</span>
                                ))}
                            </div>
                        )}
                        <div className="blog-btn">
                            <span>Read More →</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default async function BlogPage({ searchParams }) {
    const page = parseInt(searchParams?.page) || 1;
    const category = searchParams?.category || '';
    const tag = searchParams?.tag || '';

    const { blogs, totalPages, total } = await getBlogs(page, category, tag);

    const CATEGORIES = ['', 'General', 'Technology', 'Fashion', 'Lifestyle', 'Health', 'Travel', 'Food', 'Business', 'Other'];

    return (
        <>
            <div className="Blog">
                <div className="Blog-line"></div>
                <div className="Blog-container-Box-Image">
                    <div className="container">
                        <div className="row">
                            <div className="About-title">
                                <h2>Latest Blogs</h2>
                                {total > 0 && (
                                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 4 }}>
                                        {total} article{total !== 1 ? 's' : ''} published
                                    </p>
                                )}
                            </div>

                            {/* Category Filter */}
                            <div className="blog-filters">
                                {CATEGORIES.map(cat => (
                                    <Link
                                        key={cat || 'all'}
                                        href={cat ? `/blog?category=${cat}` : '/blog'}
                                        className={`filter-btn ${category === cat ? 'active' : ''}`}
                                    >
                                        {cat || 'All'}
                                    </Link>
                                ))}
                            </div>

                            {/* Blog Grid */}
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <BlogCard key={blog._id} blog={blog} />
                                ))
                            ) : (
                                <div className="no-blogs">
                                    <p>No blogs found{category ? ` in "${category}"` : ''}.</p>
                                    {category && (
                                        <Link href="/blog" className="clear-filter">Clear Filter</Link>
                                    )}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="blog-pagination">
                                    {page > 1 && (
                                        <Link
                                            href={`/blog?page=${page - 1}${category ? `&category=${category}` : ''}`}
                                            className="page-btn"
                                        >
                                            ← Prev
                                        </Link>
                                    )}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                        <Link
                                            key={p}
                                            href={`/blog?page=${p}${category ? `&category=${category}` : ''}`}
                                            className={`page-btn ${p === page ? 'active' : ''}`}
                                        >
                                            {p}
                                        </Link>
                                    ))}
                                    {page < totalPages && (
                                        <Link
                                            href={`/blog?page=${page + 1}${category ? `&category=${category}` : ''}`}
                                            className="page-btn"
                                        >
                                            Next →
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .blog-filters {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin: 0 0 2rem;
                    width: 100%;
                }
                .filter-btn {
                    padding: 6px 16px;
                    border-radius: 20px;
                    font-size: 0.82rem;
                    font-weight: 500;
                    cursor: pointer;
                    text-decoration: none;
                    background: #f1f5f9;
                    color: #64748b;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                .filter-btn:hover { background: #e2e8f0; color: #1e293b; }
                .filter-btn.active { background: #0f172a; color: #fff; border-color: #0f172a; }

                .blog-category {
                    background: #eff6ff;
                    color: #2563eb;
                    font-size: 0.72rem;
                    font-weight: 600;
                    padding: 2px 8px;
                    border-radius: 20px;
                }
                .blog-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    margin: 6px 0;
                }
                .blog-tag {
                    font-size: 0.72rem;
                    color: #94a3b8;
                    background: #f8fafc;
                    padding: 1px 7px;
                    border-radius: 20px;
                }
                .no-blogs {
                    width: 100%;
                    text-align: center;
                    padding: 4rem 2rem;
                    color: #64748b;
                }
                .clear-filter {
                    display: inline-block;
                    margin-top: 12px;
                    background: #0f172a;
                    color: #fff;
                    padding: 8px 20px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 0.85rem;
                }
                .blog-pagination {
                    display: flex;
                    justify-content: center;
                    gap: 6px;
                    width: 100%;
                    margin-top: 2rem;
                    flex-wrap: wrap;
                }
                .page-btn {
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    text-decoration: none;
                    background: #f1f5f9;
                    color: #475569;
                    transition: all 0.2s;
                }
                .page-btn:hover { background: #e2e8f0; }
                .page-btn.active { background: #0f172a; color: #fff; }
            `}</style>
        </>
    );
}