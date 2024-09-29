/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import { useGetProductsQuery } from "../services/productsApi";

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // New state for sorting
    const { data: products = [], isLoading, error } = useGetProductsQuery();
    const [addProducts, setAddProducts] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 12;
    console.log(products)
    // Filter products based on search term
    const filteredProducts = products?.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort products based on sortOrder state
    const sortedProducts = filteredProducts?.slice().sort((a, b) => {
        if (sortOrder === "price-asc") {
            return a.price - b.price;
        } else if (sortOrder === "price-desc") {
            return b.price - a.price;
        } else if (sortOrder === "title-asc") {
            return a.title.localeCompare(b.title);
        } else if (sortOrder === "title-desc") {
            return b.title.localeCompare(a.title);
        }
        return 0;
    });

    // Paginate the sorted products
    const totalPages = Math.ceil(sortedProducts?.length / limit);
    const paginatedData = sortedProducts?.slice((page - 1) * limit, page * limit);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPage(1); // Reset to first page on search
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        setPage(1); // Reset to first page on sort
    };

    const handleAddToCart = (product) => {
        setAddProducts([...addProducts, product]);
    };

    if (isLoading) return <p className='text-3xl text-center'>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-md py-2 px-4"
                />
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-md py-2 px-4"
                >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="title-asc">Title: A to Z</option>
                    <option value="title-desc">Title: Z to A</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedData?.map(product => (
                    <div key={product.id} className="border p-4 rounded">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                        <p className="text-gray-500">${product.price}</p>
                        <button onClick={() => handleAddToCart(product)} className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center items-center space-x-4">
                <button
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
