const authorizeAdmin = (req, res, next) => {
  const user = req.user; 
  if (user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      status: 'error',
      message: 'Forbidden: Admins only',
    });
  }
};

module.exports = authorizeAdmin;
