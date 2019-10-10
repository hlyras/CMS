const Product = require('../model/product');

const productController = {
	// API CONTROLLERS
	list: async (req, res) => {
		let products = await Product.list();
		res.json(products);
	},
	findByCode: async (req, res) => {
		let product = await Product.findByCode(req.params.code);
		if(product.length){
			product[0].images = await Product.getImages(product[0].id);
		};

		res.send(product);
	},
	findById: async (req, res) => {
		let product = await Product.findByCode(req.params.id);
		if(product.length){
			product[0].images = await Product.getImages(product[0].id);
		};

		res.send(product);
	},

	// PRODUCTS APLICATION CONTROLLERS
	index: async (req, res) => {
		res.render('index');
	},
	config: async (req, res) => {
		res.render('config');
	},
	save: async (req, res) => {
		const product = {
			id: parseInt(req.body.product_id),
			code: parseInt(req.body.product_code),
			name: req.body.product_name,
			color: req.body.product_color,
			size: req.body.product_size,
		};

		if(!product.code || product.code < 1 || product.code > 9999){return res.send({ msg: 'Código de produto inválido.' })};
		if(!product.name || product.name.length > 15){return res.send({ msg: 'Preencha o nome do produto.' })};
		if(!product.color || product.color.length > 10){return res.send({ msg: 'Preencha a cor do produto.' })};
		if(!product.size || product.size.length > 3){return res.send({ msg: 'Preencha o tamanho do produto.' })};

		if(!product.id){
			var row = await Product.findByCode(product.code);
			if(row.length){return res.send({ msg: 'Este código de produto já está cadastrado.' })};
			
			var row = await Product.save(product);
		} else {
			var row = await Product.findByCode(product.code);
			if(row.length){
				if(row[0].id != product.id){
					return res.send({ msg: 'Este código de produto já está cadastrado.' });
				};
			};
			
			var row = await Product.update(product);
		};

		let newProduct = await Product.findById(row.insertId);

		res.send({ done: 'Produto cadastrado com sucesso!', product: newProduct });
	},
	addImage: async (req, res) => {
		const image = {
			product_id: req.body.product_id,
			url: req.body.image_url
		};

		await Product.addImage(image);
	
		res.send({ done: 'Imagem adicionada com sucesso!' });
	},
	removeImage: async (req, res) => {
		await Product.removeImage(req.body.image_id);
	
		res.send({ done: 'Imagem excluída!' });
	},
	get: async (req, res) => {
		let product = await Product.findByCode(req.body.product_code);
		console.log(product[0].id)
		product[0].images = await Product.getImages(product[0].id);

		res.send({ product });
	},
	filter: async (req, res) => {
		if(isNaN(req.body.product_code) || req.body.product_code < 0 || req.body.product_code > 9999){
			req.body.product_code = "";
		};

		if(req.body.product_code){
			let product = await Product.findByCode(req.body.product_code);
			res.send({ location: req.body.product_location, products: product });
		} else {
			const product = {
				color: req.body.product_color
			};
			let products = await Product.filter(product);
			res.send({ location: req.body.product_location, products: products });
		};
	},
	remove: async (req, res) => {
		await Product.remove(req.body.product_code);
		res.send({ done: 'Produto excluído com sucesso!' });
	},
	categorySave: async (req, res) => {
		const category = {
			name: req.body.product_category_name,
			shortcut: req.body.product_category_shortcut
		};

		await Product.categorySave(category);

		res.send({ done: 'Categoria cadastrada com sucesso!' });
	},
	categoryList: async (req, res) => {
		const categories = await Product.categoryList();

		res.send({ categories: categories });
	},
	colorSave: async (req, res) => {
		const color = {
			name: req.body.color_name,
			shortcut: req.body.color_shortcut			
		};

		await Product.colorSave(color);

		res.send({ done: 'Cor cadastrada com sucesso!' });
	},
	colorList: async (req, res) => {
		const colors = await Product.colorList();

		res.send({ colors: colors });
	}
};

module.exports = productController;