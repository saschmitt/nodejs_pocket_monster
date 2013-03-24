module.exports = Class.create({
	// Constructeur
	initialize: function(id, nom, image) {
		//
		// Paramètres
		//
		this.id 						= id; // string
		this.nom 						= nom; // string
		this.image						= image; // bool
	},
	
	
	//
	// Méthodes
	//
	// Setters
	setId: function(valeur) {
		this.id 						= valeur;
		return 							true;
	},
	setNom: function(valeur) {
		this.nom 						= valeur;
		return 							true;
	},
	setImage: function(valeur) {
		this.image 						= valeur;
		return 							true;
	},

	// Getters
	getId: function() 					{return this.id;},
	getNom : function() 				{return this.nom;},
	getImage : function() 				{return this.image;},
});