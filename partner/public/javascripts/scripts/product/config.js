function productColorList(form, location){
	$.ajax({
		url: 'http://localhost:3000/colorList',
		method: 'get',
		success: (response) => {
			var html = "";
			html += "<option value=''>Color</option>";
			response.colors.forEach((color) => {
				html += "<option value='"+color.shortcut+"'>"+color.name+"</option>";
			});
			
			document.getElementById("product-color").innerHTML = html;
		}
	});
};