'use strict';
const { Role, User } = require("../models");
const { hashPassword } = require('../utils/BcryptUtils');

module.exports = {
    async up(queryInterface, Sequelize) {
        const passwordHash = await hashPassword("Password@123");

        const [role] = await Role.findOrCreate({
            where: { name: "Super Admin" },
            defaults: { id: 1, name: "Super Admin", name_ar: "المشرف العام" }
        });

        const [user] = await User.findOrCreate({
            where: { email: "excellentwebworld@gmail.com" },
            defaults: {
                id: 1,
                name: "Super Admin",
                email: "excellentwebworld@gmail.com",
                password: passwordHash,
                status: "active",
                profile_image: null,
                roleId: role.id
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", { email: "excellentwebworld@gmail.com" });
        await queryInterface.bulkDelete("roles", { name: "Super Admin" });
    }
};