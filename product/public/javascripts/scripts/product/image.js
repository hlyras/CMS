function productAddImage(id, code){
	let image = prompt("Preencha com a URL da imagem");
	if(image){
		if(image.length < 7){
			return alert('URL inválida!');
		};
		if(image.length > 200){
			return alert('URL inválida!');
		};
		checkImage(image);
		let img = '<img src="'+ image +'" />';
		$(img).on("load", () =>  {
			$.ajax({
				url: '/addImage',
				method: 'post',
				data: {
					product_id: id,
					image_url: image
				},
				success: (response) => {
					if(response.unauthorized){
						alert(response.unauthorized);
						window.location.href = '/login';
						return;
					};

					showProduct(code);
					alert(response.done);
				}
			});
		}).bind('error', () =>  {
			return alert('URL inválida!');
		});
	} else {
		return;
	};
};

function productRemoveImage(id, code){
	let r = confirm("Deseja realmente excluir a image?");
	if(r){
		$.ajax({
			url: '/removeImage',
			method: 'delete',
			data: {
				image_id: id
			},
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				showProduct(code);
				alert(response.done);
			}
		});
	};
};

function productImagePagination(images, product_code){
	let pageSize = 1;
	let page = 0;

	function paging(){
		let htmlImage = "";
		
	    for (let i = page * pageSize; i < images.length && i < (page + 1) * pageSize;i++){
			htmlImage += "<img src='"+images[i].url+"' style='width:280px;height:320px;'>";
			htmlImage += "<div clas='box-1'>";
			// htmlImage += "<br>";
			// htmlImage += "<button class='btn-generic-big' onclick='productRemoveImage("+images[i].id+", "+product_code+")'>Excluir</button>";
			htmlImage += "</div>";
		};

		document.getElementById('product-image-show').innerHTML = htmlImage;
		document.getElementById('product-image-show').style.display = 'block';
		
	    $('#imagePageNumber').text('' + (page + 1) + ' de ' + Math.ceil(images.length / pageSize));
	};

	function saleButtonsPaging(){
	    $('#imageNext').prop('disabled', images.length <= pageSize || page >= images.length / pageSize - 1);
	    $('#imagePrevious').prop('disabled', images.length <= pageSize || page == 0);
	};

	$(() => {
	    $('#imageNext').click(() => {
	        if(page < images.length / pageSize - 1){
	            page++;
	            paging();
	            saleButtonsPaging();
	        };
	    });
	    $('#imagePrevious').click(() => {
	        if(page > 0){
	            page--;
	            paging();
	            saleButtonsPaging();
	        };
	    });
	    paging();
	    saleButtonsPaging();
	});
};