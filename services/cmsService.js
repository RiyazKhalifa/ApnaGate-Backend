const { Cms, Sequelize, sequelize } = require("../models");
const { Op } = Sequelize;

class CmsService {
    static async getAllCms(page = 1, limit = 10, search = '', sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const whereClause = search ? {
                [Op.or]: [
                    { title: { [Op.like]: `%${search}%` } },
                    { title_ar: { [Op.like]: `%${search}%` } },
                    { slug: { [Op.like]: `%${search}%` } }
                ]
            } : {};

            let orderClause = [['created_at', 'DESC']];

            if (sortBy) {
                const validSortOrder = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

                switch (sortBy) {
                    case 'title':
                        orderClause = [['title', validSortOrder]];
                        break;
                    case 'createdAt':
                        orderClause = [['created_at', validSortOrder]];
                        break;
                }
            }

            const { count, rows } = await Cms.findAndCountAll({
                where: whereClause,
                attributes: ['id', 'title', 'title_ar', 'content', 'content_ar', 'slug', 'created_at', 'updated_at'],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: orderClause
            });

            return {
                cms: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error("Error in CmsService.getAllCms:", error);
            throw error;
        }
    }

    static async getCmsById(cmsId) {
        const cms = await Cms.findByPk(cmsId, {
            attributes: ["id", "title", "title_ar", "content", "content_ar", "slug"]
        });
        if (!cms) throw { status: 404, message: "errors.cms_not_found" };
        return cms;
    }

    static async updateCms(cmsId, data) {
        const { title, title_ar, content, content_ar, slug } = data;

        const cms = await Cms.findByPk(cmsId);
        if (!cms) throw { status: 404, message: "errors.cms_not_found" };

        if (slug && slug !== cms.slug) {
            const existing = await Cms.findOne({ where: { slug } });
            if (existing) throw { status: 400, message: "errors.cms_slug_already_exists" };
        }

        if (title) cms.title = title;
        if (title_ar) cms.title_ar = title_ar;
        if (content) cms.content = content;
        if (content_ar) cms.content_ar = content_ar;
        if (slug) cms.slug = slug;
        await cms.save();

        return await Cms.findByPk(cmsId, { attributes: ["id", "title", "title_ar", "content", "content_ar", "slug"] });
    }
}

module.exports = CmsService;