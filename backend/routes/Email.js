const express = require('express');
const router = express.Router();
const {saveEmailConfigHandler,startParsingHandler} = require('../controller/EmailController');

router.post('/save-config', saveEmailConfigHandler);


router.post('/start-parsing', startParsingHandler);

module.exports = router;
