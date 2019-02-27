/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('reading', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		kiosk_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'kiosk',
				key: 'id'
			}
		},
		parameter_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'parameter',
				key: 'id'
			}
		},
		sampling_site_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'sampling_site',
				key: 'id'
			}
		},
		value: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			}
		}
	}, {
		tableName: 'reading',
		timestamps: false,
		underscored: true
	});
};
