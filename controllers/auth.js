const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const existEmail = await User.findOne({ email });
        
        if(existEmail) {
            res.status(400).json({
                ok: false,
                msg: 'The email has been registered'
            });
        }

        const user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        const token = await generateJWT(user.id);
        res.json({ 
            ok: true,
            user, 
            token 
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contact administrator'
        })
    }
}

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });
        if(!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        };

        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Password is not correct'
            });
        };

        const token = await generateJWT(userDB.id);
        res.json({
            ok: true,
            user: userDB,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact administrator'
        });
    }
}

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
        ok: true,
        user,
        token,
    })
}

module.exports = {
    createUser,
    login,
    renewToken
}
