var restify = require('restify');
var builder = require('botbuilder');
var recast = require('recastai');
var recastClient = new recast.request('8836e21cb89a45d0f20d62ac3a5d2f0c', 'en');
var server = restify.createServer().listen(8080);

var connector = new builder.ChatConnector({
	appId: 'cec04ad8-2a68-4c7b-b31f-41c394b1e635',
	appPassword: 'VSfWY6n4vuiWqeNVHmTt8xi'
});

var bot = new builder.UniversalBot(connector);

bot.dialog('/', function(session) {
	console.log(session.message.text);
	recastClient.analyseText(session.message.text)
	.then(function(res) {
		if (res.intent()) { console.log('Intent: ', res.intent().slug) }
		if (res.intent().slug === 'greetings') {
		  session.send("Hi there!");
		}
	})
	.catch(function() {
		session.send('I need some sleep right now... Talk to me later!')
	});
});

var server = restify.createServer();
server.listen(8000);
server.post('/', connector.listen());
console.log("Listening on :8000");