const mongoose = require('mongoose');
const boardSchema = new mongoose.Schema({
    boardNumber: { type: Number, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail : { type: String },
    views: { type: Number, default: 0 }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});
module.exports = mongoose.model('Board', boardSchema); 