var product_array = [];

$(function(){
	$("#product-create-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('product-create-submit').disabled = true;

		$.ajax({
			url: '/save',
			method: 'post',
			data: $("#product-create-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('product-create-submit').disabled = false;
					return;
				};

				alert(response.done);
				
				document.getElementById('product-create-id').value = "";
				document.getElementById('product-create-code').value = "";
				document.getElementById('product-create-color').value = "";
				document.getElementById('product-create-name').value = "";
				document.getElementById('product-create-size').value = "";

				$("#product-filter-form").submit();

				document.getElementById('product-create-submit').disabled = false;
			}
		});
	});

	$("#product-filter-form").on('submit', (event) => {
		event.preventDefault();
		let btn = $(this);btn.attr('disabled', true);

		$.ajax({
			url: '/filter',
			method: 'post',
			data: $("#product-filter-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					return window.location.href = '/login';
				};

				let products = response.products;
				let pageSize = 10;
				let page = 0;

				function paging(){
					if(products.length ){
						if(response.location == 'admin'){
							renderAdminProducts(response.location, products, pageSize, page);
						} else if(response.location == 'catalog'){
							renderCatalogProducts(response.location, products, pageSize, page);
						} else if(response.location == 'factory-storage'){
							renderFactoryStorageProducts(response.location, products, pageSize, page);
						} else if(response.location == 'kart'){
							renderKartProducts(response.location, products, pageSize, page);
						} else if(response.location == 'cashier-kart'){
							renderCashierKartProducts(response.location, products, pageSize, page);
						};
					} else {
						if(response.location == 'admin'){
							clearProductTable(response.location);
						} else if(response.location == 'catalog'){
							clearProductTable(response.location);
						} else if(response.location == 'factory-storage'){
							clearProductTable(response.location);
						} else if(response.location == 'kart'){
							alert("Não há produtos com estas categorias");
						} else if(response.location == 'cashier-kart'){
							alert("Não há produtos com estas categorias");
						};
					};
				};

				btn.attr('disabled', false);

				function buttonsPaging(){
					$('#'+response.location+'ProductNext').prop('disabled', products.length <= pageSize || page >= products.length / pageSize - 1);
					$('#'+response.location+'ProductPrevious').prop('disabled', products.length <= pageSize || page == 0);
				};

				$(function(){
				    $('#'+response.location+'ProductNext').click(function(){
				        if(page < products.length / pageSize - 1){
				            page++;
				            paging();
				            buttonsPaging();
				        };
				    });
				    $('#'+response.location+'ProductPrevious').click(function(){
				        if(page > 0){
				            page--;
				            paging();
				            buttonsPaging();
				        };
				    });
				    paging();
				    buttonsPaging();
				});
			}
		});
	});
});

function displayProductFilterForm(form, location){
	console.log('ok');
	css.displayForm(form);
	// productCategoryList(form, location);
	productColorList(form, location);
};

function editProduct(code){
	$.ajax({
		url: '/get',
		method: 'post',
		data: { 
			product_code: code
		},
		success: (response) => {
			displayProductFilterForm('product-create-form', 'create');

			document.getElementById('product-create-form').style.display = "block";

			setTimeout(() => {
				document.getElementById('product-create-id').value = response.product[0].id;
				document.getElementById('product-create-code').value = response.product[0].code;
				document.getElementById('product-create-name').value = response.product[0].name;
				document.getElementById('product-create-color').value = response.product[0].color;
				document.getElementById('product-create-size').value = response.product[0].size;
			}, 1000);
		}
	});
};

function removeProduct(code){
	let r = confirm('Deseja realmente excluir o produto?');
	if(r){
		$.ajax({
			url: '/remove',
			method: 'delete',
			data: {
				product_code: code
			},
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				alert(response.done);
				$("#product-filter-form").submit();
			}
		});
	};
};

function showProduct(code){
	$.ajax({
		url: '/get',
		method: 'post',
		data: { 
			product_code: code
		},
		success: (response) => {
			if(response.unauthorized){
				alert(response.unauthorized);
				window.location.href = '/login';
				return;
			};

			let html = "";
			html += "<tr>";
			html += "<td id='show-product-id'>"+response.product[0].code+"</td>";
			html += "<td>"+response.product[0].name+"</td>";
			html += "<td>"+response.product[0].size+"</td>";
			html += "<td>"+response.product[0].color+"</td>";
			html += "<td><a onclick='productAddImage("+response.product[0].id+", "+response.product[0].code+")'>add img</a></td>";
			html += "<td><a onclick='hideProduct()'>Esconder</a></td>";
			html += "</tr>";

			document.getElementById('product-show-tbody').innerHTML = html;
			document.getElementById('product-show-box').style.display = 'block';

			if(response.product[0].images.length){
				productImagePagination(response.product[0].images, response.product[0].code);
			} else {
				document.getElementById('product-image-show').innerHTML = "SEM IMAGENS";
				document.getElementById('imagePageNumber').innerHTML = '0';
				document.getElementById('imagePrevious').disabled = true;
				document.getElementById('imageNext').disabled = true;
			};
		}
	});
};