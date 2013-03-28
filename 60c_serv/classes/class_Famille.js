var Monstre 							= require('./class_Monstre');
module.exports = Class.create({
	// Constructeur
	initialize: function(nom, image, nbMonstresMax) {
		//
		// Paramètres
		//
		this.monstres 					= [],
		this.nom 						= nom; // string
		this.image						= image; // bool
		this.nbMonstresMax				= nbMonstresMax; // int
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
	setnbMonstresMax: function(valeur) {
		this.image 						= valeur;
		return 							true;
	},

	// Getters
	getNom : function() 				{return this.nom;},
	getImage : function() 				{return this.image;},
	getNbMonstresMax : function() 		{return this.nbMonstresMax;},
	getNbMonstresActuel : function() 	{return this.monstres.length;},
	
	// Spécifique
	creerMonstre: function( leMonstre ) {
		if ( ! this.monstres){
			this.initialiserMonstres();
		}
		if (this.monstres.length < this.nbMonstresMax){
			this.monstres.push(this.leMonstre = new Monstre(leMonstre, leMonstre));
		}
	},
	initialiserMonstres: function() {
		// this.monstres 					= [];
	},
});