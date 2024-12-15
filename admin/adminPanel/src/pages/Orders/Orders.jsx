import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      toast.error("Error fetching orders.");
    }
  };

  const statusHandler = async(event,orderId) => {
    const res = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })

    if(res.data.success){
      await fetchOrders();
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='orders'>
      <h3>All Orders</h3>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div className="order-item" key={order._id}>
              <img src={assets.parcel_icon} alt="Parcel Icon" className="order-item-img" />
              <div className="order-item-details">
                <div className="order-item-food">
                  <strong>Items: </strong>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx < order.items.length - 1 && ", "}
                    </span>
                  ))}
                </div>
                <div className="order-item-status">
                  <strong>Status:</strong> {order.status}
                </div>
                <div className="order-item-address">
                  <strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.zipcode}, {order.address.country}
                </div>
                <div className="order-item-address">
                  ${order.amount}
                </div>

                <select onChange={(event) => statusHandler(event,order._id)} value = {order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
