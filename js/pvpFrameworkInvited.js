//Invited
var iAm = 1
var pingTimer = 0
function setSpecificListeners(data){
	pvp.start = function()	{
		pvpStarted = true;
		//function(appId,secret, token, roomId
		pvp.subRoom = playingSlot
		//everyone.now.JoinRoomMulti = function(appId, secret, token, roomId, subRoom){
		pvp.JoinRoomMulti(config.application.appId, config.application.secret, data.secret, data.roomId)
		if (pingTimer != 0)
			clearInterval(pingTimer)
		pingTimer = setInterval(pvp.ping(),10000);
	}
	pvp.friendJoined = function()
	{
		 //alert("Room Created");
		 drawNewBoard()
		 initGameView()
		
	}
}
function loginGuest(){
	var f = connectToServer
	
	if (roomId != null){
		pvpGetToken(function(data){
			pvpGuestLogin(data,f)
		})
	}
}