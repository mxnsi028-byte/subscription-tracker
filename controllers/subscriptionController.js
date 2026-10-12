
const { Subscription, User, Plan, Invoice } = require('../models');

exports.createSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.create({
      userId: req.body.userId,
      planId: req.body.planId,
      status: req.body.status || 'Active',
      startDate: req.body.startDate,
      endDate: req.body.endDate || null
    });

    res.status(201).json({
      message: 'Subscription created successfully',
      data: subscription
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create subscription',
      error: error.message,
      details: error.errors?.map(e => e.message) || []
    });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Plan, as: 'plan' },
        { model: Invoice, as: 'invoices' }
      ]
    });

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve subscriptions',
      error: error.message
    });
  }
};

exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user' },
        { model: Plan, as: 'plan' },
        { model: Invoice, as: 'invoices' }
      ]
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve subscription',
      error: error.message
    });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByPk(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    await subscription.update({
      userId: req.body.userId ?? subscription.userId,
      planId: req.body.planId ?? subscription.planId,
      status: req.body.status ?? subscription.status,
      startDate: req.body.startDate ?? subscription.startDate,
      endDate: req.body.endDate === undefined
        ? subscription.endDate
        : (req.body.endDate || null)
    });

    res.status(200).json({
      message: 'Subscription updated successfully',
      data: subscription
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update subscription',
      error: error.message,
      details: error.errors?.map(e => e.message) || []
    });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByPk(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    await subscription.destroy();
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete subscription',
      error: error.message
    });
  }
};
