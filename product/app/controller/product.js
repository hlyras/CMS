const Product = require('../model/product');

// PATTERNS

// 1 - If the function can only return 1 product then
// will response '{ product }' else 
// will response '{ products }'

const productController = {
	index: async (req, res) => {
		res.render('index');
	},

	// API CONTROLLERS
	list: async (req, res) => {
		// console.log(req.headers.authorization);
		let products = await Product.list();
		products.images = "";
		for(i in products){
			let images = await Product.getImages(products[i].id);
			for(y in images){
				products[i].image = images[y].url;
			};
		};
		
		res.send( products );
	},
	findById: async (req, res) => {
		let product = await Product.findById(req.params.id);

		if(product.length){
			product[0].images = await Product.getImages(product[0].id);
		};

		res.send({ product });
	},
	findByCode: async (req, res) => {
		let product = await Product.findByCode(req.params.code);

		if(product.length){
			product[0].images = await Product.getImages(product[0].id);
		};

		res.send({ product });
	},
	findByName: async (req, res) => {
		let products = await Product.findByName(req.query.name);
		if(products.length){
			products[0].images = await Product.getImages(products[0].id);
		};

		res.send({ products });
	},
	filter: async (req, res) => {
		if(isNaN(req.query.code) || req.query.code < 0 || req.query.code > 9999){
			req.query.code = "";
		};

		if(req.query.name){
			let products = await Product.findByName(req.query.name);
			res.send({ products: products });
		} else {
			if(req.query.code){
				let products = await Product.findByCode(req.query.code);
				res.send({ products });
			} else {
				const product = {
					color: req.query.color
				};
				
				let products = await Product.filter(product);
				res.send({ products: products });
			};
		};
	},
	remove: async (req, res) => {
		await Product.remove(req.query.id);
		await Product.removeProductImages(req.query.id);
		
		res.send({ done: 'Produto excluído com sucesso!' });
	},
	addImage: async (req, res) => {
		const image = {
			product_id: req.query.product_id,
			url: req.query.image_url
		};

		await Product.addImage(image);
	
		res.send({ done: 'Imagem adicionada com sucesso!' });
	},
	removeImage: async (req, res) => {
		await Product.removeImage(req.query.id);

		res.send({ done: 'Imagem excluída!' });
	},
	options: (req, res, next) => {
		res.status(204).send(""); // no content
	},

	/////////////////////////////////////////////
	
	// PRODUCTS APLICATION CONTROLLERS
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