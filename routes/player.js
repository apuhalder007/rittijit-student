const express = require('express');
const router = express.Router();
const playerController = require('../controllers/player');

router.get('/', playerController.getPlayers);
router.post('/add', playerController.addPlayer);
router.get('/:id', playerController.getPlayer);
router.put('/update/:id', playerController.updatePlayer);
router.delete('/delete/:id', playerController.deletePlayer);

module.exports = router;