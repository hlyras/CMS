const apiController = {
	get: (req, res) => {
		res.json({
			message: 'Sucessful GET'
		});
	},
	post: (req, res) => {
		res.json({
			message: 'Sucessful POST'
		});
	},
	put: (req, res) => {
		res.json({
			message: 'Sucessful PUT'
		});
	},
	patch: (req, res) => {
		res.json({
			message: 'Sucessful PATCH'
		});
	},
	remove: (req, res) => {
		res.json({
			message: 'Sucessful DELETE'
		});
	},
	options: (req, res) => {
		res.json({
			message: 'Sucessful OPTIONS'
		});
	}
};

module.exports = apiController;