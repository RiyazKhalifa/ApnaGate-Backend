const express = require("express");
const CustomerController = require("../controllers/CustomerController");
const CustomerValidator = require("../validators/CustomerValidator");
const authMiddleware = require("../middlewares/AuthMiddleware");
const checkPermission = require("../middlewares/PermissionMiddleware");
const validateRequest = require("../middlewares/ValidateRequest");

const router = express.Router();
router.use(authMiddleware);

router.get(
    "/",
    checkPermission("customer.list"),
    CustomerController.getAllCustomers
);
router.get(
    "/:id",
    checkPermission("customer.view"),
    CustomerValidator.customerIdValidator,
    validateRequest,
    CustomerController.getCustomerById
);

module.exports = router;