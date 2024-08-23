import React from 'react';
import Base from './Base';
// import backgroundImage from '/mnt/data/home.jpg';

export default function Home() {
    return (
        <Base>
            <div
                style={{
                    backgroundImage: `url(home.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    padding: '20px',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                        padding: '40px',
                        borderRadius: '10px',
                        maxWidth: '100%',
                        marginTop: '150px'
                    }}
                >
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontFamily: 'Georgia, serif' }}>
                        welcome to our foody delivery website!
                    </h1>
                    <h3 style={{ fontSize: '1.5rem', lineHeight: '1.5', fontFamily: 'Arial, sans-serif' }}>
                        Explore recipes, discover flavors, and savor the art of cooking.
                    </h3>
                </div>
            </div>
        </Base>
    );
}
