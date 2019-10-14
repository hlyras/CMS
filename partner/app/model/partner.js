const Partner = function(){
	this.id;
	this.name;
	this.cnpj;
	this.email;
	this.phone;
	this.birth;
	this.password;
	this.status;
}

Partner.save = async (partner) => {
	let query = "INSERT INTO partner.partners (name, cnpj, email, phone, birth, password, status) values ('"+
	partner.name+"','"+
	partner.cnpj+"','"+
	partner.email+"','"+
	partner.phone+"','"+
	partner.birth+"','"+
	partner.password+"','"+
	partner.status+"')"
	return db(query);
};