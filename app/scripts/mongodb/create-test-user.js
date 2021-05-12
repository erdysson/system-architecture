// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const crypto = require('crypto');

// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const mongoose = require('mongoose');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const uuid = require('uuid');

function generateSalt() {
    return crypto
        .randomBytes(Math.ceil(12 / 2))
        .toString('hex')
        .slice(0, 12);
}

function generatePassword(passwordStr, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(passwordStr);
    const password = hash.digest('hex');
    return `${salt}:${password}`;
}

mongoose
    .connect('mongodb://127.0.0.1:27017/system-architecture', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((m) => {
        console.log('Connection Successful!');
        // get reference to database
        const db = m.connection;
        const users = db.collection('users');
        // gen password
        const password = generatePassword('12345678', generateSalt());
        // test user object
        const user = {
            id: uuid.v4(),
            name: 'Erdi Taner',
            lastName: 'Gokalp',
            userName: 'egokalp',
            password: password,
            role: 2
        };

        users
            .insertOne(user)
            .then((user) => {
                console.log(user.insertedCount, 'user is created with id', user.insertedId);
            })
            .catch((e) => {
                console.log('can not insert test user', e);
            })
            .finally(() => {
                m.disconnect().then(() => console.log('Disconnected successfully'));
            });
    })
    .catch((e) => {
        console.error('connection error:', e);
    });
