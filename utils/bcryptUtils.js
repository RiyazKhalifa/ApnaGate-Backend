const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

const comparePassword = async (password, hashed) => {
    return bcrypt.compare(password, hashed);
}

module.exports = { hashPassword, comparePassword };