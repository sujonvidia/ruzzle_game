var nextLocation
var slotData
var firstMoveMessage = ""
// Invitee doesn't need following functions 
function initGame(){
	var m = getFromLocalStorage('maxSlots')
	if (m == null){
		setLocalStorage('maxSlots',5)
		m = 5
	}
	maxSlots = m
	var s = getFromLocalStorage('slots')
	if (s == null){
		setLocalStorage('slots',JSON.stringify(new Array()))
		s = new Array()
	}else{
		s = JSON.parse(s)
	}
	slots = s
	
	roomId = getFromLocalStorage('roomId')
	userEmail = getFromLocalStorage('userEmail')
	if (roomId == null)
		registerTheUser(false)
		
}
function updatSlotsToStorage(){
	setLocalStorage('slots',JSON.stringify(slots))
}
function newSlot(subRoom,who,slotSecret,f){
	pvpGetToken(function(data){
		pvpNewGameSlot(data,userEmail,roomId,subRoom,who,slotSecret,f)
	})	
}
function deleteSlot(){
	
	
	navigator.notification.confirm(
        'Are you sure you want to delete your game with '+slots[playingSlot].name+'?',  // message
        function(button){
			console.log("button ----------------- " + button )
			if (button == 1){
				$('.current').append('<div id="loadinginprogress">Deleting...</div>');
				pvpGetToken(function(data){
					pvpDeleteGameSlot(data,userEmail,roomId,playingSlot,function(){
						deleteGameSlot(playingSlot)
						showMyGames()
						$('#loadinginprogress').remove()
					})
				})	
			}else{
				
			}
		},              // callback to invoke with index of button pressed
        'Delete Game',            // title
        'Yes,No'          // buttonLabels
    );
	
	
}
function deleteGameSlot(sId){
	if(slots[sId]){
		
		slots[sId] = null;
		updatSlotsToStorage()
	}
}
function getEmptySlot(){
	var s = 0
	for (var i=0; i < maxSlots; i++){
		if (slots[i] == null || !slots[i]){
			s++
		}
	}
	return s;
}
function randomString(length) {
	var chars = 'UXWlc6ZYiQttsz8zBvT2QjguccSksEcK0EbeTTwkQwDbQg6abSA8he6Z563kVX';
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}
function startGameSlot(i, name, email, type, token){
	var gs = {name: name, email:email, token:token, type:type}
	slots[i] = gs
	updatSlotsToStorage()
	return gs;
}
function startGameSlotFacebook(i, name, fbID){
	var gs = {name: name, fbID:fbID, token:randomString(5)}
	slots[i] = gs
	updatSlotsToStorage()
	return gs;
}
function getFromLocalStorage(key){
	return localStorage.getItem(key)	
}
function setLocalStorage(key, value){
	localStorage.setItem(key, value)	
}

function playGame(i){
	$('.current').append('<div id="loadinginprogress">Loading...</div>');
	if (i==null || i == undefined)
		i = emptySlot
	
	//playingSlotSecret = slots[i].token
	playingSlot = i
	
	drawNewBoard()
	//if connected, get view of board and update board
	//else connect, get view of board and update board
	if (pvpStarted){
		setSlot(i)
		initGameView()
		
	}else{
		
		loginTheUser(true)
	}
	//$('#gameview').find('.innerRight').attr('href', 'mailto:'+slots[i].email+"?subject=Come play chess with me!&body=To play click: "+serverIP+roomId+"/"+i+"/")
	
	//$('#resend').attr('href', 'javascript:resendInvitation(slots['+playingSlot+']);')
    console.log(serverIP+roomId+"/"+i+"/"+playingSlotSecret+"/");
}
function isOdd(num) { return num % 2;}


/* iOS Specific */
function resendInvitation(obj){
    console.log("resendInvitation")
    if (!obj && slots[playingSlot]){
            obj =slots[playingSlot]
    
	if (obj && obj.type == "phone"){

        
        
		window.plugins.smsComposer.showSMSComposerWithCB(playerInvitationSentSMS, obj.email, config.application.message.subject+ "\n"+config.application.message.data+serverIP+roomId+"/"+playingSlot+"/"+obj.token+"/")
			
		//cordova.exec(playerInvitationSent,playerInvitationCancelled, 'SMSComposer','showSMSComposer',[{toRecipients:obj.email,body:config.application.message.subject+"\n"+config.application.message.data+serverIP+roomId+"/"+slots.indexOf(obj)+"/"+obj.token+"/"}])
	}else if(obj && obj.type =="email"){
         console.log("resendInvitation Email")
		window.plugins.emailComposer.showEmailComposerWithCB(playerInvitationSentEmail,config.application.message.subject,config.application.message.data+serverIP+roomId+"/"+playingSlot+"/"+obj.token+"/",obj.email)
			
		//cordova.exec(playerInvitationSent,playerInvitationCancelled, 'EmailComposer', 'showEmailComposer',[{toRecipients:obj.email,subject:config.application.message.subject, body:config.application.message.data+serverIP+roomId+"/"+slots.indexOf(obj)+"/"+obj.token+"/"}])
	}
    }
}

function openSMSChat(obj){
    console.log("openSMSChat")
    if (!obj && slots[playingSlot]){
        obj =slots[playingSlot]
	if (obj && obj.type == "phone"){
		window.plugins.smsComposer.showSMSComposerWithCB(playerInvitationSentSMS, obj.email, "")
		//cordova.exec(playerInvitationSent,playerInvitationCancelled, 'SMSComposer','showSMSComposer',[{toRecipients:obj.email,body:""}])
	}
    }
}

function playerInvitationSentSMS(result){
	console.log("playerInvitationSentSMS")
	//console.log(JSON.stringify(result))
	//if (result == 1){
	//var g = startGameSlot(emptySlot,emptySlotDetails.name,emptySlotDetails.toRecipients,emptySlotDetails.type,emptySlotDetails.token)
	
	//playingSlot = emptySlot
	//playingSlotSecret = emptySlotDetails.token
	//showMyGames(true)
	//Add the random key to prevent palying with old invites
	//$('#inviteFriends').find('#start').hide()
	//$('#sendInvite').find('.dummy').attr('href', 'javascript:resendInvitation(slots['+playingSlot+']);')
	//}
	//$('#sendInvite').find('.dummy').attr('href', 'mailto:'+$('#email').val()+"?subject=Come play chess with me!&body=To play click: "+serverIP+roomId+"/"+playingSlot+"/"+slots[playingSlot].token+"/")
}
function playerInvitationSentEmail(result){
	console.log("playerInvitationSentEmail")
	//console.log(JSON.stringify(result))
	//if (result == 2){
	//var g = startGameSlot(emptySlot,emptySlotDetails.name,emptySlotDetails.toRecipients,emptySlotDetails.type,emptySlotDetails.token)
	
	//playingSlot = emptySlot
	//playingSlotSecret = emptySlotDetails.token
	//showMyGames(true)
	//Add the random key to prevent palying with old invites
	//$('#inviteFriends').find('#start').hide()
	//$('#sendInvite').find('.dummy').attr('href', 'javascript:resendInvitation(slots['+playingSlot+']);')
	//}
	//$('#sendInvite').find('.dummy').attr('href', 'mailto:'+$('#email').val()+"?subject=Come play chess with me!&body=To play click: "+serverIP+roomId+"/"+playingSlot+"/"+slots[playingSlot].token+"/")
}
function playerInvitationCancelled(result){
	console.log("playerInvitationCancelled")
	console.log(JSON.stringify(result))
}
var slotSecret = randomString(5)
function playerSelected(result){
	//{"name":{"givenName":"Al-Mahmud","formatted":"Al-Mahmud Ali","middleName":null,"familyName":"Ali","honorificPrefix":null,"honorificSuffix":null},"id":1,"phoneNumbers":[{"type":"mobile","value":"(647) 702-1039","id":0,"pref":false}],"emails":[{"type":"home","value":"ibnmasud@gmail.com","id":0,"pref":false}],"photos":null}
	
    console.log(JSON.stringify(result))
    if(result.id > -1 && result.status == 1)
	newSlot(emptySlot,0,slotSecret,function(){
		console.log(JSON.stringify(result))
		var playerName = result.name.formatted
		if (result.phoneNumbers != null)
			var playerPhone = result.phoneNumbers[0].value
		if (result.emails != null)
			var playerEmail = result.emails[0].value
		if (result.photos != null)
			var playerPhotos = result.photos
			
		emptySlotDetails = {token:slotSecret, name:playerName, type:result.sentType, playerEmail:result.sentData, toRecipients:result.sentData}
        
		var g = startGameSlot(emptySlot,emptySlotDetails.name,emptySlotDetails.toRecipients,emptySlotDetails.type,emptySlotDetails.token)
            
        playingSlot = emptySlot
        playingSlotSecret = emptySlotDetails.token
        showMyGames(true)
		
		if (config.application.playGameFirst && firstMoveMessage != ""){
			pvp[config.application.pvpFunction](firstMoveMessage)
			firstMoveMessage = ""
			playerInvitationFinished();
		}
	
	})
}
function playerNotSelected(){
	goto('myGames')
}
function openAddressbookForSlotForced(slot){
	
	navigator.notification.confirm(
        'Now challenge a friend on your Contacts list to beat your time!',  // message
        function(button){
			console.log("button ----------------- "+button)
			if (button == 1){
				slotSecret = randomString(5)
				console.log("openAddressbookForSlot "+slot)
				
				console.log("openAddressbookForSlot "+config.application.type)
				console.log("openAddressbookForSlot "+config.application.possibleTypes[0])
				// look at type of game, 
				// if game requires setup data then
				emptySlot = slot 
				
				slotData = ""
				navigator.contacts.choose(playerSelected,playerNotSelected,config.application.message.subject,config.application.message.data+serverIP+roomId+"/"+emptySlot+"/"+slotSecret+"/")	
			}else{
				goto('myGames')
			}
		},              // callback to invoke with index of button pressed
        'Invite Friend!',            // title
        'Send Invite,Cancel'          // buttonLabels
    );
	
	
		

}
function openAddressbookForSlot(slot){
	if (config.application.playGameFirst){
		playGame(slot)
	}else{
		slotSecret = randomString(5)
		console.log("openAddressbookForSlot "+slot)
		
		console.log("openAddressbookForSlot "+config.application.type)
		console.log("openAddressbookForSlot "+config.application.possibleTypes[0])
		// look at type of game, 
		// if game requires setup data then
		emptySlot = slot 
		if (config.application.type == config.application.possibleTypes[0]){
			slotData = ""
			navigator.contacts.choose(playerSelected,playerNotSelected,config.application.message.subject,config.application.message.data+serverIP+roomId+"/"+emptySlot+"/"+slotSecret+"/")
		}else if (config.type == config.possibleTypes[1]){
			goto('options')
		}
	}
}
function setPreGameOptions(val){
	slotData = val
	navigator.contacts.choose(playerSelected,playerNotSelected)
}
/* to play locally */
function createSlotIfDoesntExistAndPlay(){
	//if (slots[0] == null || !slots[0]){
		var t = randomString(5)
		newSlot(0,0,t,function(){
			var g = startGameSlot(0,"Test Slot","ali@bornolipi.com",1,t)
			playGame(0)	
		})
	//}else{
//		playGame(0);
//	}
}
function showMyGames(dontredraw){
	var h = ''
	var numEmptySlots = getEmptySlot()//now return number of empty slots left
	var numGames = maxSlots - numEmptySlots
	var nextEmptySlot = maxSlots - numEmptySlots
	var playeingGamesShown = 0
	console.log("nextEmptySlot "+nextEmptySlot)
	var c = 'even'
	for (var i=0; i < maxSlots && playeingGamesShown < numGames; i++){
		var odd = isOdd(i+1)
		
		if(odd)
			c = 'odd'
		else
			c = 'even'
		if (slots[i] == null || !slots[i]){
			h = h+'<a href="javascript:openAddressbookForSlot('+i+')"><div class="tab '+c+'_empty"><p class="tab_copy">&nbsp;</p></div></a>'
			//h = h+'<a href="javascript:showInviteFriendsForSlot('+i+')"><p class="'+c+'_empty">empty</p></a>'
			//h = h+'<a class="'+c+'_empty" href="javascript:showInviteFriendsForSlot('+i+')">empty</a>'
		}else{
			h = h+'<a href="javascript:playGame('+i+')"><div class="tab '+c+'_play"><div class="avatarBlack"></div><p class="tab_copy">'+slots[i].name+'</p></div></a>'
			playeingGamesShown++
			//h = h+'<a class="'+c+'_play" href="javascript:playGame('+i+')">'+slots[i].name+'</a>'
		}
	}
	if (c=='odd')
		c='even'
	else
		c='odd'
    if (numGames >= maxSlots){
            h = h+'<a href="javascript:showStoreFront()"><div class="tab '+c+'_empty"><p class="tab_copy">&nbsp;</p></div></a>'
            //h = h+'<a href="javascript:showStoreFront()"><div class="tab '+c+'_buy"><p class="tab_copy">&nbsp;</p></div></a>'
    }else if(playeingGamesShown == numGames){
        h = h+'<a href="javascript:openAddressbookForSlot('+i+')"><div class="tab '+c+'_empty"><p class="tab_copy">&nbsp;</p></div></a>'
        
            
    }
	$('#myList').html(h)
	if (!dontredraw)
		goto('myGames')
	
}
function showMyFriends(friendsInfo){
	var h = ''
	for (var i=0; i < friendsInfo.length; i++){
		var odd = isOdd(i+1)
		var c = 'even'
		if(odd)
			c = 'odd'
		h = h+'<a href="javascript:sendRequestSingleSelect('+i+')"><p class="'+c+'_play">'+friendsInfo[i].name+'</p></a>'

		
	}
	
	$('#myFriendList').html(h)
	//goto('myGames')
	
}
function goToInviteFriends(){
	if (roomId == null){
		nextLocation = "inviteFriends";
		registerTheUser(false)
	}else{
		//$('#inviteFriends').find('#send').hide()
		$('#inviteFriends').find('#start').show()
		goto('inviteFriends')	
	}
}
function showInviteFriendsForSlot(slot){
	emptySlot = slot
	emptySlotDetails = randomString(5)
	goToInviteFriends()
}
function showInviteFriends(){
	
	emptySlot = getEmptySlot()
	if (emptySlot == undefined)
		alert('You do not have any more slots, please delete a game to invite more friends.')
	else
		goToInviteFriends()
	
}

function newMatch() {
    var token = randomString(5);
    newSlot(playingSlot, 0, token, function() {
        startGameSlot(playingSlot, slots[playingSlot].name, slots[playingSlot].email,
            slots[playingSlot].type, token);
        playGame(playingSlot);
    });
}

function opponentName() {
    return slots[playingSlot].name;
}
function showStoreFront(){
	navigator.notification.confirm(
        'You can play 5 games at the same time for free. Please close one of the games before creating a new one.',  // message
        function(button){
			
		},              // callback to invoke with index of button pressed
        'Reached Max',            // title
        'Ok'          // buttonLabels
    );
}
function resendInviteWithPrompt(obj){
	if (!obj && slots[playingSlot]){
            obj =slots[playingSlot]
	navigator.notification.confirm(
        obj.name+' is playing on a browser, so you have to tell them it\'s their turn.',  // message
        function(button){
			console.log("button ----------------- "+button)
			if (button == 1){
				resendInvitation()
			}else{
				goto('myGames')
			}
		},              // callback to invoke with index of button pressed
        'Invite Friend!',            // title
        'Send Invite,Cancel'          // buttonLabels
    );
	
	
		
	}
}
