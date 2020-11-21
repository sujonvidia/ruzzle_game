var pvpStarted = false
var pvpConnected = false
function setPVPListeners (data){
	
	pvp.ready(function(){
		//alert ('pvp ready')
		
	});
	setPVPGameListeners(data)
	pvp.core.socketio.on('disconnect', function() 
	{ 
		 // Disconnected 
		 pvpConnected = false
		 pvpStarted = false
	}); 
	
	pvp.core.socketio.on('connect', function() 
	{ 
		 // Connected 
		 pvpConnected = true
	}); 
	pvp.core.socketio.on('connecting', function() 
	{ 
		 // Connected 
		 pvpConnected = false
	});
}
function setPVPGameListeners(data){
	
	pvp.receiveMessage = function(name, message, subroom){

		// Game Logic
	}
	pvp.receiveMove = function(name, message, subroom){

		// Game Logic
		if (subroom == playingSlot){
			
			if (name!=pvp.clientId || config.application.showMoveImmidiately == false)
				makeAMove(message)
			
			whoCanMove = (whoCanMove == 0) ? 1:0
		}
	}
	
	
	
	pvp.error = function(type,error)
	{
		alert(type + ' :: '+ error);
	}
	
	setSpecificListeners(data)
	
}

function pvpGetToken(callback){
	if (config != {})
	$.ajax({
		//app.get('/GetToken/:appId/:secret', function(req, res){
		url: config.regServer+"/GetToken/"+config.application.appId+"/"+config.application.secret,
		success: function(data){
			data = JSON.parse(data)
			//res.send({token:common.getEncrypted(text)})
			// data is a js object, such as Object or Array
			callback(data)
		},
		error: function(x,et,e){
			alert ("Could not connect to Registration Server")
		}
	})
}
function connectToServer(data){
	if (config != {}){
		var url = "http://"+data.ip+":"+config.application.gameServerPort
		connectionData =  data
		window.pvp = pvpInitialize(url);
		setPVPListeners(data)
		
		
	}
}
