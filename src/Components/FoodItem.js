import React from 'react';

const FoodItem = ({ src, alt, title, bgColor, onClick }) => {
    return (
        <div style={{ textAlign: 'center', width: '300px', margin: '0 auto'}}>
            <div style={{ position: 'relative' }}>
                <img
                    src={src}
                    alt={alt}
                    style={{
                        width: '300px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                    }}
                />
            </div>
            <h3 style={{ marginTop: '10px', fontFamily: 'Arial, sans-serif' }}>{title}</h3>
            <button
                onClick={onClick}
                style={{
                    display: 'block',
                    margin: '10px auto 0',
                    padding: '10px 15px',
                    backgroundColor: bgColor,
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                }}
            >
                View Dishes
            </button>
        </div>
    );
};

export default FoodItem;
