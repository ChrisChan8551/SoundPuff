'use strict';
const bcrypt = require('bcryptjs');
const { Model, Validator } = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		toSafeObject() {
			const { id, username, firstName, lastName, email } = this; // context will be the User instance
			return { id, username, firstName, lastName, email };
		}
		validatePassword(password) {
			return bcrypt.compareSync(password, this.hashedPassword.toString());
		}

		static getCurrentUserById(id) {
			return User.scope('currentUser').findByPk(id);
		}

		static async login({ credential, password }) {
			const { Op } = require('sequelize');
			const user = await User.scope('loginUser').findOne({
				where: {
					[Op.or]: {
						username: credential,
						email: credential,
					},
				},
			});
			if (user && user.validatePassword(password)) {
				return await User.scope('currentUser').findByPk(user.id);
			}
		}

		static async signup({ firstName, lastName, email, username, password }) {
			const hashedPassword = bcrypt.hashSync(password);
			const user = await User.create({
				firstName,
				lastName,
				email,
				username,
				hashedPassword,
			});
			return await User.scope('currentUser').findByPk(user.id);
		}

		static associate(models) {
			User.hasMany(models.Song, { foreignKey: 'userId' });
			// User.belongsTo(models.Comment, { foreignKey: 'userId' });
			// User.belongsTo(models.Album, { foreignKey: 'userId' });
			// User.belongsTo(models.Playlist, { foreignKey: 'userId' });
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 30],
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 30],
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
					isEmail: true,
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 30],
					isNotEmail(value){
						if(Validator.isEmail(value)){
							throw new Error("Cannot be an email.");
						}
					}
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			sequelize,
			modelName: 'User',
			defaultScope: {
				attributes: {
					exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
				},
			},
			scopes: {
				currentUser: {
					attributes: {
						exclude: ['hashedPassword', 'createdAt', 'updatedAt', 'imageUrl', 'username'],
					},
				},
				loginUser: {
					attributes: {
						imageUrl: 'image url',
					},
				},
			},
		}
	);
	return User;
};
