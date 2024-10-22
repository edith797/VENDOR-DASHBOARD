import React, { useState, useEffect } from 'react';
import './Products.css';
import { PencilIcon, TrashIcon, SearchIcon } from '@heroicons/react/solid';

function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    _id: '', // Add _id for editing purposes
    name: '',
    category: '',
    price: '',
    stock: '',
    sales: '',
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductAddedOrUpdated = async () => {
    try {
      const url = isEditMode ? `http://localhost:5001/api/products/${currentProduct._id}` : 'http://localhost:5001/api/products';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentProduct),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        if (isEditMode) {
          // Update existing product in the list
          setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
        } else {
          // Add new product to the list
          setProducts([...products, updatedProduct]);
        }
        setIsModalOpen(false); // Close the modal after successful addition/update
        resetForm();
      } else {
        console.error('Failed to add/update product');
      }
    } catch (error) {
      console.error('Failed to add/update product', error);
    }
  };

  const handleEdit = (product) => {
    setIsEditMode(true);
    setCurrentProduct(product); // Set the current product to edit
    setIsModalOpen(true); // Open the modal
  };

  const resetForm = () => {
    setCurrentProduct({ _id: '', name: '', category: '', price: '', stock: '', sales: '' });
    setIsEditMode(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
        console.log(`Deleted product with id: ${id}`);
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <h2 className="section-title">Products</h2>

      <div className="stats">
        <div className="stat-card">
          <p>Total Products</p>
          <h3>{products.length}</h3>
        </div>
        <div className="stat-card">
          <p>Top Selling</p>
          <h3>{products.filter(p => p.sales > 100).length}</h3>
        </div>
        <div className="stat-card">
          <p>Low Stock</p>
          <h3>{products.filter(p => p.stock < 50).length}</h3>
        </div>
        <div className="stat-card">
          <p>Total Revenue</p>
          <h3>₹{products.reduce((total, p) => total + p.price * p.sales, 0)}</h3>
        </div>
      </div>

      <div className="product-list">
        <div className="product-list-header">
          <input
            type="text"
            className="search-bar"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="search-icon" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sales</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.sales}</td>
                <td>
                  <button className="edit-btn" title="Edit" onClick={() => handleEdit(product)}>
                    <PencilIcon className="icon" />
                  </button>
                  <button className="delete-btn" title="Delete" onClick={() => handleDelete(product._id)}>
                    <TrashIcon className="icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => setIsModalOpen(true)} className="add-product-btn">Add Product</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{isEditMode ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleProductAddedOrUpdated();
            }}>
              <label>
                Name:
                <input
                  type="text"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  required
                  style={{ fontSize: '16px' }} // Increase font size for visibility
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  value={currentProduct.category}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  required
                  style={{ fontSize: '16px' }} // Increase font size for visibility
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                  required
                  style={{ fontSize: '16px' }} // Increase font size for visibility
                />
              </label>
              <label>
                Stock:
                <input
                  type="number"
                  value={currentProduct.stock}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) })}
                  required
                  style={{ fontSize: '16px' }} // Increase font size for visibility
                />
              </label>
              <label>
                Sales:
                <input
                  type="number"
                  value={currentProduct.sales}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, sales: parseInt(e.target.value) })}
                  required
                  style={{ fontSize: '16px' }} // Increase font size for visibility
                />
              </label>
              <div style={{ marginTop: '10px' }}> {/* Space between buttons */}
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
