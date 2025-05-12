// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderplacedList.css"; // Import your CSS styling

const OrderplacedList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/orders"); // Vite proxy will forward to backend
                console.log("Fetched orders:", response.data);
                setOrders(response.data || []);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="admin-orders-container">
            <h1 className="admin-orders-title">Admin Order Dashboard</h1>

            {loading ? (
                <p className="loading-message">Loading orders...</p>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : orders.length === 0 ? (
                <p className="no-orders-message">No orders available</p>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div className="order-card" key={order._id}>
                            <h2 className="order-customer">{order.customerName}</h2>
                            <p className="order-email">Email: {order.customerEmail}</p>
                            <p className="order-date">
                                Order Date: {new Date(order.timestamp).toLocaleString()}
                            </p>
                            <div className="order-items">
                                {order.items.map((item, idx) => (
                                    <div className="order-item" key={`${order._id}-item-${idx}`}>
                                        <p>{item.name}</p>
                                        <p>Qty: {item.quantity}</p>
                                        <p>Price: ₹{item.price}</p>
                                        <p>Total: ₹{item.total}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="order-total">
                                <strong>Total Amount: ₹{order.totalAmount}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderplacedList;
