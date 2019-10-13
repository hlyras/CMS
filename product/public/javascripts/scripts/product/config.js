$(() => {
	// Utilizar form
	$("#product-category-save-form").on('submit', (event) => {
		event.preventDefault();
		$.ajax({
			url: '/categorySave',
			method: 'post',
			data: $("#product-category-save-form").serialize(),
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				alert(response.done);
			}
		});
	});

	// Utilizar form
	$("#product-color-save-btn").on('click', () => {
		let color_name = document.getElementById('product-color-name').value.replace(/^\s+|\s+$/g, '');
		let color_shortcut = document.getElementById('product-color-shortcut').value.replace(/^\s+|\s+$/g, '');
		if(color_name.length < 3){
			return alert('Nome inválido!');
		};
		if(color_shortcut.length < 2){
			return alert('Abreviação inválida!');
		};
		$.ajax({
			url: '/colorAdd',
			method: 'post',
			data: {
				color_name: color_name,
				color_shortcut: color_shortcut
			},
			success: (response) => {
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				alert(response.done);
			}
		});
	});
});

//
	// Mostra no select do local a lista de categoriase cores no form de busca de produtos
//
function productCategoryList(form, location){
	$.ajax({
		url: '/categoryList',
		method: 'get',
		success: (response) => {
			var html = "";
			html += "<option value=''>Categoria</option>";
			response.categories.forEach((category) => {
				html += "<option value='"+category.shortcut+"'>"+category.name+"</option>";
			});

			// document.getElementById("product-"+location+"-category").innerHTML = html;
		}
	});
};

function productColorList(form, location){
	$.ajax({
		url: '/colorList',
		method: 'get',
		success: (response) => {
			var html = "";
			html += "<option value=''>Color</option>";
			response.colors.forEach((color) => {
				html += "<option value='"+color.shortcut+"'>"+color.name+"</option>";
			});

			if(location == "create"){
				document.getElementById("product-create-color").innerHTML = html;
			} else {
				document.getElementById("product-color").innerHTML = html;
			};
		}
	});
};

// function listProductCategory(){
// 	let productForm = document.getElementById("product-categories-box");
// 	if(productForm.style.display == "none"){
// 		productForm.style.display = "block";
// 	} else if(productForm.style.display == "block"){
// 		productForm.style.display = "none";
// 	};

// 	$.ajax({
// 		url: '/categoryList',
// 		method: 'get',
// 		success: (response) => {
// 			var html = "<tr>";
// 			html += "<td>Id</td>";
// 			html += "<td>Nome</td>";
// 			html += "<td>Abrev.</td>";
// 			html += "</tr>";

// 			response.categories.forEach((category) => {
// 				html += "<tr>";
// 				html += "<td>"+category.id+"</td>";
// 				html += "<td>"+category.name+"</td>";
// 				html += "<td>"+category.shortcut+"</td>";
// 				// html += "<td><a>edit</a></td>";
// 				// html += "<td><a>remove</a></td>";
// 				html += "</tr>";
// 			});
// 			document.getElementById("product-categories-tbl").innerHTML = html;
// 		}
// 	});
// };