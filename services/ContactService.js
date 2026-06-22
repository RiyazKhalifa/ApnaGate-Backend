const { ContactUs, Sequelize } = require("../models");
const { Op } = Sequelize;
const emailService = require('../utils/EmailService');

class ContactService {
    static async getAllContacts(page = 1, limit = 10, search = '', sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const whereClause = search ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { subject: { [Op.like]: `%${search}%` } }
                ]
            } : {};

            let orderClause = [['created_at', 'DESC']];

            if (sortBy) {
                const validSortOrder = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

                switch (sortBy) {
                    case 'name':
                        orderClause = [['name', validSortOrder]];
                        break;
                    case 'email':
                        orderClause = [['email', validSortOrder]];
                        break;
                    case 'status':
                        orderClause = [['status', validSortOrder]];
                        break;
                    case 'createdAt':
                        orderClause = [['created_at', validSortOrder]];
                        break;
                }
            }

            const { count, rows } = await ContactUs.findAndCountAll({
                where: whereClause,
                attributes: ['id', 'name', 'email', 'phone', 'subject', 'message', 'status', 'created_at', 'updated_at'],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: orderClause
            });

            return {
                contacts: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error("Error in ContactService.getAllContacts:", error);
            throw error;
        }
    }

    static async getContactById(contactId) {
        const contact = await ContactUs.findByPk(contactId, {
            attributes: ["id", "name", "email", "phone", "subject", "message", "status", "created_at"]
        });
        if (!contact) throw { status: 404, message: "errors.contact_not_found" };
        
        // Mark as read if pending
        if (contact.status === 'pending') {
            await contact.update({ status: 'read' });
        }
        
        return contact;
    }

    static async replyToContact(id, replyText) {
        const contact = await ContactUs.findByPk(id);
        if (!contact) throw { status: 404, message: "errors.contact_not_found" };

        // Send Email
        try {
            await emailService.sendContactReplyEmail(
                contact.email,
                contact.name,
                contact.subject || 'Contact Inquiry',
                replyText
            );
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // We might still want to save the reply in DB even if email fails, 
            // or throw error depending on requirements. 
            // Here we throw to ensure integrity.
            throw { status: 500, message: "errors.email_sending_failed" };
        }

        // Update record
        await contact.update({
            reply: replyText,
            status: 'replied',
            replied_at: new Date()
        });

        return contact;
    }
}

module.exports = ContactService;
