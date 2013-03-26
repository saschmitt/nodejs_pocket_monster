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
		/* Mondes */
		socket.on('demandeMonde', function(){
			for (var i = 0; i < mondes.length; i++ ){
				var idMonde = i;
				var nomMonde = mondes[i].getNom();
				socket.emit('recupereMonde', idMonde, nomMonde);
			}
		});
		
		/* Familles */
		socket.on('demandeFamille', function(idMonde){
			for (var i = 0; i < mondes[idMonde].familles.length; i++ ){
				var idFamille = i;
				var nomFamille = mondes[idMonde].familles[i].getNom();
				socket.emit('recupereFamille', idFamille, nomFamille);
			}
		});
		
		/* Monstres */
		socket.on('demandeMonstre', function(idMonde, idFamille){
			for (var i = 0; i < mondes[idMonde].familles[idFamille].monstres.length; i++ ){
				var idMonstre = i;
				var nomMonstre = mondes[idMonde].familles[idFamille].monstres[i].getNom();
				socket.emit('recupereMonstre', idMonstre, nomMonstre);
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