const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.doesExists(email);
    if (duplicate) return res.status(409).json({ 'message': 'User already exists!' });
    
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            "email": email,
            "password": hashedPwd
        });

        res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };