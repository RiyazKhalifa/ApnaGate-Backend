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
            { name: 'society.list', name_ar: 'قائمة الجمعيات' },
            { name: 'society.view', name_ar: 'عرض الجمعية' },
            { name: 'society.create', name_ar: 'إنشاء جمعية' },
            { name: 'society.update', name_ar: 'تحديث الجمعية' },
            { name: 'society.delete', name_ar: 'حذف الجمعية' },
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
            { name: 'notification.list', name_ar: 'قائمة الإشعارات' },
            { name: 'society_role.list', name_ar: 'قائمة أدوار الجمعية' },
            { name: 'society_role.view', name_ar: 'عرض دور الجمعية' },
            { name: 'society_role.create', name_ar: 'إنشاء دور جمعية' },
            { name: 'society_role.update', name_ar: 'تحديث دور جمعية' },
            { name: 'society_role.delete', name_ar: 'حذف دور جمعية' },
            { name: 'society_user.list', name_ar: 'قائمة مستخدمي الجمعية' },
            { name: 'society_user.view', name_ar: 'عرض مستخدم الجمعية' },
            { name: 'society_user.create', name_ar: 'إنشاء مستخدم جمعية' },
            { name: 'society_user.update', name_ar: 'تحديث مستخدم الجمعية' },
            { name: 'society_user.delete', name_ar: 'حذف مستخدم الجمعية' },
            { name: 'block.list', name_ar: 'قائمة البلوكات' },
            { name: 'block.view', name_ar: 'عرض البلوك' },
            { name: 'block.create', name_ar: 'إنشاء بلوك' },
            { name: 'block.update', name_ar: 'تحديث بلوك' },
            { name: 'block.delete', name_ar: 'حذف بلوك' },
            { name: 'tower.list', name_ar: 'قائمة الأبراج' },
            { name: 'tower.view', name_ar: 'عرض البرج' },
            { name: 'tower.create', name_ar: 'إنشاء برج' },
            { name: 'tower.update', name_ar: 'تحديث برج' },
            { name: 'tower.delete', name_ar: 'حذف برج' },
            { name: 'floor.list', name_ar: 'قائمة الطوابق' },
            { name: 'floor.view', name_ar: 'عرض الطابق' },
            { name: 'floor.create', name_ar: 'إنشاء طابق' },
            { name: 'floor.update', name_ar: 'تحديث طابق' },
            { name: 'floor.delete', name_ar: 'حذف طابق' },
            { name: 'flat.list', name_ar: 'قائمة الشقق' },
            { name: 'flat.view', name_ar: 'عرض الشقة' },
            { name: 'flat.create', name_ar: 'إنشاء شقة' },
            { name: 'flat.update', name_ar: 'تحديث شقة' },
            { name: 'flat.delete', name_ar: 'حذف شقة' }
        ];

        for (const permission of permissions) {
            const parts = permission.name.split('.');
            const module = parts[0];
            const action = parts.slice(1).join('.');
            await Permission.findOrCreate({
                where: { name: permission.name },
                defaults: {
                    name: permission.name,
                    name_ar: permission.name_ar,
                    module: module,
                    action: action
                }
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