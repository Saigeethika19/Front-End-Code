// src/Components/Cart.js
import React from 'react';
import Base from './Base';
import { Table, Button } from 'reactstrap';
// import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Cart = () => {
    const { cart, decrementQuantity, removeFromCart, addToCart } = useCart();
    const navigate = useNavigate();

    const calculateTotalPrice = (price, quantity) => (price * quantity).toFixed(2);

    const calculateCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleBuyClick = () => {
        navigate('/payment'); // Navigate to payment page
    };

    return (
        <Base>
            <div>
                {cart.length > 0 ? (<h1 className='text-center'> Your Added Item</h1>) : null}
                {/* <h1 className='text-center'>Your Added Items:</h1> */}
                {cart.length === 0 ? (
                    <h1 style={{ margin: '150px auto', textAlign: 'center' }}>Your cart is empty.</h1>
                ) : (
                    <>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
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
                                        <td>{item.price.toFixed(2)}rs</td>
                                        <td>
                                            <Button color="danger" onClick={() => decrementQuantity(item.id)}>
                                                -
                                            </Button>
                                            {item.quantity}
                                            <Button color="success" onClick={() => addToCart(item)}>
                                                +
                                            </Button>
                                        </td>
                                        <td>{calculateTotalPrice(item.price, item.quantity)}rs</td>
                                        <td>
                                            <Button color="danger" onClick={() => removeFromCart(item.id)}>
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="text-center" style={{ background: 'linear-gradient(135deg, #b0cec5c5, #d9e0ddc9)',height:'200px' }}>
                            <h3>Total: {calculateCartTotal()}Rs</h3>
                            <Button color="primary" onClick={handleBuyClick}>
                                Payment
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Base>
    );
};

export default Cart;