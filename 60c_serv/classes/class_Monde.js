var Famille 							= require('./class_Famille');
module.exports = Class.create({
	// Constructeur
	initialize: function(nom, image) {
		//
		// Paramètres
		//
		this.familles 					= [],
		this.nom 						= nom; // string
		this.image						= image; // bool
	},
	//
	// Méthodes
	//
	// Setters
	setNom: function(valeur) {
		this.nom 						= valeur;
		return 							true;
	},
	setImage: function(valeur) {
		this.image 						= valeur;
		return 							true;
	},

	// Getters
	getNom : function() 				{return this.nom;},
	getImage : function() 				{return this.image;},
	
	// Spécifique
	creerFamille: function( laFamille, nbMonstresMax ) {
		if ( ! this.familles){
			this.initialiserFamilles();
		}
		this.familles.push(new Famille( laFamille, laFamille, nbMonstresMax ));
	},
	initialiserFamilles: function() {
		// this.familles 					= [];
	},
});