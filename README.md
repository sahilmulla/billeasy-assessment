# 1. Getting up and running

### 1.1 Setup the env

1. add a .env file with below keys

```
DB_USER
DB_PASS
DB_NAME
JWT_SECRET
```

2. Install dependencies

```
npm install
```

### 1.2 Run the env

```
docker compose up --detach
```

### 1.3 Run the service

```
npm run dev
```

# 2. APIs

### 2.1 Register

Register a user using `POST http://localhost:3000/register`

```json
{
	"email": "johndoe@example.com",
	"password": "Test@123"
}
```

### 2.2 Login

Login using `POST http://localhost:3000/auth/login`, this will return the auth token

```json
{
	"email": "johndoe@example.com",
	"password": "Test@123"
}
```

### 2.3 Upload

_Requires Bearer Token_

Uplaod a file using `POST http://localhost:3000/upload`

```
form data
    file <1MB
    title (optional) text
    description (optional) text
```

### 2.4 Files

_Requires Bearer Token_

1. Get all files using `GET http://localhost:3000/files`
1. Get specific file using `GET http://localhost:3000/files/:id`
