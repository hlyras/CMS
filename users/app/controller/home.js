const homeController = {
	index: async (req, res) => {
		res.render('index');
	},
	signup: async (req, res) => {
	    res.render('signup');
	}
};

module.exports = homeController;