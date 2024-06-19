import React, { useEffect, useState } from 'react';
import { getCarCount, getCars } from '../../services/carService';

const Dashboard = () => {
    const [cars, setCars] = useState();

    useEffect(() => {
        const fetchCarCount = async () => {
            const token = localStorage.getItem('token');
            const count = await getCars(token);
            setCars(count);
        };
        fetchCarCount();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-4">Dashboard</h1>
            <p className="text-xl">Number of registered cars: {cars?.length}</p>
        </div>
    );
};

export default Dashboard;
