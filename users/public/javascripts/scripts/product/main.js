function productImagePagination(images, product_id){
	let pageSize = 1;
	let page = 0;

	function paging(){
		let htmlImage = "";
		
	    for (let i = page * pageSize; i < images.length && i < (page + 1) * pageSize;i++){
			htmlImage += "<img src='"+images[i].url+"' style='width:280px;height:320px;'>";
			htmlImage += "<div clas='box-1'>";
			htmlImage += "<br>";
			htmlImage += "<button class='btn-generic-big' onclick='productRemoveImage("+images[i].id+", "+product_id+")'>Excluir</button>";
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