const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    steamID:{
        type: Number,
    }
});

module.exports = mongoose.model('game', gameSchema);