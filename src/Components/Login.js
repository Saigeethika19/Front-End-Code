import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from './Base';
// import { login } from "../Service/Helper";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { mylogin } from '../Service/UserService';

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e, property) => {
        setCredentials({ ...credentials, [property]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        mylogin(credentials)
            .then(response => {
                toast.success("Login successful");
                localStorage.setItem('user', JSON.stringify(response));
                navigate('/order');
            })
            .catch(error => {
                toast.error("Invalid credentials");
                console.error("Login error", error);
            });
    };

    return (
        <Base>
            <Container style={{ margin: '7% auto' }}>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card className="white">
                            <CardHeader className="text-center loginPage"><h3>Login</h3></CardHeader>
                            <CardBody className='loginPage' shadow>
                                <Form onSubmit={handleLogin}>
                                    <FormGroup>
                                        <Label for="email">Username</Label>
                                        <Input type="email"
                                            placeholder="Enter here"
                                            id="email"
                                            value={credentials.email}
                                            onChange={(e) => handleChange(e, 'email')}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input type="password"
                                            placeholder="Enter here"
                                            id="password"
                                            value={credentials.password}
                                            onChange={(e) => handleChange(e, 'password')}
                                        />
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button color="success" type="submit">Submit</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}
