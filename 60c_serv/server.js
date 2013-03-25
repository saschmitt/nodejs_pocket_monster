var http 								= require("http");
var url 								= require("url");
var serveurActif 						= "Démarrage du serveur. Ecoute sur le port 80.";

function index(route, handle){
	function onRequest(request, response){
		var pathname 					= url.parse(request.url).pathname;
		var requeteRecue = "\nRequête reçue pour le chemin ";
		console.log( (requeteRecue + pathname).cyan );
		route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(80);
	console.log( serveurActif.green );
}

exports.index 							= index;