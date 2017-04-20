// Import the necessary modules
var restify = require('restify');
var builder = require('botbuilder');
var recast = require('recastai');

// Initialize Recast.AI and the Microsoft Bot Framework
// Make sure to use your own tokens/IDs/passwords etc.
var recastClient = new recast.request('8836e21cb89a45d0f20d62ac3a5d2f0c', 'en');
var connector = new builder.ChatConnector({
	appId: 'cec04ad8-2a68-4c7b-b31f-41c394b1e635',
	appPassword: 'VSfWY6n4vuiWqeNVHmTt8xi'
});

// Initialize the bot
var bot = new builder.UniversalBot(connector);

// Set the behavior when a request is sent '/'
bot.dialog('/', function(session) {
	console.log(session.message.text); // Display the message we received in the console
	recastClient.analyseText(session.message.text) // Have Recast analyze the message
	.then(function(res) {
		if (res.intent()) { console.log('Intent: ', res.intent().slug) } // If an intent is discovered, display it
		if (res.intent().slug === 'greetings') { // Do a specific action for a specific intent
		  session.send("Hi there!");
		}
	})
	.catch(function() { // Send a basic response if an error occurs
		session.send('I need some sleep right now... Talk to me later!')
	});
});

// Initialize the server to host the bot
var server = restify.createServer();
server.listen(8000);
server.post('/', connector.listen());
console.log("Listening on :8000");