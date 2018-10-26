const express = require('express');
const Sequelize = require('sequelize');
const semaLog = require(`${__basedir}/seama_services/sema_logger`);
const router = express.Router();
const Op = Sequelize.Op;

const db = require('../models');

/* GET users listing. */
router.get('/', async (req, res) => {
	semaLog.info('GET users - Enter');

	try {
		let users = await db.user.findAll();
		let userData = await Promise.all(
			users.map(async user => await user.toJSON())
		);
		res.json({ users: userData });
	} catch (err) {
		semaLog.error(`GET users failed - ${err}`);
		res.status(400).json({
			message: `Failed to GET users ${err}`,
			error: `${err}`
		});
	}
});

router.post('/', async (req, res) => {
	semaLog.info('create user - enter');
	const {
		username,
		email,
		password,
		firstName,
		lastName,
		role
	} = req.body.data;
	let assignedRoles;
	try {
		const user = await db.user.findOne({
			where: { [Op.or]: [{ email: email }, { username: username }] }
		});
		if (user) {
			semaLog.info('Email/username already exists');
			throw new Error('User already exists');
		}

		const createdUser = await db.user.create({
			username,
			email,
			password,
			first_name: firstName,
			last_name: lastName
		});
		semaLog.info('User created success');

		const dbRoles = await db.role.findAll({ where: { code: role } });
		await Promise.all(dbRoles.map(async r => await r.addUser(createdUser)));

		res.json({
			message: 'create user success',
			user: await createdUser.toJSON()
		});
	} catch (err) {
		semaLog.error(`Create user failed - ${err}`);
		res.status(400).json({
			message: `Failed to create user ${err}`,
			error: `${err}`
		});
	}
});

router.put('/:id', async (req, res) => {
	semaLog.info(`UPDATE user ${req.params.id} - enter`);
	const {
		username,
		email,
		password,
		firstName,
		lastName,
		role
	} = req.body.data;

	try {
		const user = await db.user.find({ where: { id: req.params.id } });
		if (!user) {
			throw new Error('User not found');
		}
		let updatedUser = await user.update({
			username,
			email,
			password,
			first_name: firstName,
			last_name: lastName
		});

		await updatedUser.setRoles([]); // clear roles
		if (user.role) {
			const dbRoles = await db.role.findAll({ where: { code: role } });
			dbRoles.forEach(role => role.addUser(updatedUser));
		}
		res.json({
			message: 'Update user success',
			user: Object.assign({ ...updatedUser.toJSON() }, { role })
		});
	} catch (err) {
		semaLog.error(`Update user failed - ${err}`);
		res.status(400).json({
			message: `Update user failed - ${err}`,
			error: `${err}`
		});
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	semaLog.info(`Enter delete user ${id}`);

	try {
		let user = await db.user.find({ where: { id } });
		if (!user) throw new Error('User not found');
		if (user.active) throw new Error('User must be deactivated');
		await user.destroy();
		semaLog.info('User successfully deleted');
		res.json({
			message: `User ${id} successfully deleted`,
			id
		});
	} catch (err) {
		const message = `Delete user ${id} failed - ${err}`;
		semaLog.error(message);
		res.status(400).json({ message, err: `${err}` });
	}
});

router.put('/toggle/:id', (req, res) => {
	semaLog.info('Users activate/deactivate - Enter ');
	db.user
		.find({
			where: {
				id: req.params.id
			}
		})
		.then(user => {
			if (!user) {
				res.status(404).json({
					message: 'User not found'
				});
			}
			user.update({
				active: !user.active
			}).then(updatedUser => {
				res.status(200).json({
					message: `User ${
						user.active ? 'is active' : 'is deactive'
					}`,
					user: user.toJSON()
				});
			});
		})
		.catch(err => {
			res.status(400).json({
				messsage: `User toggle update failed`
			});
		});
});

module.exports = router;
