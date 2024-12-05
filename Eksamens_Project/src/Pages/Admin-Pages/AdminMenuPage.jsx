import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../Componets/AdminNavbar';
import ManishImage from '../../assets/FoodItems/Manish.png';
import './AdminMenuPage.css';

function AdminMenuPage() {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productIngredients, setProductIngredients] = useState('');
    const [productCategory, setProductCategory] = useState('Starters');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetch('https://localhost:7265/api/FoodMenu/GetFoodItems')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const validateInputs = () => {
        const newErrors = {};
        if (!productName) newErrors.productName = 'Product name is required';
        if (!productDescription) newErrors.productDescription = 'Product description is required';
        if (!productPrice || isNaN(productPrice) || productPrice <= 0) newErrors.productPrice = 'Valid product price is required';
        if (!productIngredients) {
            newErrors.productIngredients = 'Product ingredients are required';
        } else {
            const ingredientsArray = productIngredients.split(',').map(ingredient => ingredient.trim());
            if (ingredientsArray.some(ingredient => ingredient === '')) {
                newErrors.productIngredients = 'Ingredients must be separated by commas and cannot be empty';
            }
        }
        return newErrors;
    };

    const handleAddOrUpdateProduct = (e) => {
        e.preventDefault();
        const newErrors = validateInputs();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newProduct = {
            name: productName,
            productImage: ManishImage,
            description: productDescription,
            ingredients: productIngredients.split(',').map(ingredient => ingredient.trim()),
            price: parseFloat(productPrice),
            productSales: 0,
            foodCategory: productCategory,
            isActive: true // Default to active when adding a new product
        };

        const queryParams = new URLSearchParams(newProduct).toString();

        const url = editingProduct
            ? `https://localhost:7265/api/FoodMenu/UpdateFoodItem?id=${editingProduct.id}&${queryParams}`
            : `https://localhost:7265/api/FoodMenu/AddFoodItem?${queryParams}`;

        const method = editingProduct ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(data => {
                console.log('Product added/updated:', data);
                if (editingProduct) {
                    setProducts(products.map(p => (p.id === editingProduct.id ? { ...newProduct, id: editingProduct.id } : p)));
                } else {
                    setProducts([...products, { ...newProduct, id: data.id }]);
                }
                setProductName('');
                setProductDescription('');
                setProductPrice('');
                setProductIngredients('');
                setProductCategory('Starters');
                setErrors({});
                setSuccessMessage('Product added/updated successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
                setEditingProduct(null);
            })
            .catch(error => {
                console.error('Error adding/updating product:', error);
            });
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setProductName(product.name);
        setProductDescription(product.description);
        setProductPrice(product.price);
        setProductIngredients(product.ingredients.join(', '));
        setProductCategory(product.foodCategory);
    };

    const handleDeleteProduct = (id) => {
        fetch(`https://localhost:7265/api/FoodMenu/DeleteFoodItem/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.text())
            .then(data => {
                console.log('Product deleted:', data);
                setProducts(products.filter(p => p.id !== id));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    const handleActivateProduct = (id) => {
        fetch(`https://localhost:7265/api/FoodMenu/ActivateFoodItem/${id}`, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Product activated:', data);
                setProducts(products.map(p => p.id === id ? { ...p, isActive: true } : p));
            })
            .catch(error => {
                console.error('Error activating product:', error);
            });
    };

    const handleDeactivateProduct = (id) => {
        fetch(`https://localhost:7265/api/FoodMenu/DeactivateFoodItem/${id}`, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Product deactivated:', data);
                setProducts(products.map(p => p.id === id ? { ...p, isActive: false } : p));
            })
            .catch(error => {
                console.error('Error deactivating product:', error);
            });
    };

    return (
        <div>
            <AdminNavbar />
            <div className="admin-content">
                <h1>Welcome to the Admin Menu Panel</h1>
                {successMessage && <div className="success-message">{successMessage}</div>}
                <form onSubmit={handleAddOrUpdateProduct} className="product-form">
                    <div>
                        <label htmlFor="productName">Product Name:</label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                        {errors.productName && <span className="error">{errors.productName}</span>}
                    </div>
                    <div>
                        <label htmlFor="productDescription">Product Description:</label>
                        <input
                            type="text"
                            id="productDescription"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            required
                        />
                        {errors.productDescription && <span className="error">{errors.productDescription}</span>}
                    </div>
                    <div>
                        <label htmlFor="productPrice">Product Price:</label>
                        <input
                            type="number"
                            id="productPrice"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                        {errors.productPrice && <span className="error">{errors.productPrice}</span>}
                    </div>
                    <div>
                        <label htmlFor="productIngredients">Product Ingredients (comma separated):</label>
                        <input
                            type="text"
                            id="productIngredients"
                            value={productIngredients}
                            onChange={(e) => setProductIngredients(e.target.value)}
                            required
                        />
                        {errors.productIngredients && <span className="error">{errors.productIngredients}</span>}
                    </div>
                    <div>
                        <label htmlFor="productCategory">Product Category:</label>
                        <select
                            id="productCategory"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                            required
                        >
                            <option value="Starters">Starters</option>
                            <option value="MainCourse">MainCourse</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Salads">Salads</option>
                        </select>
                    </div>
                    <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
                </form>
                <h2>Product List</h2>
                <div className="product-lists">
                    <div className="product-list">
                        <h3>Active Products</h3>
                        <ul>
                            {products.filter(product => product.isActive).map((product, index) => (
                                <li key={index}>
                                    {product.name} - ${product.price}
                                    <button onClick={() => handleEditProduct(product)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                    <button onClick={() => handleDeactivateProduct(product.id)}>Deactivate</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="product-list">
                        <h3>Inactive Products</h3>
                        <ul>
                            {products.filter(product => !product.isActive).map((product, index) => (
                                <li key={index}>
                                    {product.name} - ${product.price}
                                    <button onClick={() => handleEditProduct(product)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                    <button onClick={() => handleActivateProduct(product.id)}>Activate</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminMenuPage;

