import React, { useState, useEffect } from "react";
import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api/app",
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // will hold category ID
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const visibleProducts = products.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Fetch products and categories
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/get-all-product");
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

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

    if (!name || !price || !category) {
      alert("Name, Price, and Category are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editId) {
        const res = await api.put(`/update-product/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          fetchProducts();
          resetForm();
        }
      } else {
        const res = await api.post("/create-product", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          fetchProducts();
          resetForm();
        }
      }
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  // Edit product
  const handleEdit = (p) => {
    setEditId(p._id);
    setName(p.name);
    setPrice(p.price);
    setDescription(p.description);
    setCategory(p.category?._id || "");
    setPreview(p.image ? `http://localhost:8000${p.image}` : null);
    setImageFile(null);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await api.delete(`/delete-product/${id}`);
      if (res.data.success) {
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setPreview(null);
    setImageFile(null);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Products</h3>

      {/* Form */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>{editId ? "Update Product" : "Add Product"}</h5>

        <form onSubmit={handleSubmit}>
          <div className="row align-items-center">
            {/* Left */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
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
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Data Found
                  </td>
                </tr>
              )}
              {visibleProducts.map((p, idx) => (
                <tr key={p._id}>
                  <td>{firstIndex + idx + 1}</td>
                  <td>
                    {p.image && (
                      <img
                        src={`http://localhost:8000${p.image}`}
                        alt={p.name}
                        width="50"
                        height="50"
                        style={{ objectFit: "cover", borderRadius: "6px" }}
                      />
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.category?.categoryName || p.category}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-1"
                      onClick={() => handleEdit(p)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p._id)}
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

export default Products;
