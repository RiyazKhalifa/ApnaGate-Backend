'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class VisitorPass extends Model {
        static associate(models) {
            this.belongsTo(models.Visitor, {
                foreignKey: 'visitor_id',
                as: 'visitor',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    VisitorPass.init({
        visitor_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        qr_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pass_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        validFrom: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'valid_from'
        },
        validUntil: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'valid_until'
        },
        is_used: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'VisitorPass',
        tableName: 'visitor_passes',
        underscored: true,
        timestamps: true,
        updatedAt: false,
        createdAt: 'created_at',
        deletedAt: false
    });

    return VisitorPass;
};
