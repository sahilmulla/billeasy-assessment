const { File } = require('../../models');

module.exports = async (req, res) => {
	try {
		const user = req.user;
		const { id } = req.params ?? {};

		const file = await File.findByPk(id);

		if (!file) {
			return res.status(404).json({ message: 'File does not exist.' });
		}

		if (file.userId !== user.id) {
			return res.status(403);
		}

		res.json({
			id: file.id,
			title: file.title,
			description: file.description,
			status: file.status,
			extractedData: file.extractedData ?? undefined,
		});
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
