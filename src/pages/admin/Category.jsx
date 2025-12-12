import React, { useState } from "react";

const Category = () => {
  // MORE Fake Categories
  const [categories, setCategories] = useState([
    { id: 1, name: "Fruits", image: "https://via.placeholder.com/80?text=Fruits" },
    { id: 2, name: "Vegetables", image: "https://via.placeholder.com/80?text=Vegetables" },
    { id: 3, name: "Dairy", image: "https://via.placeholder.com/80?text=Dairy" },
    { id: 4, name: "Snacks", image: "https://via.placeholder.com/80?text=Snacks" },
    { id: 5, name: "Meat", image: "https://via.placeholder.com/80?text=Meat" },
    { id: 6, name: "Fish", image: "https://via.placeholder.com/80?text=Fish" },
    { id: 7, name: "Bakery", image: "https://via.placeholder.com/80?text=Bakery" },
    { id: 8, name: "Beverages", image: "https://via.placeholder.com/80?text=Drinks" },
    { id: 9, name: "Baby Care", image: "https://via.placeholder.com/80?text=Baby" },
    { id: 10, name: "Beauty", image: "https://via.placeholder.com/80?text=Beauty" },
  ]);

  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");

  // Pagination Settings
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const visibleCategories = categories.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Add Category
  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!name || !preview) return alert("Please enter name and image");

    const newCategory = {
      id: Date.now(),
      name,
      image: preview,
    };

    setCategories([newCategory, ...categories]);
    setName("");
    setPreview(null);
  };

  // Delete Category
  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Categories</h3>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addCategoryModal"
        >
          Add Category
        </button>
      </div>

      {/* Category Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          {categories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {visibleCategories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td>{firstIndex + index + 1}</td>
                    <td>
                      <img
                        src={cat.image}
                        alt={cat.name}
                        width="50"
                        height="50"
                        style={{ objectFit: "cover", borderRadius: "6px" }}
                      />
                    </td>
                    <td>{cat.name}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(cat.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <nav className="d-flex justify-content-center">
            <ul className="pagination">

              {/* Prev */}
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>
              </li>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              {/* Next */}
              <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>

            </ul>
          </nav>
        </div>
      </div>

      {/* Add Category Modal */}
      <div className="modal fade" id="addCategoryModal" tabIndex="-1">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddCategory}>
            <div className="modal-header">
              <h5 className="modal-title">Add Category</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>

              {preview && (
                <div className="text-center">
                  <img
                    src={preview}
                    alt="preview"
                    width="120"
                    className="rounded mt-2"
                  />
                </div>
              )}

            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary">Add Category</button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
};

export default Category;
