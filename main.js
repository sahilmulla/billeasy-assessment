const authenticateToken = require('./middleware/auth');
const authHandlers = require('./handlers/auth');

const { File } = require('./models');

const multer = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 1_000 } }); // 1MB

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/register', authHandlers.register);

app.post('/auth/login', authHandlers.login);

app.post(
	'/upload',
	authenticateToken,
	upload.single('file'),
	async (req, res) => {
		try {
			const user = req.user;

			const uploadedFile = req.file;
			const { title, description } = req.body ?? {};

			if (!uploadedFile) {
				return res.status(400).json({ error: 'File is required.' });
			}

			console.table(uploadedFile);

			const file = await File.create({
				userId: user.id,
				originalFilename: uploadedFile.originalname,
				storagePath: uploadedFile.path,
				title,
				description,
			});

			res.status(200).json({ id: file.id, status: file.status });
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	}
);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
