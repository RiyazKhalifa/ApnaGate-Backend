const { AppTranslation } = require("../models");
const { decrypt } = require("../utils/EncryptionUtils");

async function checkTranslations() {
    try {
        const translations = await AppTranslation.findAll();
        console.log(`Found ${translations.length} translations.`);
        translations.forEach(t => {
            console.log(`--- Lang: ${t.lang_name} (${t.lang_code}) ---`);
            const decrypted = decrypt(t.customer_translation_data);
            console.log(`Decrypted Data: ${decrypted}`);
        });
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkTranslations();
