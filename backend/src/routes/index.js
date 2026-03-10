const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const propertyController = require('../controllers/propertyController');
const tenantController = require('../controllers/tenantController');
const paymentController = require('../controllers/paymentController');
const bookingController = require('../controllers/bookingController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Auth routes
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// Property routes
router.get('/properties', authMiddleware, propertyController.getAll);
router.post('/properties', authMiddleware, upload.single('image'), propertyController.create);
router.put('/properties/:id', authMiddleware, upload.single('image'), propertyController.update);
router.delete('/properties/:id', authMiddleware, propertyController.delete);

// Tenant routes
router.get('/tenants', authMiddleware, tenantController.getAll);
router.post('/tenants', authMiddleware, tenantController.create);
router.put('/tenants/:id', authMiddleware, tenantController.update);
router.delete('/tenants/:id', authMiddleware, tenantController.delete);

// Payment routes
router.get('/payments', authMiddleware, paymentController.getAll);
router.post('/payments', authMiddleware, paymentController.create);
router.put('/payments/:id', authMiddleware, paymentController.update);
router.delete('/payments/:id', authMiddleware, paymentController.delete);

// Booking routes
router.get('/bookings', authMiddleware, bookingController.getAll);
router.post('/bookings', authMiddleware, bookingController.create);
router.put('/bookings/:id/status', authMiddleware, bookingController.updateStatus);

// User routes
router.get('/users', authMiddleware, userController.getAllUsers);
router.post('/users', authMiddleware, userController.createUser);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;
