
const express = require('express');
const router = express.Router();
const controller = require('../controllers/subscriptionController');

router.post('/', controller.createSubscription);
router.get('/', controller.getAllSubscriptions);
router.get('/:id', controller.getSubscriptionById);
router.put('/:id', controller.updateSubscription);
router.delete('/:id', controller.deleteSubscription);

module.exports = router;
