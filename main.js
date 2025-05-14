const authenticateToken = require('./middleware/auth');
const authHandlers = require('./handlers/auth');

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/register', authHandlers.register);

app.post('/auth/login', authHandlers.login);

app.get('/upload', authenticateToken, async (req, res) => {
	res.send('hi');
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
