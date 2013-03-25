var http								= require("http");
var url									= require("url");

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

	io.sockets.on('connection', function(socket){
		socket.on('t1', function(){
			
			io.sockets.emit('t2');
		});
	});
}



/**********************/

exports.index							= index;