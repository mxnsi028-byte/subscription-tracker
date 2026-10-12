
const { User } = require('../models');

// CREATE: Add a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email
    });

    res.status(201).json({
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create user',
      error: error.message,
      details: error.errors?.map(e => e.message) || []
    });
  }
};

// READ: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve users',
      error: error.message
    });
  }
};

// READ: Get one user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve user',
      error: error.message
    });
  }
};

// UPDATE: Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    await user.update({
      name: req.body.name ?? user.name,
      email: req.body.email ?? user.email
    });

    res.status(200).json({
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update user',
      error: error.message,
      details: error.errors?.map(e => e.message) || []
    });
  }
};

// DELETE: Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    await user.destroy();

    res.status(200).json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete user',
      error: error.message
    });
  }
};
