import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../../services/categoryService';
import CategoryForm from './CategoryForm';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../Buttons/Navigation';
import LogoutButton from '../Buttons/Logout';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);
    const [editable, setEditable] = useState(false);
    const navigate = useNavigate()

    const fetchCategories = async () => {

        const token = localStorage.getItem('token');
        const data = await getCategories(token);
        if (data.status === 400) {
            navigate('/signin');
        } else {
            setCategories(data);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await deleteCategory(id, token);
        fetchCategories();
        setEditable(false);
        alert('Category deleted successfully!');
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="p-8">
            <div className='flex justify-between align-middle mb-4'>

                <NavigationButton isCars={false} />

                <h1 className="text-5xl">Categories</h1>

                <LogoutButton />

            </div>
            {!editCategory && <CategoryForm fetchCategories={fetchCategories} />}
            {editCategory && <CategoryForm category={editCategory} setEditCategory={setEditCategory} isEdit fetchCategories={fetchCategories} setEditable={setEditable} />}
            <ul>
                {categories?.map((category) => (
                    <li key={category.id} className="mb-2">
                        {category.name}
                        <button disabled={editable} onClick={() => { setEditCategory(category); setEditable(true); }} className="ml-2 py-2 px-3 bg-yellow-500 text-white rounded disabled:bg-yellow-300 disabled:cursor-not-allowed">Edit</button>
                        <button disabled={editable} onClick={() => { handleDelete(category.id); setEditable(true); }} className="ml-2 py-2 px-3 bg-red-500 text-white rounded  disabled:bg-red-200 disabled:cursor-not-allowed">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
