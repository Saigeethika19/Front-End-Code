// src/Components/CategoryDishes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Base from './Base';
import { Table, Button } from 'reactstrap';
import { useCart } from '../Context/CartContext';
// import { useCart } from '../Context/CartContext';
// import { useCart } from '../contexts/CartContext';

const CategoryDishes = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryName } = useParams();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/foodItem/category/${categoryName}`);
                setFoodItems(response.data);
            } catch (error) {
                console.error("There was an error fetching the food items!", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodItems();
    }, [categoryName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = (item) => {
        addToCart(item);
        console.log(`Add item ${item.id} to cart`);
    };

    return (
        <Base>
            <div style={{ padding: '20px' }}>
                <h2>{categoryName} Dishes</h2>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodItems.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <img
                                        src={`http://localhost:8080/foodItem/food/image/${item.image}`}
                                        alt={item.name}
                                        style={{
                                            width: '100px',
                                            height: '75px',
                                            objectFit: 'cover',
                                            borderRadius: '5px',
                                        }}
                                    />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.description}</td>

                                <td>{item.price}</td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Add to Cart
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Base>
    );
};

export default CategoryDishes;