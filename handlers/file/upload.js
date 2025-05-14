const { File } = require('../../models');
const checksumQueue = require('../../jobs/compute_checksum');

module.exports = async (req, res) => {
	try {
		const user = req.user;

		const uploadedFile = req.file;
		const { title, description } = req.body ?? {};

		if (!uploadedFile) {
			return res.status(400).json({ error: 'File is required.' });
		}

		const file = await File.create({
			userId: user.id,
			originalFilename: uploadedFile.originalname,
			storagePath: uploadedFile.path,
			title,
			description,
		});

		await checksumQueue.addFile(file.id);

		res.status(200).json({ id: file.id, status: file.status });
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};
