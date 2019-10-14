const css = {
	displayForm: (form) => {
		let productForm = document.getElementById(form);
		if(productForm.style.display == "none"){
			productForm.style.display = "block";	
		} else if(productForm.style.display == "block"){
			productForm.style.display = "none";	
		};
	}
}