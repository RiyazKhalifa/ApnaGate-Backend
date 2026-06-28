'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Document extends Model {
        static associate(models) {
            this.belongsTo(models.Society, {
                foreignKey: 'society_id',
                as: 'society',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.SocietyUser, {
                foreignKey: 'uploaded_by',
                as: 'uploader',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    }

    Document.init({
        society_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        document_type: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'document_type'
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
        file_size: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: 'file_size'
        },
        mime_type: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'mime_type'
        },
        uploaded_by: {
            type: DataTypes.BIGINT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Document',
        tableName: 'documents',
        underscored: true,
        paranoid: true
    });

    return Document;
};
