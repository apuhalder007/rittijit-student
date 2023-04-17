const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

exports.login  = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
        res.json({ token });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

exports.updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(req.userId, { name, email, password: hashedPassword });
        res.json(user);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}   

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.userId);
        res.json(user);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

exports.logout = async (req, res) => {
    try {
        jwt.destroy(req.userId);
        res.json({ message: 'User logged out successfully' });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}


