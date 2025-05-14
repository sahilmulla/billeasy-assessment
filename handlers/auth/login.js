const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

module.exports = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			return res
				.status(400)
				.json({ error: 'Email and password are required.' });
		}

		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ error: 'Invalid credentials.' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ error: 'Invalid credentials.' });
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{
				expiresIn: '24h',
			}
		);

		res.json({ message: 'Login successful', token });
	} catch (error) {
		console.error('Login error:', error);
		res.sendStatus(500);
	}
};
