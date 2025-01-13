
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//config variables
const currency = "GBP";
const deliveryCharge = 1.5;
const frontend_URL = 'https://tastyworld-frontend.onrender.com/';


// Placing User Order for Frontend using Stripe
const placeOrder = async (req, res) => {
  try {
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert to smallest currency unit
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: req.body.deliveryCharge * 100,
      },
      quantity: 1,
    });

    // Prepare metadata for creating the order after payment
    const metadata = {
      userId: req.body.userId,
      items: JSON.stringify(req.body.items),
      amount: req.body.amount,
      address: req.body.address,
      deliveryOption: req.body.deliveryOption,
      deliveryCharge: req.body.deliveryCharge,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${frontend_URL}/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontend_URL}/verify?success=false`,
      line_items: line_items,
      mode: "payment",
      metadata,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error processing order" });
  }
};

// Verify and Save Order after Successful Payment
const verifyOrder = async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const metadata = session.metadata;

      // Create the order using metadata
      const newOrder = new orderModel({
        userId: metadata.userId,
        items: JSON.parse(metadata.items),
        amount: metadata.amount,
        address: metadata.address,
        deliveryOption: metadata.deliveryOption,
        deliveryCharge: metadata.deliveryCharge,
        payment: true,
      });

      await newOrder.save();
      await userModel.findByIdAndUpdate(metadata.userId, { cartData: {} });

      res.json({ success: true, message: "Order verified and saved successfully" });
    } else {
      res.json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

// Placing User Order for COD (Cash on Delivery)
const placeOrderCod = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: true, // COD is marked as paid
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// Listing Orders for Admin Panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// Fetching User Orders for Frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching user orders" });
  }
};

// Update Order Status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, placeOrderCod, listOrders, userOrders, updateStatus, verifyOrder };
