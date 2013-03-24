/************
**
** MODULES
**
************/
// Modules
var colors 								= require('colors');
var http 								= require('http');
var prototypejs 						= require('prototype'); 
Object.extend(global, prototypejs); 

retourConsole()

// Classes
var Monde 								= require('./Classes/class_Monde');
var starwars 							= new Monde( 0, 'StarWars', 'StarWars.png' );
var stargate 							= new Monde( 0, 'StarGate', 'StarGate.png' );


essais();
liste(stargate);
liste(starwars);

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
	console.log('   ║'.green + '    ESSAIS CLASSES');
	console.log('   ║'.green);
	console.log('----------------------'.green);
	console.log('\n\n\n');
}

function essais(){
	starwars.creerFamille('Skywalker');
	starwars.familles[0].creerMonstre('Anakin');
	starwars.familles[0].creerMonstre('Leia');
	starwars.familles[0].creerMonstre('Luke');

	starwars.creerFamille('Solo');
	starwars.familles[1].creerMonstre('Yan');

	starwars.creerFamille('Pellaeon');
	starwars.familles[2].creerMonstre('Gilad');

	stargate.creerFamille('O\'Neill');
	stargate.familles[0].creerMonstre('Jack');
	stargate.creerFamille('Carter');
	stargate.familles[1].creerMonstre('Samantha');
}