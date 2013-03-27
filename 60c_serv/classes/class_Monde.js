var Super 								= require('./class_Super');
var Famille 							= require('./class_Famille');
module.exports = Super.addMethods({
	initialiserFamilles: function() {
		this.familles 					= [];
	},
	// Méthodes
	creerFamille: function( laFamille ) {
		if ( ! this.familles){
			this.initialiserFamilles();
		}
		this.familles.push(this.laFamille = new Famille(0 , laFamille, laFamille));
	}
});