# recipes-app
Recipes website. User register/login, posts crud. Backend finished. Frontend coming.

## Usage

create a .env in root (events-app/.env) and add these lines,
change YOUR_URI with your mongo uri and JWT_SECRET with 
any string (YOUR_SECRET is valid).

```
NODE_ENV = development
PORT = 5000
MONGO_URI = YOUR_URI
JWT_SECRET = YOUR_SECRET
```
This is a mongo uri example, you can find yours by clicking 
'connect' in your mongo cluster, 'drivers', and there you 
can copy the connection string. Be aware that 'dbname' might
be missing in your connection string, add it manually
```
mongodb+srv://<username>:<password>@<clustername>.asdfqwe.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Install dependencies

```
npm install
```

### Run Server

```
npm run server
```
