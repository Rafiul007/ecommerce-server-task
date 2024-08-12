const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const OrderProduct = require("../models/OrderProducts");
const { Op } = require("sequelize");

// Create a new order
const createOrder = async (req, res) => {
  const { orderProductInfos, totalAmount } = req.body; // orderProductInfos is an array of objects with product ids and quantity
  const userId = req.user.id;

  if (
    !Array.isArray(orderProductInfos) ||
    orderProductInfos.length === 0 ||
    !totalAmount
  ) {
    return res.status(400).json({
      status: "error",
      message: "Invalid input data",
    });
  }

  try {
    // Extract product IDs from orderProductInfos
    const productIds = orderProductInfos.map((info) => info.productId);

    // Check if the products exist in the database
    const products = await Product.findAll({
      where: { id: { [Op.in]: productIds } },
    });

    if (products.length !== productIds.length) {
      return res.status(404).json({
        status: "error",
        message: "One or more products not found",
      });
    }

    // Create the new order
    const order = await Order.create({
      userId,
      totalAmount,
    });

    // Add products to OrderProducts
    await OrderProduct.bulkCreate(
      orderProductInfos.map((orderProductInfo) => ({
        orderId: order.id,
        productId: orderProductInfo.productId,
        quantity: orderProductInfo.quantity,
      }))
    );

    res.status(201).json({
      status: "success",
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Fetch all orders for the authenticated user
const getAllOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetch all orders for the user including associated OrderProducts and Product details
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderProduct,
          include: [Product],
        },
        {
          model: User,
          attributes: { exclude: ['password', 'updatedAt', 'createdAt'] }, 
        },
      ],
    });

    // Prepare the response with OrderProduct information and User details
    const ordersWithDetails = orders.map((order) => {
      const orderJson = order.toJSON();

      // Prepare OrderProducts with their Product details
      const orderProducts = orderJson.OrderProducts.map(op => ({
        id: op.id,
        orderId: op.orderId,
        quantity: op.quantity,
        Product: {
          id: op.Product.id,
          name: op.Product.name,
          description: op.Product.description,
          price: op.Product.price,
          category: op.Product.category,
        }
      }));

      return {
        id: orderJson.id,
        userId: orderJson.userId,
        totalAmount: orderJson.totalAmount,
        status: orderJson.status,
        createdAt: orderJson.createdAt,
        OrderProducts: orderProducts,
        User: orderJson.User 
      };
    });

    res.status(200).json({
      status: "success",
      orders: ordersWithDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


const getOrderById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  console.log(userId);

  try {
    // Fetch the order with associated OrderProducts and Product details
    const order = await Order.findOne({
      where: {
        id,
        userId,
      },
      include: [
        {
          model: OrderProduct,
          include: [Product], 
        },
        {
          model: User,
          attributes: { exclude: ['password', 'updatedAt', 'createdAt'] }, 
        },
      ],
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    const orderJson = order.toJSON();

    // Prepare the OrderProducts with their Product details
    const orderProducts = orderJson.OrderProducts.map(op => ({
      id: op.id,
      orderId: op.orderId,
      productId: op.productId,
      quantity: op.quantity,
      createdAt: op.createdAt,
      Product: {
        id: op.Product.id,
        name: op.Product.name,
        description: op.Product.description,
        price: op.Product.price,
        category: op.Product.category,
      }
    }));

    res.status(200).json({
      status: "success",
      order: {
        id: orderJson.id,
        userId: orderJson.userId,
        User: orderJson.User ,
        totalAmount: orderJson.totalAmount,
        status: orderJson.status,
        OrderProducts: orderProducts, 
        
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


module.exports = { createOrder, getAllOrders, getOrderById };
