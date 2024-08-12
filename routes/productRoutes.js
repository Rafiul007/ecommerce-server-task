const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticateToken = require("../middleware/authenticate");
const authorizeAdmin = require("../middleware/authorizeAdmin");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/product/:
 *   get:
 *     summary: Fetch a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Fetch details of a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product/:
 *   post:
 *     summary: Add a new product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Product
 *               description:
 *                 type: string
 *                 example: Description of the new product
 *               price:
 *                 type: number
 *                 example: 19.99
 *               stockQuantity:
 *                 type: integer
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized, admin only
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update an existing product by ID (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Product
 *               description:
 *                 type: string
 *                 example: Updated description
 *               price:
 *                 type: number
 *                 example: 29.99
 *               stockQuantity:
 *                 type: integer
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: Appliances
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized, admin only
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Remove a product by ID (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized, admin only
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", authenticateToken, authorizeAdmin, productController.addProduct);
router.put("/:id", authenticateToken, authorizeAdmin, productController.updateProduct);
router.delete("/:id", authenticateToken, authorizeAdmin, productController.deleteProduct);

module.exports = router;
