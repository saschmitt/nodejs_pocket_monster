﻿retourConsole();

// Modules
var http								= require("http");
var url									= require("url");

// Classes
var Monde 								= require('./classes/class_Monde');
mondes = [];

essais();
liste(mondes[0]);
liste(mondes[1]);


  /***********/
 /* Serveur */
/***********/
function index(route, handle){
	function onRequest(request, response){
		var pathname					= url.parse(request.url).pathname;
		var requeteRecue = "\nRequête reçue pour le chemin ";
		console.log( (requeteRecue + pathname).cyan );
		route(handle, pathname, response, request);
	}
	var port = process.env.PORT || 80;
	httpServer = http.createServer(onRequest).listen(port);
	console.log( ("Démarrage du serveur. Ecoute sur le port " + port + ".").green );

	/***********
	**
	** Socket.IO
	**
	***********/
	var io = require('socket.io').listen(httpServer);
	io.sockets.on('connection', function(socket){
		var contenu = {};
		
		
		
	
		/*******************
		**
		** AFFICHAGE CONTENU
		**
		*******************/
		  /********************/
		 /* Affichage mondes */
		/********************/
		socket.on('demandeMonde', function(){
			if(mondes.length > 0){
				for (var i = 0; i < mondes.length; i++ ){
					contenu.id = i;
					contenu.nom = mondes[i].getNom();
					socket.emit('recupereMonde', contenu);
				}
			}
		});
		
		  /**********************/
		 /* Affichage familles */
		/**********************/
		socket.on('demandeFamille', function(idMonde){
			if(mondes[idMonde].familles){
				for (var i = 0; i < mondes[idMonde].familles.length; i++ ){
					contenu.id 					= i;
					contenu.nom 				= mondes[idMonde].familles[i].getNom();
					contenu.nbMonstresActuels 	= mondes[idMonde].familles[i].getNbMonstresActuel();
					contenu.nbMonstresMax 		= mondes[idMonde].familles[i].getNbMonstresMax();
					socket.emit('recupereFamille', contenu);
				}
			}
		});
		
		  /**********************/
		 /* Affichage monstres */
		/**********************/
		socket.on('demandeMonstre', function(idMonde, idFamille){
			if(mondes[idMonde].familles[idFamille].monstres){
				for (var i = 0; i < mondes[idMonde].familles[idFamille].monstres.length; i++ ){
					contenu.id = i;
					contenu.nom = mondes[idMonde].familles[idFamille].monstres[i].getNom();
					socket.emit('recupereMonstre', contenu);
				}
			}
		});
		/*********************
		**
		** SUPPRESSION CONTENU
		**
		*********************/
		  /**********************/
		 /* Suppression mondes */
		/**********************/
		socket.on('aSupprimerMonde', function(aSupprimer){
			var okDelete = false;
			
			if(mondes[aSupprimer.idMonde]){
				mondes.splice(aSupprimer.idMonde,1);
				okDelete = true;
			}
			if(okDelete = true){
				io.sockets.emit('afficherMonde');
			}
		});
		
		  /************************/
		 /* Suppression familles */
		/************************/
		socket.on('aSupprimerFamille', function(aSupprimer){
			var okDelete = false;
			
			if(mondes[aSupprimer.idMonde].familles[aSupprimer.idFamille]){
				mondes[aSupprimer.idMonde].familles.splice(aSupprimer.idFamille,1);
				okDelete = true;
			}
			if(okDelete = true){
				io.sockets.emit('afficherFamille');
			}
		});
		  /************************/
		 /* Suppression monstres */
		/************************/
		socket.on('aSupprimerMonstre', function(aSupprimer){
			var okDelete = false;
			
			if(mondes[aSupprimer.idMonde].familles[aSupprimer.idFamille].monstres[aSupprimer.idMonstre]){
				mondes[aSupprimer.idMonde].familles[aSupprimer.idFamille].monstres.splice(aSupprimer.idMonstre,1);
				okDelete = true;
			}
			if(okDelete = true){
				io.sockets.emit('afficherMonstre');
			}
		});
		/*******************
		**
		** CREATION ELEMENTS
		**
		*******************/
		  /**********************/
		 /* Création de mondes */
		/**********************/
		socket.on('aCreerMonde', function(aCreer){
			mondes.push( new Monde( aCreer.nom, aCreer.nom + '.png' ) );
			io.sockets.emit('afficherMonde');
		});
		socket.on('aCreerFamille', function(aCreer){
			mondes[aCreer.idMonde].creerFamille(aCreer.nom, aCreer.nbMonstresMax);
			io.sockets.emit('afficherFamille');
		});
		socket.on('aCreerMonstre', function(aCreer){
			mondes[aCreer.idMonde].familles[aCreer.idFamille].creerMonstre(aCreer.nom);
			io.sockets.emit('afficherFamille');
		});
	});
}


/**********************/

exports.index							= index;





function liste(monde){
	for (var i = 0; i < monde.familles.length; i++ ){
		console.log(('Famille ' + monde.familles[i].getNom()).cyan);
		for (var j = 0; j < monde.familles[i].monstres.length; j++ ){
			var result = monde.familles[i].getNom() + ' ' 
			+ monde.familles[i].monstres[j].getNom();
			console.log(result.grey);
		}
		console.log('\n');
	}
}



function retourConsole(){
	console.log('\n\n\n');
	console.log('----------------------'.green);
	console.log('   ║'.green);
	console.log('   ║'.green + ' Pocket Monster');
	console.log('   ║'.green);
	console.log('----------------------'.green);
	console.log('\n\n\n');
}

function essais(){
	mondes.push( new Monde( 'StarWars', 'StarWars.png' ) );
	mondes.push( new Monde( 'StarGate', 'StarGate.png' ) );

	mondes[0].creerFamille('Skywalker', 10);
	mondes[0].familles[0].creerMonstre('Anakin');
	mondes[0].familles[0].creerMonstre('Leia');
	mondes[0].familles[0].creerMonstre('Luke');
	
	mondes[0].creerFamille('Solo', 10);
	mondes[0].familles[1].creerMonstre('Yan');

	mondes[0].creerFamille('Pellaeon', 10);
	mondes[0].familles[2].creerMonstre('Gilad');

	mondes[1].creerFamille('O\'Neill', 10);
	mondes[1].familles[0].creerMonstre('Jack');
	mondes[1].creerFamille('Carter', 10);
	mondes[1].familles[1].creerMonstre('Samantha');
}