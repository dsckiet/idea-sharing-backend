const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
    user: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'user'
    },
    title: {
    	type: String, required: true
    },
    desc: {
    	type: String, required: true
    },
    delete: {
    	type: Boolean,
    	required: true,
    	default: false
    },
    date: {
    	type: Date,
    	default: Date.now
    },
    technology: {
    	type: []
    }
});

module.exports = Idea = mongoose.model('idea', IdeaSchema);