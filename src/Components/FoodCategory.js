import React from 'react';
import { useNavigate } from 'react-router-dom';
import Base from './Base'; // Assuming you have a Base component
import FoodItem from './FoodItem';

const FoodCategory = () => {
    const navigate = useNavigate();

    const handleViewCategory = (category) => {
        navigate(`/category/${category}`);
    };

    return (
        <Base>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px',
                    padding: '20px',
                    background:'linear-gradient(135deg, #b0cec5c5, #d9e0ddc9)',
                    color:"black"
                    
                }}
            >
                <FoodItem
                    src="nonveg.jpg"
                    alt="Non-Veg Dish"
                    title="Delicious Non-Veg Dish"
                    category="Non-Veg"
                    bgColor="#ff6666"
                    onClick={() => handleViewCategory('nonveg')}
                    
                />

                <FoodItem
                    src="veg.jpg"
                    alt="Veg Dish"
                    title="Healthy Veg Dish"
                    category="Veg"
                    bgColor="#66cc66"
                    onClick={() => handleViewCategory('veg')}
                />

                <FoodItem
                    src="chinese.jpg"
                    alt="Chinese Dish"
                    title="Tasty Chinese Dish"
                    category="Chinese"
                    bgColor="#ffcc66"
                    onClick={() => handleViewCategory('chinese')}
                />
            </div>
        </Base>
    );
};

export default FoodCategory;
