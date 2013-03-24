var Super 								= require('./class_Super');
var Monstre 							= require('./class_Monstre');
module.exports = Super.addMethods({
	initialiserMonstres: function( leMonstre ) {
		this.monstres 					= [];
	},
	// Méthodes
	creerMonstre: function( leMonstre ) {
		if ( ! this.monstres){
			this.initialiserMonstres();
		}
		this.monstres.push(this.leMonstre = new Monstre(0 , leMonstre, leMonstre));
	},
	supprimerMonstre : function () {
		// var liste = this.leMonde.listeFamilles;
		// var index = liste.indexOf(this);
		// liste.splice(index,1);
	}
});