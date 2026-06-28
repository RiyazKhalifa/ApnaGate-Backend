'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ComplaintAttachment extends Model {
        static associate(models) {
            this.belongsTo(models.Complaint, {
                foreignKey: 'complaint_id',
                as: 'complaint',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    ComplaintAttachment.init({
        complaint_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        file_url: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const fileUrl = this.getDataValue("file_url");
                if (!fileUrl) return null;

                const baseUrl = process.env.BASE_URL;
                return `${baseUrl}${fileUrl}`.replace(/\\/g, "/");
            }
        },
        file_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ComplaintAttachment',
        tableName: 'complaint_attachments',
        underscored: true,
        timestamps: true,
        updatedAt: false,
        createdAt: 'created_at',
        deletedAt: false
    });

    return ComplaintAttachment;
};
