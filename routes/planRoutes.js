
const express = require('express');
const router = express.Router();
const controller = require('../controllers/planController');

router.post('/', controller.createPlan);
router.get('/', controller.getAllPlans);
router.get('/:id', controller.getPlanById);
router.put('/:id', controller.updatePlan);
router.delete('/:id', controller.deletePlan);

module.exports = router;