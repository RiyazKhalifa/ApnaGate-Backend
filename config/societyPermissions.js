const SOCIETY_PERMISSIONS = [
    // Dashboard
    { name: 'dashboard.view', name_ar: 'عرض لوحة القيادة', module: 'dashboard', action: 'view' },

    // Blocks
    { name: 'block.list', name_ar: 'قائمة الكتل', module: 'block', action: 'list' },
    { name: 'block.view', name_ar: 'عرض الكتلة', module: 'block', action: 'view' },
    { name: 'block.create', name_ar: 'إنشاء كتلة', module: 'block', action: 'create' },
    { name: 'block.update', name_ar: 'تحديث الكتلة', module: 'block', action: 'update' },
    { name: 'block.delete', name_ar: 'حذف الكتلة', module: 'block', action: 'delete' },

    // Towers
    { name: 'tower.list', name_ar: 'قائمة الأبراج', module: 'tower', action: 'list' },
    { name: 'tower.view', name_ar: 'عرض البرج', module: 'tower', action: 'view' },
    { name: 'tower.create', name_ar: 'إنشاء برج', module: 'tower', action: 'create' },
    { name: 'tower.update', name_ar: 'تحديث البرج', module: 'tower', action: 'update' },
    { name: 'tower.delete', name_ar: 'حذف البرج', module: 'tower', action: 'delete' },

    // Floors
    { name: 'floor.list', name_ar: 'قائمة الطوابق', module: 'floor', action: 'list' },
    { name: 'floor.view', name_ar: 'عرض الطابق', module: 'floor', action: 'view' },
    { name: 'floor.create', name_ar: 'إنشاء طابق', module: 'floor', action: 'create' },
    { name: 'floor.update', name_ar: 'تحديث الطابق', module: 'floor', action: 'update' },
    { name: 'floor.delete', name_ar: 'حذف الطابق', module: 'floor', action: 'delete' },

    // Flats
    { name: 'flat.list', name_ar: 'قائمة الشقق', module: 'flat', action: 'list' },
    { name: 'flat.view', name_ar: 'عرض الشقة', module: 'flat', action: 'view' },
    { name: 'flat.create', name_ar: 'إنشاء شقة', module: 'flat', action: 'create' },
    { name: 'flat.update', name_ar: 'تحديث الشقة', module: 'flat', action: 'update' },
    { name: 'flat.delete', name_ar: 'حذف الشقة', module: 'flat', action: 'delete' },

    // Residents
    { name: 'resident.list', name_ar: 'قائمة السكان', module: 'resident', action: 'list' },
    { name: 'resident.view', name_ar: 'عرض الساكن', module: 'resident', action: 'view' },
    { name: 'resident.create', name_ar: 'إنشاء ساكن', module: 'resident', action: 'create' },
    { name: 'resident.update', name_ar: 'تحديث الساكن', module: 'resident', action: 'update' },
    { name: 'resident.delete', name_ar: 'حذف الساكن', module: 'resident', action: 'delete' },

    // Visitors
    { name: 'visitor.list', name_ar: 'قائمة الزوار', module: 'visitor', action: 'list' },
    { name: 'visitor.view', name_ar: 'عرض الزائر', module: 'visitor', action: 'view' },
    { name: 'visitor.create', name_ar: 'إنشاء زائر', module: 'visitor', action: 'create' },
    { name: 'visitor.update', name_ar: 'تحديث الزائر', module: 'visitor', action: 'update' },
    { name: 'visitor.delete', name_ar: 'حذف الزائر', module: 'visitor', action: 'delete' },

    // Daily Helpers
    { name: 'daily_helper.list', name_ar: 'قائمة المساعدين اليوميين', module: 'daily_helper', action: 'list' },
    { name: 'daily_helper.view', name_ar: 'عرض المساعد اليومي', module: 'daily_helper', action: 'view' },
    { name: 'daily_helper.create', name_ar: 'إنشاء مساعد يومي', module: 'daily_helper', action: 'create' },
    { name: 'daily_helper.update', name_ar: 'تحديث المساعد اليومي', module: 'daily_helper', action: 'update' },
    { name: 'daily_helper.delete', name_ar: 'حذف المساعد اليومي', module: 'daily_helper', action: 'delete' },

    // Staff
    { name: 'staff.list', name_ar: 'قائمة الموظفين', module: 'staff', action: 'list' },
    { name: 'staff.view', name_ar: 'عرض الموظف', module: 'staff', action: 'view' },
    { name: 'staff.create', name_ar: 'إنشاء موظف', module: 'staff', action: 'create' },
    { name: 'staff.update', name_ar: 'تحديث الموظف', module: 'staff', action: 'update' },
    { name: 'staff.delete', name_ar: 'حذف الموظف', module: 'staff', action: 'delete' },

    // Complaints
    { name: 'complaint.list', name_ar: 'قائمة الشكاوى', module: 'complaint', action: 'list' },
    { name: 'complaint.view', name_ar: 'عرض الشكوى', module: 'complaint', action: 'view' },
    { name: 'complaint.create', name_ar: 'إنشاء شكوى', module: 'complaint', action: 'create' },
    { name: 'complaint.update', name_ar: 'تحديث الشكوى', module: 'complaint', action: 'update' },
    { name: 'complaint.delete', name_ar: 'حذف الشكوى', module: 'complaint', action: 'delete' },

    // Maintenance Invoices
    { name: 'maintenance_invoice.list', name_ar: 'قائمة فواتير الصيانة', module: 'maintenance_invoice', action: 'list' },
    { name: 'maintenance_invoice.view', name_ar: 'عرض فاتورة الصيانة', module: 'maintenance_invoice', action: 'view' },
    { name: 'maintenance_invoice.create', name_ar: 'إنشاء فاتورة صيانة', module: 'maintenance_invoice', action: 'create' },
    { name: 'maintenance_invoice.update', name_ar: 'تحديث فاتورة الصيانة', module: 'maintenance_invoice', action: 'update' },
    { name: 'maintenance_invoice.delete', name_ar: 'حذف فاتورة الصيانة', module: 'maintenance_invoice', action: 'delete' },

    // Payments
    { name: 'payment.list', name_ar: 'قائمة المدفوعات', module: 'payment', action: 'list' },
    { name: 'payment.view', name_ar: 'عرض الدفع', module: 'payment', action: 'view' },
    { name: 'payment.create', name_ar: 'إنشاء دفع', module: 'payment', action: 'create' },
    { name: 'payment.update', name_ar: 'تحديث الدفع', module: 'payment', action: 'update' },
    { name: 'payment.delete', name_ar: 'حذف الدفع', module: 'payment', action: 'delete' },

    // Amenities
    { name: 'amenity.list', name_ar: 'قائمة المرافق', module: 'amenity', action: 'list' },
    { name: 'amenity.view', name_ar: 'عرض المرفق', module: 'amenity', action: 'view' },
    { name: 'amenity.create', name_ar: 'إنشاء مرفق', module: 'amenity', action: 'create' },
    { name: 'amenity.update', name_ar: 'تحديث المرفق', module: 'amenity', action: 'update' },
    { name: 'amenity.delete', name_ar: 'حذف المرفق', module: 'amenity', action: 'delete' },

    // Notices
    { name: 'notice.list', name_ar: 'قائمة الإشعارات', module: 'notice', action: 'list' },
    { name: 'notice.view', name_ar: 'عرض الإشعار', module: 'notice', action: 'view' },
    { name: 'notice.create', name_ar: 'إنشاء إشعار', module: 'notice', action: 'create' },
    { name: 'notice.update', name_ar: 'تحديث الإشعار', module: 'notice', action: 'update' },
    { name: 'notice.delete', name_ar: 'حذف الإشعار', module: 'notice', action: 'delete' },

    // Events
    { name: 'event.list', name_ar: 'قائمة الفعاليات', module: 'event', action: 'list' },
    { name: 'event.view', name_ar: 'عرض الفعالية', module: 'event', action: 'view' },
    { name: 'event.create', name_ar: 'إنشاء فعالية', module: 'event', action: 'create' },
    { name: 'event.update', name_ar: 'تحديث الفعالية', module: 'event', action: 'update' },
    { name: 'event.delete', name_ar: 'حذف الفعالية', module: 'event', action: 'delete' },

    // Documents
    { name: 'document.list', name_ar: 'قائمة المستندات', module: 'document', action: 'list' },
    { name: 'document.view', name_ar: 'عرض المستند', module: 'document', action: 'view' },
    { name: 'document.create', name_ar: 'إنشاء مستند', module: 'document', action: 'create' },
    { name: 'document.update', name_ar: 'تحديث المستند', module: 'document', action: 'update' },
    { name: 'document.delete', name_ar: 'حذف المستند', module: 'document', action: 'delete' },

    // Assets
    { name: 'asset.list', name_ar: 'قائمة الأصول', module: 'asset', action: 'list' },
    { name: 'asset.view', name_ar: 'عرض الأصل', module: 'asset', action: 'view' },
    { name: 'asset.create', name_ar: 'إنشاء أصل', module: 'asset', action: 'create' },
    { name: 'asset.update', name_ar: 'تحديث الأصل', module: 'asset', action: 'update' },
    { name: 'asset.delete', name_ar: 'حذف الأصل', module: 'asset', action: 'delete' },

    // Society Roles
    { name: 'society_role.list', name_ar: 'قائمة أدوار الجمعية', module: 'society_role', action: 'list' },
    { name: 'society_role.view', name_ar: 'عرض دور الجمعية', module: 'society_role', action: 'view' },
    { name: 'society_role.create', name_ar: 'إنشاء دور جمعية', module: 'society_role', action: 'create' },
    { name: 'society_role.update', name_ar: 'تحديث دور جمعية', module: 'society_role', action: 'update' },
    { name: 'society_role.delete', name_ar: 'حذف دور جمعية', module: 'society_role', action: 'delete' },

    // Society Users
    { name: 'society_user.list', name_ar: 'قائمة مستخدمي الجمعية', module: 'society_user', action: 'list' },
    { name: 'society_user.view', name_ar: 'عرض مستخدم الجمعية', module: 'society_user', action: 'view' },
    { name: 'society_user.create', name_ar: 'إنشاء مستخدم جمعية', module: 'society_user', action: 'create' },
    { name: 'society_user.update', name_ar: 'تحديث مستخدم الجمعية', module: 'society_user', action: 'update' },
    { name: 'society_user.delete', name_ar: 'حذف مستخدم الجمعية', module: 'society_user', action: 'delete' }
];

module.exports = SOCIETY_PERMISSIONS;
