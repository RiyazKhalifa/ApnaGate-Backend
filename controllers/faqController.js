const FaqService = require("../services/FaqService");

class FaqController {
    static async getAllFaqs(req, res) {
        try {
            const { page, limit, search, sortBy, sortOrder } = req.query;
            const faqs = await FaqService.getAllFaqs(page, limit, search, sortBy, sortOrder);
            return res.success("messages.faqs_list_retrieved", faqs);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getFaqById(req, res) {
        try {
            const id = req.params.id;
            const faq = await FaqService.getFaqById(id);
            return res.success("messages.faq_retrieved", faq);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", {}, error.status || 500);
        }
    }

    static async createFaq(req, res) {
        try {
            const faqData = req.body;
            const newFaq = await FaqService.createFaq(faqData);
            return res.success("messages.faq_created", newFaq, 201);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", {}, error.status || 500);
        }
    }

    static async updateFaq(req, res) {
        try {
            const id = req.params.id;
            const faqData = req.body;
            const updatedFaq = await FaqService.updateFaq(id, faqData);
            return res.success("messages.faq_updated", updatedFaq);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", {}, error.status || 500);
        }
    }
}

module.exports = FaqController;