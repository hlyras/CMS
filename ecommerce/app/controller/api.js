const request = require("request-promise");

const apiController = {
	get: async (req, res) => {
		var headers = {
		    "Authorization": "12345"
		};

		const options = {
		    url: "http://localhost:3000/",
		    method: "GET",
		    headers: headers
		};

		let products = JSON.parse(await request(options));
	    res.json( products );
	},
	options: (req, res) => {
		res.json({
			message: "Sucessful OPTIONS"
		});
	}
};

module.exports = apiController;