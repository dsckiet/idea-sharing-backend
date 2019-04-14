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
			Idea.find()
				.sort({ date: -1 })
				.populate('user', ['name', 'email'])
				.then(ideas => {
					if(!ideas) {
						res.status(404).json({message: 'no ideas found'})
					}
					/*const numOfIdeas = ideas.length();
					while(numOfIdeas--){
						if(ideas.delete == false) {
							res.json(ideas);
						}
					}*/
					res.json(ideas);
				})
				.catch(err => res.status(404).json({ message: 'error' }));
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
			Idea.find()
				.then(idea => {
					//const removeIndex = idea.indexOf(req.params.idea_id);

				idea.delete = true;

				idea.save().then(idea => res.json({ message: 'idea deleted successfully'}));

		    })
			.catch(err => res.status(404).json({message: 'error deleting idea'}));
		}
	});

}

module.exports.edit_ideas = (req, res) => {	

	User.findOne({ email: req.params.email }, (err, user) => {
		if(err) return res.status(404).json({message: 'error'});
		if(user) {
			const ideaFields = {};
			ideaFields.user = req.user.id;
			if(req.body.title) 
		}
	}

	/*User.findOne({email: req.params.email}, (err, user) => {
		if(err) return res.status(404).json({message: 'error'});
		if(user) {
			const ideaFields = {};
			ideaFields.user = user._id;
			if(req.body.title) ideaFields.title = req.body.title;
			if(req.body.desc) ideaFields.desc = req.body.desc;

			Idea.findOne({ idea: user._id })
				.then(idea => {
					if(idea.delete == false) {
						Ideas.findOneAndUpdate({ idea: req.params.id }, { $set: ideaFields }, { new: true })
							.save()
							.then(idea => res.json(idea));
					}
			});
			
		} else{
			return res.status(404).json({message: 'no user found'});
		}
	});

*/
	
}