const { Faq, Sequelize } = require("../models");
const { Op } = Sequelize;

class FaqService {
    static async getAllFaqs(page = 1, limit = 10, search = '', sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const whereClause = search ? {
                [Op.or]: [
                    { question: { [Op.like]: `%${search}%` } },
                    { question_ar: { [Op.like]: `%${search}%` } }
                ]
            } : {};

            let orderClause = [['created_at', 'DESC']];

            if (sortBy) {
                const validSortOrder = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

                switch (sortBy) {
                    case 'question':
                        orderClause = [['question', validSortOrder]];
                        break;
                    case 'sequence':
                        orderClause = [['sequence', validSortOrder]];
                        break;
                    case 'createdAt':
                        orderClause = [['created_at', validSortOrder]];
                        break;
                }
            }

            const { count, rows } = await Faq.findAndCountAll({
                where: whereClause,
                attributes: ['id', 'question', 'question_ar', 'answer', 'answer_ar', 'status', 'sequence', 'created_at', 'updated_at'],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: orderClause
            });

            return {
                faqs: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error("Error in FaqService.getAllFaqs:", error);
            throw error;
        }
    }

    static async getFaqById(faqId) {
        const faq = await Faq.findByPk(faqId, {
            attributes: ["id", "question", "question_ar", "answer", "answer_ar", "status", "sequence"]
        });
        if (!faq) throw { status: 404, message: "errors.faq_not_found" };
        return faq;
    }

    static async createFaq(faqData) {
        try {
            const { question, question_ar, answer, answer_ar, status = 'active' } = faqData;

            // Always append at the end
            const maxSeq = await Faq.max('sequence') || 0;
            const finalSequence = maxSeq + 1;

            const faq = await Faq.create({
                question,
                question_ar,
                answer,
                answer_ar,
                status,
                sequence: finalSequence
            });

            return await this.getFaqById(faq.id);
        } catch (error) {
            console.error("Error in createFaq:", error);
            throw error;
        }
    }

    static async updateFaq(faqId, data) {
        const { question, question_ar, answer, answer_ar, status } = data;

        const faq = await Faq.findByPk(faqId);
        if (!faq) throw { status: 404, message: "errors.faq_not_found" };

        if (question !== undefined) faq.question = question;
        if (question_ar !== undefined) faq.question_ar = question_ar;
        if (answer !== undefined) faq.answer = answer;
        if (answer_ar !== undefined) faq.answer_ar = answer_ar;
        if (status !== undefined) faq.status = status;
        await faq.save();

        return await Faq.findByPk(faqId, { attributes: ["id", "question", "question_ar", "answer", "answer_ar", "status", "sequence"] });
    }
}

module.exports = FaqService;