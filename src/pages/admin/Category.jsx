import React, { useState } from "react";

const Category = () => {
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

  const [name, setName] = useState("");
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

  // Pagination
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

  // Add / Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !preview) return alert("Enter name and image");

    if (editId) {
      setCategories(
        categories.map((c) => (c.id === editId ? { ...c, name, image: preview } : c))
      );
      setEditId(null);
    } else {
      setCategories([{ id: Date.now(), name, image: preview }, ...categories]);
    }

    setName("");
    setPreview(null);
  };

  const handleEdit = (cat) => {
    setEditId(cat.id);
    setName(cat.name);
    setPreview(cat.image);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const cancelUpdate = () => {
    setEditId(null);
    setName("");
    setPreview(null);
  };

  return (
    <div className="container">
      <h3 className="mb-4">Categories</h3>

      {/* Left-Right Form */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>{editId ? "Update Category" : "Add Category"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="row align-items-center">

            {/* Left: Inputs */}
            <div className="col-md-6">
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

              <button className="btn btn-primary me-2">
                {editId ? "Update Category" : "Add Category"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelUpdate}
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Right: Preview */}
            <div className="col-md-6 text-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded"
                  style={{ maxWidth: "80%", maxHeight: "200px" }}
                />
              ) : (
                <div className="border rounded p-5 text-muted">Image Preview</div>
              )}
            </div>

          </div>
        </form>
      </div>

      {/* Category Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleCategories.map((cat, idx) => (
                <tr key={cat.id}>
                  <td>{firstIndex + idx + 1}</td>
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
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(cat)}
                    >
                      Update
                    </button>
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

          {/* Pagination */}
          <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>
              </li>

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

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
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
    </div>
  );
};

export default Category;
