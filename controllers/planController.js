
const { Plan } = require('../models');

exports.createPlan = async (req, res) => {
  try {
    const plan = await Plan.create({
      name: req.body.name,
      price: req.body.price,
      billingCycle: req.body.billingCycle
    });
    res.status(201).json({ message: 'Plan created successfully', data: plan });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create plan',
      error: error.message,
      details: error.errors?.map(e => e.message) || []
    });
  }
};

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve plans', error: error.message });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve plan', error: error.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    await plan.update({
      name: req.body.name ?? plan.name,
      price: req.body.price ?? plan.price,
      billingCycle: req.body.billingCycle ?? plan.billingCycle
    });

    res.status(200).json({ message: 'Plan updated successfully', data: plan });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update plan',
      error: error.message,
      details: error.errors?.map(e => e.message) || []
    });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    await plan.destroy();
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(409).json({
      message: 'Could not delete plan. It may be used by existing subscriptions.',
      error: error.message
    });
  }
};
