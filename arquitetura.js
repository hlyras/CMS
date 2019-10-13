// https://gist.github.com/leocomelli/2545add34e4fec21ec16
ARQUITETURA

	// Database
	'user'
		users
			id
			name
			job
			email
			birth
			username
			password
			acess

---------------------------
	
	// Database
	'product'
		// Tables
		products
			id
			code
			name
			color
			size

		product_category
			id
			product_id
			category_id

		category
			id
			name
			shortcut

		color
			id
			name
			shortcut

---------------------------

	// Database
	'store'
		// Tables
		stores
			id
			city
			state

		store_customer
			id
			name
			cpf
			phone

		store_order
			id
			store
			date // 05/09/2019-12:24:22 || 05/09/2019-12:24:3
			customer_cpf
			customer_name
			payment_method // din | dbt | cdt | chq 30 | chq 30/60 | chq 30/60/90 | chq 30/60/90/120
			payment_installment
			payment_discount
			total_value
			final_value
			status
			user


		store_order_product
			id
			store_id
			order_id
			product_id
			value

		store_value
			id
			name

		store_product
			id
			store_id
			product_id
			amount

		store_product_value
			id
			store_id
			product_id
			value

---------------------------
	
	// Database
	'factory'
		// Tables
		factories
			id
			city
			state

		factory_product
			id
			factory_id
			product_id
			amount

---------------------------

	// Database
	'ecommerce'
		// Tables
		ecommerce_customer
			id
			name
			cpf
			phone

		ecommerce_order
			id
			account
			code
			date // 05/09/2019-12:24:22 || 05/09/2019-12:24:3
			customer_cpf
			customer_name
			payment_method // din | dbt | cdt | chq 30 | chq 30/60 | chq 30/60/90 | chq 30/60/90/120
			payment_installment
			payment_discount
			total_value
			final_value
			status
			user


		ecommerce_order_product
			id
			ecommerce_id
			order_id
			product_id
			value

		ecommerce_value
			id
			name

		ecommerce_product
			id
			ecommerce_id
			product_id
			amount

		ecommerce_product_value
			id
			ecommerce_id
			product_id
			value
