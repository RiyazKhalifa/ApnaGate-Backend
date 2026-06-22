const ContactService = require("../services/ContactService");

class ContactController {
    static async getAllContacts(req, res) {
        try {
            const { page, limit, search, sortBy, sortOrder } = req.query;
            const contacts = await ContactService.getAllContacts(page, limit, search, sortBy, sortOrder);
            return res.success("messages.contacts_list_retrieved", contacts);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getContactById(req, res) {
        try {
            const id = req.params.id;
            const contact = await ContactService.getContactById(id);
            return res.success("messages.contact_retrieved", contact);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", {}, error.status || 500);
        }
    }

    static async replyToContact(req, res) {
        try {
            const id = req.params.id;
            const { reply } = req.body;
            const result = await ContactService.replyToContact(id, reply);
            return res.success("messages.reply_sent_successfully", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", {}, error.status || 500);
        }
    }
}

module.exports = ContactController;
