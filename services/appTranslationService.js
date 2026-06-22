const { AppTranslation, sequelize } = require("../models");
const { encrypt, decrypt } = require("../utils/EncryptionUtils");
const { Op } = require("sequelize");

class AppTranslationService {
    /**
     * Get all languages
     */
    static async getAllLanguages() {
        return await AppTranslation.findAll({
            attributes: ["id", "lang_code", "lang_name", "direction", "created_at", "updated_at"],
            order: [["created_at", "ASC"]],
        });
    }

    /**
     * Get translations for a specific language
     * @param {string} langCode 
     */
    static async getTranslationsByLang(langCode) {
        let record = await AppTranslation.findOne({
            where: { lang_code: langCode }
        });

        if (!record) {
            return null;
        }

        return {
            ...record.toJSON(),
            customer_translation_data: record.customer_translation_data ? JSON.parse(decrypt(record.customer_translation_data) || "{}") : {}
        };
    }

    /**
     * Add a new key to all languages
     * @param {string} key 
     * @param {string} value
     * @param {string} appType 'customer'
     */
    static async addKeyToAllLanguages(key, value, appType) {
        const transaction = await sequelize.transaction();
        try {
            let languages = await AppTranslation.findAll({ transaction });
            
            // If no languages exist, create default 'en' to hold the keys
            if (languages.length === 0) {
                const defaultLabel = "English";
                const defaultLang = await AppTranslation.create({
                    lang_code: "en",
                    lang_name: defaultLabel,
                    direction: "ltr",
                    customer_translation_data: encrypt(JSON.stringify({})),
                }, { transaction });
                languages = [defaultLang];
            }

            const field = 'customer_translation_data';

            for (const lang of languages) {
                let data = lang[field] ? JSON.parse(decrypt(lang[field]) || "{}") : {};
                
                // Only add if key doesn't exist
                if (data[key] === undefined) {
                    data[key] = value || "";
                    lang[field] = encrypt(JSON.stringify(data));
                    await lang.save({ transaction });
                }
            }

            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    /**
     * Update translations for a specific language and app type (Upsert)
     * @param {string} langCode 
     * @param {string} appType 'customer'
     * @param {Object} translations 
     * @param {Object} extraData { lang_name, direction }
     */
    static async updateTranslations(langCode, appType, translations, extraData = {}) {
        let record = await AppTranslation.findOne({
            where: { lang_code: langCode }
        });

        if (!record) {
            throw { message: "messages.language_not_found", status: 404 };
        }

        const field = 'customer_translation_data';
        record[field] = encrypt(JSON.stringify(translations));
        
        if (extraData.lang_name) record.lang_name = extraData.lang_name;
        if (extraData.direction) record.direction = extraData.direction;

        await record.save();

        return true;
    }

    /**
     * Create a new language record
     */
    static async createLanguage(data) {
        // When creating a new language, we should ideally populate it with the keys from an existing language
        const existingLang = await AppTranslation.findOne();
        let customerData = "{}";

        if (existingLang) {
            if (existingLang.customer_translation_data) {
                const decrypted = decrypt(existingLang.customer_translation_data);
                customerData = encrypt(decrypted || "{}");
            }
        }

        return await AppTranslation.create({
            ...data,
            customer_translation_data: customerData
        });
    }
}

module.exports = AppTranslationService;
