import React, { useEffect, useState } from 'react';
import './List.css';
import axios from "axios";
import { toast } from 'react-toastify';

const List = ({ url }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Failed to fetch list");
            }
        } catch (error) {
            toast.error("Error fetching data");
        }
    };

    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList();
            } else {
                toast.error("Error removing food item");
            }
        } catch (error) {
            toast.error("Error removing food item");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list'>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className='list-table-format item'>
                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                        <div>{item.name}</div>
                        <p>{item.description}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
