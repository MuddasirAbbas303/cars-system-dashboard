import React, { useState } from 'react';
import { addCategory, updateCategory } from '../../services/categoryService';

const CategoryForm = ({ category, setEditCategory, setEditable, isEdit, fetchCategories }) => {
    const [name, setName] = useState(category ? category.name : '');
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (e) => {
        setDisabled(true)
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (isEdit) {
            await updateCategory(category._id, { name }, token);
            setEditCategory(null);
            setEditable(false);
            alert('Category updated successfully!');
        } else {
            try {
                await addCategory({ name }, token);
                alert('Category added successfully!');
            } catch (error) {
                alert(error.response.data)
            }

        }
        setName('');
        fetchCategories();
        setDisabled(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
            />
            <button disabled={disabled} type="submit" className="w-full p-2 bg-green-500 text-white rounded disabled:bg-green-300">
                {isEdit ? 'Update' : 'Add'} Category
            </button>
        </form>
    );
};

export default CategoryForm;
