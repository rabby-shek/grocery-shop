import React, { useState, useEffect } from "react";
import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api/app",
});

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const visibleCategories = categories.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/get-all-categories");
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load categories");
    }
  };

  // Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Create / Update submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Category name required");
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", name);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editId) {
        // UPDATE
        const res = await api.put(`/update-category/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          fetchCategories();
          resetForm();
        }
      } else {
        // CREATE
        const res = await api.post("/create-category", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          fetchCategories();
          resetForm();
        }
      }
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  // Edit category
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.categoryName);

    // IMPORTANT FIX: full backend URL
    setPreview(`http://localhost:8000${cat.image}`);

    setImageFile(null);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const res = await api.delete(`/delete-category/${id}`);
      if (res.data.success) {
        fetchCategories();
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setPreview(null);
    setImageFile(null);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Categories</h3>

      {/* Form */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>{editId ? "Update Category" : "Add Category"}</h5>

        <form onSubmit={handleSubmit}>
          <div className="row align-items-center">
            {/* Left */}
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
                {editId ? "Update" : "Add"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Right Preview */}
            <div className="col-md-6 text-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: "80%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <div className="border rounded p-5 text-muted">
                  Image Preview
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Table */}
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
                <tr key={cat._id}>
                  <td>{firstIndex + idx + 1}</td>
                  <td>
                    <img
                      src={`http://localhost:8000${cat.image}`}
                      alt={cat.categoryName}
                      width="50"
                      height="50"
                      style={{ objectFit: "cover", borderRadius: "6px" }}
                    />
                  </td>
                  <td>{cat.categoryName}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-1"
                      onClick={() => handleEdit(cat)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
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
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages && "disabled"
                }`}
              >
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
