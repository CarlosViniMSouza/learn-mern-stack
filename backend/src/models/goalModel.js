const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Add a value text!']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);