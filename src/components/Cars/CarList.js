import React, { useEffect, useState } from 'react';
import { getCars, deleteCar } from '../../services/carService';
import CarForm from './CarForm';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Buttons/Logout';
import NavigationButton from '../Buttons/Navigation';
import ReactPaginate from 'react-paginate';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [editCar, setEditCar] = useState(null);
    const [editable, setEditable] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate()

    const fetchCars = async (page, limit = 5) => {

        const token = localStorage.getItem('token');
        const data = await getCars(token, page, limit);

        if (data.status === 400) {
            navigate('/signin');
        } else {
            setCars(data.cars);
            setTotalPages(data.totalPages);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await deleteCar(id, token);
        fetchCars(page);
        setEditable(false);
        alert('Car deleted successfully!');
    };

    const handlePageChange = ({ selected }) => {
        setPage(selected);
    };

    useEffect(() => {
        fetchCars(page);
    }, [page]);

    return (
        <div className="p-8">
            <div className='flex justify-between align-middle mb-4'>

                <NavigationButton isCars={true} />

                <h1 className="text-5xl">Cars</h1>

                <LogoutButton />

            </div>

            {!editCar && <CarForm fetchCars={fetchCars} page={page} />}
            {editCar && <CarForm car={editCar} setEditCar={setEditCar} setEditable={setEditable} isEdit fetchCars={fetchCars} page={page} />}

            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Category</th>
                        <th className="py-2">Color</th>
                        <th className="py-2">Model</th>
                        <th className="py-2">Make</th>
                        <th className="py-2">Registration No</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.id}>
                            <td className="border px-4 py-2">{car.categories.name}</td>
                            <td className="border px-4 py-2">{car.color}</td>
                            <td className="border px-4 py-2">{car.model}</td>
                            <td className="border px-4 py-2">{car.make}</td>
                            <td className="border px-4 py-2">{car.registration_no}</td>
                            <td className="border px-4 py-2">
                                <button disabled={editable} onClick={() => { setEditCar(car); setEditable(true) }} className="ml-2 py-2 px-3 bg-yellow-500 text-white rounded disabled:bg-yellow-300 disabled:cursor-not-allowed">Edit</button>
                                <button disabled={editable} onClick={() => { handleDelete(car.id); setEditable(true) }} className="ml-2 py-2 px-3 bg-red-500 text-white rounded disabled:bg-red-200 disabled:cursor-not-allowed">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex justify-center">
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={totalPages}
                    marginPagesDisplayed={5}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName="flex"
                    pageClassName="mx-1 px-2 py-1 border border-gray-300 rounded"
                    previousClassName="mx-1 px-2 py-1 border border-gray-300 rounded"
                    nextClassName="mx-1 px-2 py-1 border border-gray-300 rounded"
                />
            </div>
        </div>
    );
};

export default CarList;
