const express = require('express');
const router = express.Router();
const awardController = require('../controllers/award');

router.get('/', awardController.getAwards);
router.post('/add', awardController.addAward);
// router.get('/:id', awardController.getaward);
// router.put('/update/:id', awardController.updateaward);
// router.delete('/delete/:id', awardController.deleteaward);

module.exports = router;