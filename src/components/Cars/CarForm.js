import React, { useState, useEffect } from 'react';
import { addCar, updateCar } from '../../services/carService';
import { getCategories } from '../../services/categoryService';
import { useNavigate } from 'react-router-dom';

const CarForm = ({ car, setEditCar, setEditable, isEdit, fetchCars, page }) => {
    const [categories, setCategories] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [formValues, setFormValues] = useState({
        category_id: car ? car.category_id : '',
        color: car ? car.color : '',
        model: car ? car.model : '',
        make: car ? car.make : '',
        registration_no: car ? car.registration_no : ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            const data = await getCategories(token);
            if (data.status === 400) {
                navigate('/signin');
            } else {
                setCategories(data);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        setDisabled(true);
        e.preventDefault();
        const token = localStorage.getItem('token');
        const carData = formValues;
        if (isEdit) {
            await updateCar(car.id, carData, token);
            setEditCar(null);
            setEditable(false);
            alert('Car updated successfully!');
        } else {
            await addCar(carData, token);
            alert('Car added successfully!');
        }
        fetchCars(page);
        setFormValues({
            category_id: '',
            color: '',
            model: '',
            make: '',
            registration_no: ''
        })
        setDisabled(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <select value={formValues.category_id} onChange={(e) => setFormValues({ ...formValues, category_id: e.target.value })} className="w-full p-2 mb-4 border border-gray-300 rounded" required>
                <option value="">Select Category</option>
                {categories?.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            <div className='flex'>
                <input
                    type="text"
                    placeholder="Color"
                    value={formValues.color}
                    onChange={(e) => setFormValues({ ...formValues, color: e.target.value })}
                    className="w-full p-2 mb-4 mr-2 border border-gray-300 rounded"
                    required
                    minLength={3}
                />
                <input
                    type="text"
                    placeholder="Model"
                    value={formValues.model}
                    onChange={(e) => setFormValues({ ...formValues, model: e.target.value })}
                    className="w-full p-2 mb-4 ml-2 border border-gray-300 rounded"
                    required
                    minLength={3}
                />
            </div>
            <div className='flex'>
                <input
                    type="text"
                    placeholder="Make"
                    value={formValues.make}
                    onChange={(e) => setFormValues({ ...formValues, make: e.target.value })}
                    className="w-full p-2 mb-4 mr-2 border border-gray-300 rounded"
                    required
                    minLength={3}
                />
                <input
                    type="text"
                    placeholder="Registration No"
                    value={formValues.registration_no}
                    onChange={(e) => setFormValues({ ...formValues, registration_no: e.target.value })}
                    className="w-full p-2 mb-4 ml-2 border border-gray-300 rounded"
                    required
                    minLength={3}
                />
            </div>
            <button disabled={disabled} type="submit" className="w-full p-2 disabled:bg-green-300 bg-green-500 text-white rounded">{isEdit ? 'Update' : 'Add'} Car</button>
        </form>
    );
};

export default CarForm;
