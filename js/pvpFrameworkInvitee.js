//Invitee
var iAm = 0
function setSpecificListeners(data){
	pvp.start = function()	{
		pvpStarted = true;
		//function(appId,secret, token, roomId
		setSlot(playingSlot)
		pvp.CreateRoomMulti(config.application.appId, config.application.secret, data.secret, data.roomId)
		
	}
	pvp.roomCreated = function()
	{
		 //alert("Room Created");
		 initGameView()
		
	}
}	
function setSlot(i){
	pvp.subRoom = i
}
function pvpRegister(data,email,callback){
	if (config != {})
		$.ajax({
			//app.get('/Register/:appId/:secret/:token/:email/:transactionid/:roomId?', function(req, res){
			url: config.regServer+"/Register/"+config.application.appId+"/"+config.application.secret+"/"+data.token+"/"+email+"/"+"-1",
			success: function(data){
				//res.send({success:true, roomId:common.getShortRoomId(roomId), ip: server, success:true, secret:token, guest:false})
				// data is a js object, such as Object or Array
				data = JSON.parse(data)
				if (data.success){
					roomId = data.roomId
					setLocalStorage('roomId',roomId)
					callback()
				}
			},
			error: function(x,et,e){
				alert ("Could not connect to Registration Server")
			}
		})
}

function pvpDeleteGameSlot(data,email,roomId,subRoom,callback){
	if (config != {})
        //console.log(config.regServer+"/NewGame/"+config.application.appId+"/"+config.application.secret+"/"+data.token+"/"+email+"/"+roomId+"/"+subRoom+"/"+who+"/"+slotSecret+"/"+slotData)
		$.ajax({
			//app.get('/Login/:appId/:secret/:token/:email/:roomId', function(req, res){
			url: config.regServer+"/NewGame/"+config.application.appId+"/"+config.application.secret+"/"+data.token+"/"+email+"/"+roomId+"/"+subRoom+"/x/yyX/"+slotData,
			success: function(data){
				data = JSON.parse(data)
				//res.send({success:true, roomId:common.getShortRoomId(roomId), ip: server, success:true, secret:token, guest:false})
				// data is a js object, such as Object or Array
               console.log(data.success)
				if (data.success)
					callback(data)
			},
			error: function(x,et,e){
				alert ("Could not connect to Registration Server")
			}
		})
	
	
}
function pvpLogin(data,email,roomId,callback){
	if (config != {})
		$.ajax({
			//app.get('/Login/:appId/:secret/:token/:email/:roomId', function(req, res){
			url: config.regServer+"/Login/"+config.application.appId+"/"+config.application.secret+"/"+data.token+"/"+email+"/"+roomId,
			success: function(data){
				data = JSON.parse(data)
				//res.send({success:true, roomId:common.getShortRoomId(roomId), ip: server, success:true, secret:token, guest:false})
				// data is a js object, such as Object or Array
				if (data.success)
					callback(data)
			},
			error: function(x,et,e){
				alert ("Could not connect to Registration Server")
			}
		})
}
//app.get('/NewGame/:appId/:secret/:token/:email/:roomId/:subRoom:/who:/slotSecret', function(req, res){
function pvpNewGameSlot(data,email,roomId,subRoom,who,slotSecret,callback){
	if (config != {})
        console.log(config.regServer+"/NewGame/"+config.application.appId+"/"+config.application.secret+"/"+data.token+"/"+email+"/"+roomId+"/"+subRoom+"/"+who+"/"+slotSecret+"/"+slotData)
		$.ajax({
			//app.get('/Login/:appId/:secret/:token/:email/:roomId', function(req, res){
			url: config.regServer+"/NewGame/"+config.application.appId+"/"+config.application.secret+"/"+data.token+"/"+email+"/"+roomId+"/"+subRoom+"/"+who+"/"+slotSecret+"/"+slotData,
			success: function(data){
				data = JSON.parse(data)
				//res.send({success:true, roomId:common.getShortRoomId(roomId), ip: server, success:true, secret:token, guest:false})
				// data is a js object, such as Object or Array
               console.log(data.success)
				if (data.success)
					callback()
			},
			error: function(x,et,e){
				alert ("Could not connect to Registration Server")
			}
		})
}
function loginOrRegisterTheUser(autoConnect){
	var f = connectToServer
	if(!autoConnect)
		f = function(data){}
	roomId = getFromLocalStorage('roomId')
	userEmail = getFromLocalStorage('userEmail')
	if (roomId == null){
		var email=prompt("Please enter your email to Register?","");
		if (email!=null && email!=""){
			setLocalStorage('userEmail',email)
			userEmail = email
			
			pvpGetToken(function(data){
				pvpRegister(data,email,f)
			})
		}
	}else{
		pvpGetToken(function(data){
			pvpLogin(data,userEmail,roomId,f)
		})
	}
}
function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
function registerTheUser(autoConnect){
	var f = connectToServer
	if(!autoConnect)
		f = function(data){}
	roomId = getFromLocalStorage('roomId')
	userEmail = getFromLocalStorage('userEmail')
	if (roomId == null){
		var email=guid();//prompt("Please enter your email to Register?","");
		if (email!=null && email!=""){
			setLocalStorage('userEmail',email)
			userEmail = email
			
			pvpGetToken(function(data){
				pvpRegister(data,email,f)
			})
		}
	}
	
}
function loginTheUser(autoConnect){
	var f = connectToServer
	if(!autoConnect)
		f = function(data){goto(nextLocation)}
	roomId = getFromLocalStorage('roomId')
	userEmail = getFromLocalStorage('userEmail')
	if (roomId != null){
		pvpGetToken(function(data){
			pvpLogin(data,userEmail,roomId,f)
		})
	}
}