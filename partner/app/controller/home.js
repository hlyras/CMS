const request = require("request-promise");
// var headers = {
//     "Authorization": "12345"
// };

// const options = {
//     url: "http://localhost:3000/",
//     method: "GET",
//     headers: headers
// };

// let products = JSON.parse(await request(options));

const homeController = {
	index: async (req, res) => {
		res.render('index');
	},
	signup: async (req, res) => {
	    res.render('signup');
	}
};

module.exports = homeController;