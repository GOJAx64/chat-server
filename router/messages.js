/*
 path: api/messages
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getChat } = require('../controllers/messages');

const router = Router();

router.get('/:from', validateJWT, getChat);
router.get('/to', validateJWT, renewToken);

module.exports = router;