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

		let name = document.getElementById("product-filter-form").elements.namedItem('name').value;
		let code = document.getElementById("product-filter-form").elements.namedItem('code').value;
		let color = document.getElementById("product-filter-form").elements.namedItem('color').value;

		$.ajax({
			url: "/filter?name="+name+"&code="+code+"&color="+color,
			method: 'get',
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					return window.location.href = '/login';
				};

				let products = response.products;
				let pageSize = 10;
				let page = 0;

				function paging(){
					if(products.length){
						renderProducts(products, pageSize, page);
					} else {
						clearProductTable(response.location);
					};
				};

				btn.attr('disabled', false);

				function buttonsPaging(){
					$('#productNext').prop('disabled', products.length <= pageSize || page >= products.length / pageSize - 1);
					$('#productPrevious').prop('disabled', products.length <= pageSize || page == 0);
				};

				$(function(){
				    $('#productNext').click(function(){
				        if(page < products.length / pageSize - 1){
				            page++;
				            paging();
				            buttonsPaging();
				        };
				    });
				    $('#productPrevious').click(function(){
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
	css.displayForm(form);
	// productCategoryList(form, location);
	productColorList(form, location);
};

function editProduct(code){
	$.ajax({
		url: '/code/'+code,
		method: 'get',
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

function removeProduct(id){
	let r = confirm('Deseja realmente excluir o produto?');
	if(r){
		$.ajax({
			url: '/remove?id='+id,
			method: 'delete',
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				hideProduct();
				alert(response.done);
				$("#product-filter-form").submit();
			}
		});
	};
};

function showProduct(id){
	$.ajax({
		url: '/id/'+id,
		method: 'get',
		success: (response) => {
			if(response.unauthorized){
				alert(response.unauthorized);
				window.location.href = '/login';
				return;
			};

			let html = "";
			html += "<tr>";
			html += "<td>"+response.product[0].code+"</td>";
			html += "<td>"+response.product[0].name+"</td>";
			html += "<td>"+response.product[0].size+"</td>";
			html += "<td>"+response.product[0].color+"</td>";
			html += "<td><a onclick='productAddImage("+response.product[0].id+")'>add img</a></td>";
			html += "<td><a onclick='hideProduct()'>Esconder</a></td>";
			html += "</tr>";

			document.getElementById('product-show-tbody').innerHTML = html;
			document.getElementById('product-show-box').style.display = 'block';

			if(response.product[0].images.length){
				productImagePagination(response.product[0].images, response.product[0].id);
			} else {
				document.getElementById('product-image-show').innerHTML = "SEM IMAGENS";
				document.getElementById('imagePageNumber').innerHTML = '0';
				document.getElementById('imagePrevious').disabled = true;
				document.getElementById('imageNext').disabled = true;
			};
		}
	});
};