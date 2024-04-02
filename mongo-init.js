db = db.getSiblingDB(process.env.DB_APP_NAME);

db.createUser({
    user: process.env.DB_APP_USER,
    pwd: process.env.DB_APP_PASSWORD,
    roles: [{ role: 'readWrite', db: process.env.DB_APP_NAME }],
});

db.createCollection('users');
db.createCollection('products');
db.createCollection('carts');
db.createCollection('orders');
