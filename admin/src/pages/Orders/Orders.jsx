// Order.jsx
/*import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [prevOrderCount, setPrevOrderCount] = useState(0);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        const fetchedOrders = response.data.data.reverse();

        // Show notification only when new orders are added
        if (fetchedOrders.length > prevOrderCount) {
          const newOrders = fetchedOrders.length - prevOrderCount;
          toast.info(`${newOrders} new order(s) received!`);
        }

        // Update orders and previous count
        setOrders(fetchedOrders);
        setPrevOrderCount(fetchedOrders.length);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('An error occurred while fetching orders');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Order status updated successfully');
      } else {
        toast.error('Error updating status');
      }
    } catch (error) {
      toast.error('An error occurred while updating status');
    }
  };

  useEffect(() => {
    // Fetch orders when the component is mounted
    fetchAllOrders();

    // Polling to fetch orders every 30 seconds
    const interval = setInterval(() => {
      fetchAllOrders();
    }, 30000);

    // Cleanup polling interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
              <p className="order-item-delivery-option">
                Delivery Option: {order.deliveryOption === "homeDelivery" ? "Home Delivery" : "Takeaway"}
              </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              name=""
              id=""
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
*/

// Order.jsx
import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';
import { io } from 'socket.io-client';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [prevOrderCount, setPrevOrderCount] = useState(0);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        const fetchedOrders = response.data.data.reverse();

        // Show notification only when new orders are added
        if (fetchedOrders.length > prevOrderCount) {
          const newOrders = fetchedOrders.length - prevOrderCount;
          toast.info(`${newOrders} new order(s) received!`);
        }

        // Update orders and previous count
        setOrders(fetchedOrders);
        setPrevOrderCount(fetchedOrders.length);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('An error occurred while fetching orders');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Order status updated successfully');
      } else {
        toast.error('Error updating status');
      }
    } catch (error) {
      toast.error('An error occurred while updating status');
    }
  };

  useEffect(() => {
    // Fetch orders when the component is mounted
    fetchAllOrders();

    // Set up socket connection to listen for new orders
    const socket = io(`${url}`); // Use the deployed URL of your backend
    socket.on('newOrder', (newOrder) => {
      // Notify admin when a new order is placed
      toast.info(`New order placed: Order ID ${newOrder._id}`);
      setOrders((prevOrders) => [newOrder, ...prevOrders]);  // Add new order at the top of the list
      setPrevOrderCount((prevCount) => prevCount + 1);  // Update previous order count
    });

    // Cleanup the socket connection on component unmount
    return () => socket.disconnect();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
              <p className="order-item-delivery-option">
                Delivery Option: {order.deliveryOption === "homeDelivery" ? "Home Delivery" : "Takeaway"}
              </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              name=""
              id=""
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
