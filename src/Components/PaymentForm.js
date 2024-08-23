import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Row, Col, Card, CardBody, FormText } from 'reactstrap';
import axios from 'axios';
// import { useCart } from '../Context/CartContext';
import Base from './Base';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentForm = () => {
    const { cart } = useCart(); // Fetch cart items from context
    const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
    const userId = storedUser ? storedUser.id : null; // Get userId from user data
    console.log(userId);
    const Navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('card'); // Default payment method
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
        upiId: ''
    });

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const paymentData = {
            paymentMode: paymentMethod,
            amount: calculateCartTotal(),
            ...(paymentMethod === 'card' && {
                cardNumber: formData.cardNumber,
                expiryDate: formData.expiryDate,
                cvv: formData.cvv,
                nameOnCard: formData.nameOnCard
            }),
            ...(paymentMethod === 'upi' && {
                upiId: formData.upiId
            })
        };

        try {
            const response = await axios.post(`http://localhost:8080/api/payment/${userId}`, paymentData);
            if (response.status === 201) {
                toast.success("Payment is Successfull !!")
                Navigate("/");
                // alert('Payment successful!');

            }
        } catch (error) {
            console.error('There was an error processing the payment!', error);
            toast.error("Something Went Wrong !")
        }
    };

    return (
        <Base>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md="6">
                        <Card>
                            <CardBody>
                                <h2 className="text-center">Payment Form</h2>
                                <div className="text-center mb-4">
                                    <h4>Total Payment: {calculateCartTotal()}Rs</h4>
                                </div>
                                <Form onSubmit={handleSubmit}>
                                    {/* Payment Method Selection */}
                                    <FormGroup>
                                        <Label for="paymentMethod">Select Payment Method</Label>
                                        <Input
                                            type="select"
                                            id="paymentMethod"
                                            name="paymentMethod"
                                            value={paymentMethod}
                                            onChange={handlePaymentMethodChange}
                                        >
                                            <option value="card">Credit/Debit Card</option>
                                            <option value="cod">Cash on Delivery (COD)</option>
                                            <option value="upi">UPI (Unified Payments Interface)</option>
                                        </Input>
                                    </FormGroup>

                                    {/* Payment Method Details */}
                                    {paymentMethod === 'card' && (
                                        <>
                                            <FormGroup>
                                                <Label for="cardNumber">Card Number</Label>
                                                <Input
                                                    type="text"
                                                    id="cardNumber"
                                                    name="cardNumber"
                                                    placeholder="Enter your card number"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </FormGroup>
                                            <Row form>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="expiryDate">Expiry Date</Label>
                                                        <Input
                                                            type="text"
                                                            id="expiryDate"
                                                            name="expiryDate"
                                                            placeholder="MM/YY"
                                                            value={formData.expiryDate}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="cvv">CVV</Label>
                                                        <Input
                                                            type="text"
                                                            id="cvv"
                                                            name="cvv"
                                                            placeholder="CVV"
                                                            value={formData.cvv}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <FormGroup>
                                                <Label for="nameOnCard">Name on Card</Label>
                                                <Input
                                                    type="text"
                                                    id="nameOnCard"
                                                    name="nameOnCard"
                                                    placeholder="Name on the card"
                                                    value={formData.nameOnCard}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </>
                                    )}

                                    {paymentMethod === 'upi' && (
                                        <>
                                            <FormGroup>
                                                <Label for="upiId">UPI ID</Label>
                                                <Input
                                                    type="text"
                                                    id="upiId"
                                                    name="upiId"
                                                    placeholder="Enter your UPI ID"
                                                    value={formData.upiId}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </FormGroup>
                                            <FormText color="muted">
                                                Please enter your UPI ID for payment.
                                            </FormText>
                                        </>
                                    )}

                                    {paymentMethod === 'cod' && (
                                        <FormGroup>
                                            <FormText color="muted">
                                                You will pay in cash upon delivery.
                                            </FormText>
                                        </FormGroup>
                                    )}

                                    {/* Terms and Conditions */}
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" required /> I agree to the terms and conditions
                                        </Label>
                                    </FormGroup>
                                    <Button color="primary" block type="submit">
                                        Submit Payment
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default PaymentForm;
