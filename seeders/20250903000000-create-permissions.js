'use strict';

const { Permission, Role, RolePermission } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {

        const permissions = [
            { name: 'user.list', name_ar: 'قائمة المستخدمين' },
            { name: 'user.view', name_ar: 'عرض المستخدم' },
            { name: 'user.create', name_ar: 'إنشاء مستخدم' },
            { name: 'user.update', name_ar: 'تحديث المستخدم' },
            { name: 'user.delete', name_ar: 'حذف المستخدم' },
            { name: 'role.list', name_ar: 'قائمة الأدوار' },
            { name: 'role.create', name_ar: 'إنشاء دور' },
            { name: 'role.update', name_ar: 'تحديث الدور' },
            { name: 'role.delete', name_ar: 'حذف الدور' },
            { name: 'profile.view', name_ar: 'عرض الملف الشخصي' },
            { name: 'profile.update', name_ar: 'تحديث الملف الشخصي' },
            { name: 'customer.list', name_ar: 'قائمة العملاء' },
            { name: 'customer.view', name_ar: 'عرض العميل' },
            { name: 'cms.list', name_ar: 'قائمة CMS' },
            { name: 'cms.view', name_ar: 'منظر CMS' },
            { name: 'cms.update', name_ar: 'تحديث CMS' },
            { name: 'faq.list', name_ar: 'قائمة الأسئلة الشائعة' },
            { name: 'faq.view', name_ar: 'عرض السؤال الشائع' },
            { name: 'faq.create', name_ar: 'إنشاء سؤال شائع' },
            { name: 'faq.update', name_ar: 'تحديث السؤال الشائع' },
            { name: 'faq.delete', name_ar: 'حذف السؤال الشائع' },
            { name: 'site_setting.list', name_ar: 'قائمة إعدادات الموقع' },
            { name: 'site_setting.update', name_ar: 'تحديث إعداد الموقع' },
            { name: 'app_setting.list', name_ar: 'قائمة إعدادات التطبيق' },
            { name: 'app_setting.update', name_ar: 'تحديث إعدادات التطبيق' },
            { name: 'status.update', name_ar: 'تحديث الحالة' },
            { name: 'record.delete', name_ar: 'حذف السجل' },
            { name: 'sequence.update', name_ar: 'تحديث التسلسل' },
            { name: 'app_translation.list', name_ar: 'قائمة ترجمات التطبيق' },
            { name: 'app_translation.view', name_ar: 'عرض ترجمة التطبيق' },
            { name: 'app_translation.create', name_ar: 'إنشاء ترجمة التطبيق' },
            { name: 'app_translation.update', name_ar: 'تحديث ترجمة التطبيق' },
            { name: 'contact.list', name_ar: 'قائمة جهات الاتصال' },
            { name: 'contact.view', name_ar: 'عرض جهة الاتصال' },
            { name: 'contact.reply', name_ar: 'الرد على جهة الاتصال' },
            { name: 'contact.delete', name_ar: 'حذف جهة الاتصال' },
            { name: 'notification.list', name_ar: 'قائمة الإشعارات' }
        ];

        for (const permission of permissions) {
            await Permission.findOrCreate({
                where: { name: permission.name },
                defaults: permission
            });
        }

        const superAdminRole = await Role.findOne({ where: { name: 'Super Admin' } });

        if (superAdminRole) {
            const allPermissions = await Permission.findAll();

            for (const permission of allPermissions) {
                await RolePermission.findOrCreate({
                    where: {
                        roleId: superAdminRole.id,
                        permissionId: permission.id
                    },
                    defaults: {
                        roleId: superAdminRole.id,
                        permissionId: permission.id
                    }
                });
            }
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('role_permissions', null, {});
        await queryInterface.bulkDelete('permissions', null, {});
    }
};