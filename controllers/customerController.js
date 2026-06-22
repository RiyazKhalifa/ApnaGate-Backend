const CustomerService = require("../services/CustomerService");


class CustomerController {
    static async getAllCustomers(req, res) {
        try {
            const { page, limit, search, sortBy, sortOrder } = req.query;
            const result = await CustomerService.getAllCustomers(page, limit, search, sortBy, sortOrder);

            return res.success("messages.customers_retrieved", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getCustomerById(req, res) {
        try {
            const id = req.params.id;
            const customer = await CustomerService.getCustomerById(id);
            return res.success("messages.customer_retrieved", customer);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = CustomerController;