const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');

router.get('/', teamController.getTeams);
router.post('/add', teamController.addTeam);
router.get('/:id', teamController.getTeam);
router.put('/update/:id', teamController.updateTeam);
router.delete('/delete/:id', teamController.deleteTeam);

module.exports = router;