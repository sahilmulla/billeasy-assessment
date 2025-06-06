const authenticateToken = require('./middleware/auth');
const authHandlers = require('./handlers/auth');
const fileHandlers = require('./handlers/file');

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
	fileHandlers.upload
);

app.get('/files', authenticateToken, fileHandlers.filesByUser);
app.get('/files/:id', authenticateToken, fileHandlers.filesById);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
