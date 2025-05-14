const { File } = require('../../models');

module.exports = async (req, res) => {
	try {
		const user = req.user;

		const files = await File.findAll({ where: { userId: user.id } });
		res.json(files);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
