const bcrypt = require('bcrypt');
const { User } = require('../../models');

module.exports = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			return res.status(400).json({ error: 'All fields are required.' });
		}

		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(409).json({ error: 'Email already registered.' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			email,
			password: hashedPassword,
		});

		res
			.status(201)
			.json({ id: user.id, email: user.email, createdAt: user.createdAt });
	} catch (error) {
		console.error('registeration error:', error);
		res.sendStatus(500);
	}
};
