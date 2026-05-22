import "./BestSelling.css";

const products = [
    {
        id: 1,
        name: "Nimbu Zeera",
        img: "1.png",
        link: "/product/nimbu-zeera-drink/"
    },
    {
        id: 2,
        name: "Chilli Guava",
        img: "3.png",
        link: "/product/chilli-guava-drink/"
    },
    {
        id: 3,
        name: "Zinnie Zeera",
        img: "4.png",
        link: "product/zeera-masala-soda/"
    },
    {
        id: 4,
        name: "Zinnie Mango",
        img: "5.png",
        link: "/product/mango-drink/"
    },
    {
        id: 5,
        name: "Ginger Lemon",
        img: "2.png",
        link: "/product/ginger-lemon-drink/"
    },
];

export default function BestSelling() {
    return (
        <>
            <section className="bestselling-section">
                {/* Section Heading */}
                <div className="bestselling-header">
                    <h2>Most Popular Products</h2>
                </div>

                {/* Product Grid */}
                <div className="bestselling-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            {/* Product Image */}
                            <div className="product-img-wrapper">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="product-img"
                                />
                            </div>

                            {/* Info */}
                            <div className="product-info">
                                <p className="product-name">
                                    {product.name}
                                </p>

                                <a href={product.link}>
                                    <button className="btn-view-more">
                                        View More
                                    </button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="bestselling-cta">
                    <a href="/product">
                        <button className="btn-view-all">
                            View all products
                        </button>
                    </a>
                </div>
            </section>
        </>
    );
}