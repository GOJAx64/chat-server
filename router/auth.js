/*
    path: api/login
*/
const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/new', [
    check('name', 'name is mandatory').not().isEmpty(),
    check('password', 'password is mandatory').not().isEmpty(),
    check('email', 'Email is mandatory').isEmail(),
    validateFields
], createUser);

router.post('/', [
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    validateFields
], login);

router.get('/renew', validateJWT, renewToken);

module.exports = router;