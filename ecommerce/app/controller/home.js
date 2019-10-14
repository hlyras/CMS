const request = require("request-promise");

const homeController = {
	index: async (req, res) => {
		var headers = {
		    "Authorization": "12345"
		};

		const options = {
		    url: "http://localhost:3000/",
		    method: "GET",
		    headers: headers
		};

		let products = JSON.parse(await request(options));
	    // res.json( products );

		res.render('index', { products: products });
	},
	products: async (req, res) => {
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
	}
};

module.exports = homeController;