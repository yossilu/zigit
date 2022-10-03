const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    
    const foundUser = await User.getUserByEmail(email);
    if (!foundUser.email) return res.sendStatus(401); //Unauthorized 
    
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "role": foundUser.role
                }
            },
            "mySecret",
            { expiresIn: '10s' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            "mySecret",
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await User.setTokenToUser(foundUser);
        const role = foundUser.role
        
        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ role, accessToken });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };