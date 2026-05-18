// app/blog/page.jsx
import Link from "next/link";
import { blogs } from "./data";
import "./blog.css";

export const metadata = {
  title: "Blog | Zinnie",
  description:
    "Explore our latest blogs on cold drinks, fruit drinks, desi beverages, and refreshing summer drinks in India.",
};

export default function BlogListPage() {
  return (
    <>
      <div className="Blog">
        <div className="Blog-line"></div>
        <div className="Blog-container-Box-Image">
          <div className="container">
            <div className="row">
              <div className="About-title">
                <h2>Latest Blogs</h2>
              </div>
              {blogs.map((blog) => (
                <div
                  className="col-lg-4 col-md-4 col-sm-12 col-12"
                  key={blog.slug}
                >
                  {/* onClick hataya — Link lagaya */}
                  <Link
                    href={`/blog/${blog.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="Blog-Section">
                      <div className="blog-img-wrapper">
                        <img src={blog.image} alt={blog.altTag || blog.title} />
                      </div>
                      <div className="blog-content">
                        <div className="blog-meta">
                          <span>{blog.author}</span>
                          <span>{blog.date}</span>
                        </div>
                        <div className="Blog-title">{blog.heading}</div>
                        <div className="Blog-des">{blog.subHeading}</div>
                        <div className="blog-btn">
                          <span>Read More →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}