var Famille 							= require('./class_Famille');
module.exports = Class.create({
	// Constructeur
	initialize: function(nom, image) {
		//
		// Paramètres
		//
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
	creerFamille: function( laFamille ) {
		if ( ! this.familles){
			this.initialiserFamilles();
		}
		this.familles.push(this.laFamille = new Famille(0 , laFamille, laFamille));
	},
	initialiserFamilles: function() {
		this.familles 					= [];
	},
});