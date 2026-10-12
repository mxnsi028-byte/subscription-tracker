
const { Invoice, Subscription } = require('../models');

exports.createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create({
      subscriptionId: req.body.subscriptionId,
      amount: req.body.amount,
      status: req.body.status || 'Pending',
      dueDate: req.body.dueDate
    });

    res.status(201).json({
      message: 'Invoice created successfully',
      data: invoice
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create invoice',
      error: error.message,
      details: error.errors?.map(e => e.message) || []
    });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [{ model: Subscription, as: 'subscription' }]
    });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve invoices',
      error: error.message
    });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [{ model: Subscription, as: 'subscription' }]
    });

    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve invoice',
      error: error.message
    });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    await invoice.update({
      subscriptionId: req.body.subscriptionId ?? invoice.subscriptionId,
      amount: req.body.amount ?? invoice.amount,
      status: req.body.status ?? invoice.status,
      dueDate: req.body.dueDate ?? invoice.dueDate
    });

    res.status(200).json({ message: 'Invoice updated successfully', data: invoice });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update invoice',
      error: error.message,
      details: error.errors?.map(e => e.message) || []
    });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    await invoice.destroy();
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete invoice',
      error: error.message
    });
  }
};
