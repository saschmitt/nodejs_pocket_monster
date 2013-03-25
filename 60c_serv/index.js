/* Modules */
var colors								= require("colors");
var prototypejs							= require('prototype'); 
Object.extend(global, prototypejs);
var server								= require("./server");
var router								= require("./router");
var requestHandlers						= require("./requestHandlers");
var messages							= require("./messages");

/* Variables */
var handle								= {};

/************
*************
**
** PAGES HTML
**
*************
************/
handle["/"]								= requestHandlers.index;
handle["/index"]						= requestHandlers.index;
handle["/index.html"]					= requestHandlers.index;

/**************
***************
**
** FICHIERS CSS
**
***************
**************/
handle["/css/normalize.css"]			= requestHandlers.normalize;
handle["/css/grid.css"]					= requestHandlers.grid;
handle["/css/animations.css"]			= requestHandlers.animations;
handle["/css/styles.css"]				= requestHandlers.styles;

/*********************
**********************
**
** FICHIERS JAVASCRIPT
**
**********************
*********************/
handle["/js/jquery-1.9.1.js"]			= requestHandlers.jquery;
handle["/js/mustache.js"]				= requestHandlers.mustache;
handle["/js/client.js"]					= requestHandlers.client;

server.index(router.route, handle);