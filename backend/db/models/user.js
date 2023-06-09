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

		static async signup({
			firstName,
			lastName,
			email,
			username,
			password,
		}) {
			const hashedPassword = bcrypt.hashSync(password);
			// console.log(firstName,lastName)
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
			User.hasMany(models.Album, { foreignKey: 'userId' });
			User.hasMany(models.Comment, { foreignKey: 'userId' });
			User.hasMany(models.Playlist, { foreignKey: 'userId' });
			User.hasMany(models.Song, { foreignKey: 'userId' });
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error('Cannot be an email.');
						}
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [3, 256],
					isEmail: true,
				},
			},

			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
			previewImage: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: 'User',
			defaultScope: {
				attributes: {
					exclude: [
						'firstName',
						'lastName',
						'hashedPassword',
						'email',
						'createdAt',
						'updatedAt',
					],
				},
			},
			scopes: {
				currentUser: {
					attributes: {
						// exclude: ['hashedPassword', 'createdAt', 'updatedAt','previewImage'],
						exclude: [
							'firstName',
							'lastName',
							'hashedPassword',
							'previewImage',
						],
					},
				},
				loginUser: {
					attributes: {},
				},
				artistDetails: {
					attributes: {
						exclude: [
							'hashedPassword',
							'createdAt',
							'updatedAt',
							'isArtist',
							'firstName',
							'lastName',
							'email',
						],
					},
				},
			},
		}
	);
	return User;
};
