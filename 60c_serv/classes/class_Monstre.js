var Super 								= require('./class_Super');
module.exports = Super.addMethods({
	exister: function() {
		console.log("j'existe");
	},
});