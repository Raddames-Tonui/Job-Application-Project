import React, { useState, useEffect } from 'react';

function Fetch() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/users")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((items) => {
                setData(items);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array ensures useEffect runs only once after initial render

    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>{item.email}</div>
            ))}
        </div>
    );
}

export default Fetch;
