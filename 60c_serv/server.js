// Modules
var http								= require("http");
var url									= require("url");

// Classes
var Monde 								= require('./classes/class_Monde');
mondes = [];
essais();
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
		
		
		
		liste(mondes[0]);
		liste(mondes[1]);
	
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
					contenu.id = i;
					contenu.nom = mondes[idMonde].familles[i].getNom();
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
			mondes.push( new Monde( 0, aCreer.nom, aCreer.nom + '.png' ) );
			io.sockets.emit('afficherMonde');
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
	console.log('   ║'.green + '    ESSAIS Classes');
	console.log('   ║'.green);
	console.log('----------------------'.green);
	console.log('\n\n\n');
}

function essais(){
	mondes.push( new Monde( 0, 'StarWars', 'StarWars.png' ) );
	mondes.push( new Monde( 0, 'StarGate', 'StarGate.png' ) );
	
	
	mondes[0].creerFamille('Skywalker');
	mondes[0].familles[0].creerMonstre('Anakin');
	mondes[0].familles[0].creerMonstre('Leia');
	mondes[0].familles[0].creerMonstre('Luke');

	mondes[0].creerFamille('Solo');
	mondes[0].familles[1].creerMonstre('Yan');

	mondes[0].creerFamille('Pellaeon');
	mondes[0].familles[2].creerMonstre('Gilad');

	mondes[1].creerFamille('O\'Neill');
	mondes[1].familles[0].creerMonstre('Jack');
	mondes[1].creerFamille('Carter');
	mondes[1].familles[1].creerMonstre('Samantha');
}