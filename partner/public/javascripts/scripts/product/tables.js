function hideProduct(){
	document.getElementById('product-show-box').style.display = "none";
};

function clearProductTable(location){
	document.getElementById("product-tbl").innerHTML = "SEM PRODUTOS COM ESSAS CORES OU CATEGORIAS";
	$('#productPrevious').prop('disabled');
	$('#productNext').prop('disabled');
	$('#productPageNumber').text('0');
};

//
	// Mostrar a tabela de produtos na área de administração
//
function renderProducts(products, pageSize, page){
	var html = "<tr>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Tamanho</td>";
	html += "<td>Cor</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < products.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		html += "<td><a onclick='showProduct("+products[i].id+")'>"+products[i].code+"</a></td>";
		html += "<td>"+products[i].name+"</td>";
		html += "<td>"+products[i].size+"</td>";
		html += "<td>"+products[i].color+"</td>";
		html += "</tr>";
	};
	document.getElementById('product-tbl').innerHTML = html;
	document.getElementById('product-div').style.display = 'block';
	$('#productPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(products.length / pageSize));
};

function renderCatalogProducts(location, products, pageSize, page){
	var html = "<tr>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Tamanho</td>";
	html += "<td>Cor</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < products.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		html += "<td><a onclick='showProduct("+products[i].id+")'>"+products[i].code+"</a></td>";
		html += "<td id='src_product_name'>"+products[i].name+"</td>";
		html += "<td id='src_product_size'>"+products[i].size+"</td>";
		html += "<td id='src_product_color'>"+products[i].color+"</td>";
		html += "</tr>";
	};
	document.getElementById('product-tbl').innerHTML = html;
	document.getElementById('product-div').style.display = 'block';
	$('#ProductPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(products.length / pageSize));
};

function renderKartProducts(location, products, pageSize, page){
	var html = '';
	products.forEach((product) => {
		html += '<option value="'+product.code+'">#'+ product.code +' | '+ product.name +' | '+ product.size +' | '+ product.color +'</option>';
	});
	document.getElementById('kart-product-code').innerHTML = html;
};

function renderCashierKartProducts(location, products, pageSize, page){
	var html = '';
	products.forEach((product) => {
		html += '<option value="'+product.code+'">#'+ product.code +' | '+ product.name +' | '+ product.size +' | '+ product.color +'</option>';
	});
	document.getElementById('kart-product-code').innerHTML = html;
};