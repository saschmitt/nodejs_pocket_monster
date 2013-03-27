var http								= require("http");
var url									= require("url");

// Classes
var Monde 								= require('./classes/class_Monde');

/* Serveur */
function index(route, handle){
	function onRequest(request, response){
		var pathname						= url.parse(request.url).pathname;
		var requeteRecue = "\nRequête reçue pour le chemin ";
		console.log( (requeteRecue + pathname).cyan );
		route(handle, pathname, response, request);
	}

	httpServer = http.createServer(onRequest).listen(80);
	console.log( ("Démarrage du serveur. Ecoute sur le port 80.").green );

	/***********
	**
	** Socket.IO
	**
	***********/
	var io = require('socket.io').listen(httpServer);
	mondes = [];
	
	essais();
	liste(mondes[0]);
	liste(mondes[1]);
	
	io.sockets.on('connection', function(socket){
		/*******************
		**
		** AFFICHAGE CONTENU
		**
		*******************/
		/* Affichage mondes */
		socket.on('demandeMonde', function(){
			for (var i = 0; i < mondes.length; i++ ){
				var idMonde = i;
				var nomMonde = mondes[i].getNom();
				socket.emit('recupereMonde', idMonde, nomMonde);
			}
		});
		
		/* Affichage familles */
		socket.on('demandeFamille', function(idMonde){
			for (var i = 0; i < mondes[idMonde].familles.length; i++ ){
				var idFamille = i;
				var nomFamille = mondes[idMonde].familles[i].getNom();
				socket.emit('recupereFamille', idFamille, nomFamille);
			}
		});
		
		/* Affichage monstres */
		socket.on('demandeMonstre', function(idMonde, idFamille){
			for (var i = 0; i < mondes[idMonde].familles[idFamille].monstres.length; i++ ){
				var idMonstre = i;
				var nomMonstre = mondes[idMonde].familles[idFamille].monstres[i].getNom();
				socket.emit('recupereMonstre', idMonstre, nomMonstre);
			}
		});
		/*********************
		**
		** SUPPRESSION CONTENU
		**
		*********************/
		/* Suppression mondes */
		socket.on('aSupprimerMonde', function(idMonde){
			var okDelete = false;
			
			for (var i = 0; i < mondes.length; i++){
				if(mondes[i].getId() == idMonde){
					mondes.splice(i,1);
					okDelete = true;
				}
				if(okDelete = true){
					io.sockets.emit('okSupprimerMonde', idMonde);
				}
			}
		});
		
		/* Suppression familles */
		socket.on('aSupprimerFamille', function(idMonde, idFamille){
			var okDelete = false;
			
			for (var i = 0; i < mondes[idMonde].familles.length; i++){
				if(mondes[idMonde].familles[i].getId() == idFamille){
					mondes[idMonde].familles.splice(i,1);
					okDelete = true;
				}
				if(okDelete = true){
					io.sockets.emit('okSupprimerFamille', idFamille);
				}
			}
		});
		
		/* Affichage monstres */
		socket.on('aSupprimerMonstre', function(idMonde, idFamille, idMonstre){
			var okDelete = false;
			
			for (var i = 0; i < mondes[idMonde].familles[idFamille].monstres.length; i++){
				if(mondes[idMonde].familles[idFamille].monstres[i].getId() == idMonstre){
					mondes[idMonde].familles[idFamille].monstres.splice(i,1);
					okDelete = true;
				}
				if(okDelete = true){
					io.sockets.emit('okSupprimerMonstre', idMonstre);
				}
			}
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
// console.log(stargate.familles[0].getNom());
// console.log(stargate.familles[0].monstres[0].getNom());





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
	mondes.push( new Monde( 1, 'StarGate', 'StarGate.png' ) );
	
	
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