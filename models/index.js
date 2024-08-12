const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderProduct = require('./OrderProducts'); 

// User to Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Order to OrderProduct
Order.hasMany(OrderProduct, { foreignKey: 'orderId' });
OrderProduct.belongsTo(Order, { foreignKey: 'orderId' });

// Product to OrderProduct
Product.hasMany(OrderProduct, { foreignKey: 'productId' });
OrderProduct.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  User,
  Product,
  Order,
  OrderProduct,
};
