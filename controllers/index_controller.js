require('dotenv').config();

module.exports.index = (req, res) => {
    return res.json({message: 'working'});
};

module.exports.add_user = (req, res) => {
	User.findOne({email: req.params.email}, (err, user) => {
		if(err) return res.status(404).json({message: 'error'});
		if(user) {
			return res.json({message: 'user already exists'});
		} else{
			const newUser = new User({
				googleId: req.body.googleId,
				email: req.params.email,
				name: req.body.name
			});

			newUser.save()
				.then(()=>res.json({message: 'user saved'}))
				.catch(err => res.json({message: 'error saving user'}));
		}
	});
}

module.exports.add_ideas = (req, res) => {
	User.findOne({email: req.params.email}, (err, user) => {
		if (err) return res.status(404).json({message: 'error'});
		if(user) {
			const newIdea = new Idea({
				user: user._id,
				title: req.body.title,
				desc: req.body.desc,
				technology: req.body.technology
			});

			newIdea
				.save()
				.then(idea => res.json(idea))
				.catch(err => res.status(404).json({message: 'Idea can not be added' }));
		} else{
			res.status(404).json({message: 'no user found'});
		}
	});
}

module.exports.show_all_ideas = (req, res) => {
	User.findOne({ email: req.params.email }, (err, user) => {
		if(err) return res.status(404).json({message: 'error'});
		if(user) {
			Idea.find({ delete: false })
				.sort({ date: -1 })
				.populate('user', ['name', 'email'])
				.then(ideas => {
					if(!ideas) {
						res.status(404).json({message: 'no ideas found'})
					}
					res.json(ideas);
				})
				.catch(err => res.status(400).json(err));
		}
		else{
			res.status(404).json({message: 'no user found'});
		}
	});
		
}


module.exports.delete_ideas = (req, res) => {
	User.findOne({ email: req.params.email }, (err, user) => {
		if(err) return res.status(404).json({message: 'error'});
		if(user) {
			Idea.findOne({ _id: req.params.id })
				.then(idea => {
					if(idea) {
						Idea.updateOne({ _id: req.params.id}, {delete: true})
							.then(idea => {
								//idea.delete = true;
								res.json(idea);
							})
							.catch(err => res.status(404).json(err));
					}
					else{
						res.status(404).json({message: 'no idea found'});
					}
				})
		}
		else{
			res.status(404).json({message: 'no user found'});
		}
	});

}

module.exports.edit_ideas = (req, res) => {	

	User.findOne({ email: req.params.email }, (err, user) => {
		if(err) return res.status(404).json({message: 'error'});
		if(user) {
			const ideaFields = {};
			ideaFields.user = user._id;
			if(req.body.title) ideaFields.title = req.body.title;
			if(req.body.desc) ideaFields.desc = req.body.desc;

			Idea.findOne({ _id: req.params.id })
				.then(idea => {
					if(idea) {
						Idea.findOneAndUpdate({ _id: req.params.id}, {$set: ideaFields}, { new: true })
							.then(idea => res.json(idea))
							.catch(err => res.status(404).json(err));
					}
					else{
						res.status(404).json({message: 'no idea found'});
					}
				})
		}
		else{
			res.status(404).json({message: 'no user found'});
		}
	});
}