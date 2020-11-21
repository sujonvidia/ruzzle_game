/**
 * Author: Md Mahmud Hossain (m.hossain@bornolipi.com)
 * Last Update Date: 10/01/2013
 */

// Time Counter
var seconds = 0;
var minutes = 0;
var action = 0;
var boardId = 0;

//var onBoardArea = [];
//var wholeIds = [];

var alphabetPoint = [0,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,2,3,4,1,5,6];

var onBoardAlphabets = [];

var alphabets = [];
	for (var u = 1; u <= 27; u++){
		alphabets.push(u)
	}
	
var randomAlphabets;	

randomizeAlphabets()

function randomizeAlphabets(){
	randomAlphabets = new RandomList(alphabets);		
}
function zeroPad(time) {
	var numZeropad = time + '';
	while(numZeropad.length < 2) {
		numZeropad = "0" + numZeropad;
	}
	return numZeropad;
}

function countSecs() {
	seconds++;
	if (seconds > 59) {
		minutes++;
		seconds = 0;
	}
	//document.getElementById("timer").innerHTML = zeroPad(minutes) + ":" + zeroPad(seconds); /////////////////////////
}

function startTimer() {
	action = window.setInterval(countSecs,1000);
}
function RandomList(list, alias) {

    if (!list) {return;}

    var length = list.length;
    this.indexes = [];

    this.remainingItems = function(){
        return this.indexes.length;
    };

    this[alias || 'getItem'] = function(){
        var rand = Math.floor(Math.random() * this.indexes.length),
            item = {item:list[this.indexes[rand]],rand:this.indexes[rand]};
        this.indexes.splice(rand, 1);
        return item;
    };

    while (length--) {
        this.indexes[this.indexes.length] = length;
    }

}

var whoCanMove = 0


var emptySquares = new Array()
var filledBoxes = 0



function checkPosition(oBAlphabets){

	var pos
	
	if(oBAlphabets[0].split("-")[2] === oBAlphabets[1].split("-")[2]){
		pos = "V"
		if(oBAlphabets.length > 2){
			for ( var i = 1; i < oBAlphabets.length-1; i = i + 1 ) {
				if(oBAlphabets[i].split("-")[2] !== oBAlphabets[i+1].split("-")[2]){
					pos = "NOP"
				}
			}
			return pos
		}
		else{
			return pos	
		}
	}
	else if(oBAlphabets[0].split("-")[1] === oBAlphabets[1].split("-")[1]){
		pos = "H"
		if(oBAlphabets.length > 2){
			for ( var i = 1; i < oBAlphabets.length-1; i = i + 1 ) {
				if(oBAlphabets[i].split("-")[1] !== oBAlphabets[i+1].split("-")[1]){
					pos = "NOP"
				}	
			}
			return pos
		}
		else{
			return pos	
		}
	}
	else{
		pos = "NOP"
		return pos
	}
}

var playerScore = 0

function yesPressed(){
	
	var position = "One"
	var position2 = "One"
	var onBoard = []
	var oB = 0
	var flag = 1
	var positioning = 0
	
	for ( var i = 1; i < onBoardAlphabets.length; i = i + 1 ) {
		if (typeof(onBoardAlphabets[i]) !== "undefined") {
			if(onBoardAlphabets[i] != "U"){
					onBoard[oB] = onBoardAlphabets[i]
					oB++
			}
		}
	}
	
	onBoardAlphabets = []
	
	if(onBoard.length<=0){
		position = "NW"
		flag = 5
		positioning = 5
	}
	
	if(onBoard.length>1){
		position = checkPosition(onBoard)
		position2 = position
	}
	
	//alert(position)
	
	var restAlphaPos = []
	var restAlphaPosVal = []
	
	if(position === "H" || position === "One"){
		kk = 0
		
		wordPositions = []
		
		hPos = onBoard[0].split("-")[1]
		
		for ( var i = 0; i < onBoard.length; i = i + 1 ) {
			console.log(onBoard[i])
			console.log(onBoard[i].split("-")[2])
			wordPositions[kk] = onBoard[i].split("-")[2]
			kk++
		}
		
		minVal = Math.min.apply(Math,wordPositions)
		console.log(minVal)
		
		maxVal = Math.max.apply(Math,wordPositions)
		console.log(maxVal)
		
		//Check Alphabet Position
		for(j=minVal; j<=maxVal; j++){
			startPos = "b-"+hPos+"-"+j			
			classes = $('#'+startPos).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			if(z.indexOf("nm")<0){
				positioning = 1
			}
		}
		
		if(positioning == 0){
			startPos = "b-"+hPos+"-"+minVal
			console.log("START:- "+startPos)
			
			classes = $('#'+startPos).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			z = z.substring(2)
			number = Number(z)
			scoreCalculate(classes[0],classes[1])
			restAlphaPos.push(startPos)
			restAlphaPosVal.push(classes[1])
			word = String.fromCharCode(64+number)
			//alert(String.fromCharCode(64+number))
			//$("#"+startPos+"[class*='nm']")
			
			//RightCheck
			for(j=minVal+1; j<15; j++){
				startPos = "b-"+hPos+"-"+j			
				classes = $('#'+startPos).attr("class").split(/\s/);
				z = classes[classes.length - 1];
				if(z.indexOf("nm")>=0){
				z = z.substring(2)
				number = Number(z)
				scoreCalculate(classes[0],classes[1])
				restAlphaPos.push(startPos)
				restAlphaPosVal.push(classes[1])
				word = word + String.fromCharCode(64+number)
				}
				else{
					break;	
				}
			}
			
			//LeftCheck
			for(j=minVal-1; j>=0; j--){
				startPos = "b-"+hPos+"-"+j			
				classes = $('#'+startPos).attr("class").split(/\s/);
				z = classes[classes.length - 1];
				if(z.indexOf("nm")>=0){
				z = z.substring(2)
				number = Number(z)
				scoreCalculate(classes[0],classes[1])
				restAlphaPos.push(startPos)
				restAlphaPosVal.push(classes[1])
				word = String.fromCharCode(64+number) + word
				}
				else{
					break;	
				}
			}
			
			word = word.toLowerCase()
			var alphabet1 = word.substr(0,1)
			
			//alert(word)
			//alert(alphabet1+" --- "+word)
			//alert(dictionary[alphabet1].indexOf(word))
			if(word.length>1){
				if(dictionary[alphabet1].indexOf(word)>=0){
					//setNewAlphabets()
					flag = 1
					//alert(word+" ---Accepted")
					position = "DONE"
				}
				else{
					flag = 0
					position = "NOT"
					restAlphaPos = []
					restAlphaPosVal = []
				}
			}
			else{
				flag=2
				restAlphaPos = []
				restAlphaPosVal = []
				playerScore=0
			}
		}
	}
	if(position === "V" || position === "One"){
		kk = 0
		wordPositions = []
		vPos = onBoard[0].split("-")[2]
		
		for ( var i = 0; i < onBoard.length; i = i + 1 ) {
			console.log(onBoard[i])
			console.log(onBoard[i].split("-")[1])
			wordPositions[kk] = onBoard[i].split("-")[1]
			kk++
		}
		
		minVal = Math.min.apply(Math,wordPositions)
		console.log(minVal)
		
		maxVal = Math.max.apply(Math,wordPositions)
		console.log(maxVal)
		
		//Check Alphabet Position
		for(j=minVal; j<=maxVal; j++){
			startPos = "b-"+j+"-"+vPos			
			classes = $('#'+startPos).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			if(z.indexOf("nm")<0){
				positioning = 1
			}
		}
		
		if(positioning == 0){
			startPos = "b-"+minVal+"-"+vPos
			console.log("START:- "+startPos)
			
			classes = $('#'+startPos).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			z = z.substring(2)
			number = Number(z)
			scoreCalculate(classes[0],classes[1])
			restAlphaPos.push(startPos)
			restAlphaPosVal.push(classes[1])
			word = String.fromCharCode(64+number)
			//alert(String.fromCharCode(64+number))
			//$("#"+startPos+"[class*='nm']")
			
			//DownCheck
			for(j=minVal+1; j<15; j++){
				startPos = "b-"+j+"-"+vPos			
				classes = $('#'+startPos).attr("class").split(/\s/);
				z = classes[classes.length - 1];
				//alert("D--"+z.indexOf("nm"))
				if(z.indexOf("nm")>=0){
				z = z.substring(2)
				number = Number(z)
				scoreCalculate(classes[0],classes[1])
				restAlphaPos.push(startPos)
				restAlphaPosVal.push(classes[1])
				word = word + String.fromCharCode(64+number)
				}
				else{
					break;	
				}
			}
			
			//UpCheck
			for(j=minVal-1; j>=0; j--){
				startPos = "b-"+j+"-"+vPos			
				classes = $('#'+startPos).attr("class").split(/\s/);
				z = classes[classes.length - 1];
				//alert("U--"+z.indexOf("nm"))
				if(z.indexOf("nm")>=0){
				z = z.substring(2)
				number = Number(z)
				scoreCalculate(classes[0],classes[1])
				restAlphaPos.push(startPos)
				restAlphaPosVal.push(classes[1])
				word = String.fromCharCode(64+number) + word
				}
				else{
					break;	
				}
			}
			
			word = word.toLowerCase()
			var alphabet1 = word.substr(0,1)
			
			//alert(word)
			//alert(alphabet1+" --- "+word)
			//alert(dictionary[alphabet1].indexOf(word))
			if(word.length>1){
				if(dictionary[alphabet1].indexOf(word)>=0){
					//setNewAlphabets()
					flag = 1
					//alert(word+" ---Accepted")
				}
				else{
					flag = 0
					restAlphaPos = []
					restAlphaPosVal = []
				}
			}
			else{
				flag=2
				restAlphaPos = []
				restAlphaPosVal = []
				playerScore=0
			}
		}
		//setNewAlphabets()
	}
	if (position === "NOP"){
		flag = 0
	}
	
	if(flag === 0){
		alert("Invalid word")
		$('.boxDrag').each(function(){
			//drag.reset(this)
			if($('#'+this.id).css("opacity") === '0')
			{
				var c2 = this.id
				var idNum = c2.substring(1);
				$("#mD-"+idNum).append(this);
				$('#'+this.id).css("opacity","1")
				
				var classes2 = $('a#'+this.id).attr("class").split(/\s/);
			
				$('#'+this.id).removeClass(classes2[0]).removeClass(classes2[1]).removeClass(classes2[2]);
				classes2[1] = "bD"											
				$('#'+this.id).addClass(classes2[0]).addClass(classes2[1]).addClass(classes2[2]);
			}
		})

		for ( var i = 0; i < onBoard.length; i = i + 1 ) {
			classes = $('#'+onBoard[i]).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			$('#'+onBoard[i]).removeClass(z)
		}
		playerScore = 0
	}
	
	if(flag === 2){
		alert("Create a word")
		$('.boxDrag').each(function(){
				//drag.reset(this)
			if($('#'+this.id).css("opacity") === '0')
			{
				var c2 = this.id
				var idNum = c2.substring(1);
				$("#mD-"+idNum).append(this);
				$('#'+this.id).css("opacity","1")
				
				var classes2 = $('a#'+this.id).attr("class").split(/\s/);
			
				$('#'+this.id).removeClass(classes2[0]).removeClass(classes2[1]).removeClass(classes2[2]);
				classes2[1] = "bD"											
				$('#'+this.id).addClass(classes2[0]).addClass(classes2[1]).addClass(classes2[2]);
			}
		})

		for ( var i = 0; i < onBoard.length; i = i + 1 ) {
			classes = $('#'+onBoard[i]).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			$('#'+onBoard[i]).removeClass(z)
		}
		playerScore = 0
	}
	
	
	if(positioning == 1){
		alert("Invalid position")
		$('.boxDrag').each(function(){
				//drag.reset(this)
			if($('#'+this.id).css("opacity") === '0')
			{
				var c2 = this.id
				var idNum = c2.substring(1);
				$("#mD-"+idNum).append(this);
				$('#'+this.id).css("opacity","1")
				
				var classes2 = $('a#'+this.id).attr("class").split(/\s/);
			
				$('#'+this.id).removeClass(classes2[0]).removeClass(classes2[1]).removeClass(classes2[2]);
				classes2[1] = "bD"											
				$('#'+this.id).addClass(classes2[0]).addClass(classes2[1]).addClass(classes2[2]);
			}
		})

		for ( var i = 0; i < onBoard.length; i = i + 1 ) {
			classes = $('#'+onBoard[i]).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			$('#'+onBoard[i]).removeClass(z)
		}
		playerScore = 0
	}
	
	
	//var individualWord = 2
	var position3 = position
	
	if(positioning == 0 && flag == 1){
		for(i=0;i<onBoard.length;i++){
			//alert(onBoard[i])
			
			individualWord = parseInt(CheckIndividuals(onBoard[i],position2))
			
			if(individualWord === 1){
				alert("Invalid word")
				$('.boxDrag').each(function(){
						//drag.reset(this)
					if($('#'+this.id).css("opacity") === '0')
					{
						var c2 = this.id
						var idNum = c2.substring(1);
						$("#mD-"+idNum).append(this);
						$('#'+this.id).css("opacity","1")
						
						var classes2 = $('a#'+this.id).attr("class").split(/\s/);
			
						$('#'+this.id).removeClass(classes2[0]).removeClass(classes2[1]).removeClass(classes2[2]);
						classes2[1] = "bD"											
						$('#'+this.id).addClass(classes2[0]).addClass(classes2[1]).addClass(classes2[2]);
					}
				})
		
				for ( var i = 0; i < onBoard.length; i = i + 1 ) {
					classes = $('#'+onBoard[i]).attr("class").split(/\s/);
					z = classes[classes.length - 1];
					$('#'+onBoard[i]).removeClass(z)
				}
				playerScore = 0
				break;
			}
			/*else if (individualWord === 0){
				setNewAlphabets()
			}*/
			
			//alert(individalWord)
		}
		
		if(individualWord === 2 || individualWord === 0){
			
			var player1, player2
			
			playerScore = checkPlayerScore2(playerScore)
			
			checkOtherAlphaScore(restAlphaPos,position3,restAlphaPosVal)
			
			if(iAm == 0){
				player1 = Number(playerScore) + Number($("#player1Score").html())
				player2 = $("#player2Score").html()
				//$("#player1Score").html(playerScore)
			}
			
			if(iAm == 1){
				player1 = $("#player1Score").html()
				player2 = Number(playerScore) + Number($("#player2Score").html())
				//$("#player2Score").html(playerScore)
			}
			
			$("#player1Score").html(player1)
			$("#player2Score").html(player2)
			
			alert("Word accepted")
			//word+" ---Accepted"\n Posiiton:"+position+"\n Position2:"+position2
			
			var onBoardSendDetails = []
			
			j=0
			
			for(i=0;i<onBoard.length;i++){
				classes = $('#'+onBoard[i]).attr("class").split(/\s/)
				z = classes[classes.length - 1]
				onBoardSendDetails[j] = onBoard[i]
				onBoardSendDetails[j+1] = z
				
				j += 2
			}
			
			onBoardSendDetails = onBoardSendDetails.join(',')
			
			//$('.current').append('<div id="loadinginprogress">Waiting...</div>');
			//$('.current').append('<div id="loadinginprogress">Waiting...</div>');
			//$('.current').append('<div id="loadinginprogress">Waiting...</div>');
			//$('#btnShuffle').off("click",shufflePressed);
			//disableAll();
			hideAll();
			
			//var newPS = playerScore
			playerScore = 0
			
			$('.boxDrag').each(function(){

				if($('#'+this.id).css("opacity") === '0')
				{
					var c2 = this.id
					var idNum = c2.substring(1);
					$("#mD-"+idNum).append(this);
					
					var classes2 = $('a#'+this.id).attr("class").split(/\s/);
			
					$('#'+this.id).removeClass(classes2[0]).removeClass(classes2[1]).removeClass(classes2[2]);
					classes2[1] = "bD"											
					$('#'+this.id).addClass(classes2[0]).addClass(classes2[1]).addClass(classes2[2]);
				}
			});
			
			//pvp.makeMove(onBoardSendDetails+'~'+player1+'~'+player2);
			
			if (iAm == 0 && !slots[playingSlot]){
				firstMoveMessage = onBoardSendDetails+'~'+player1+'~'+player2
				openAddressbookForSlotForced(playingSlot)
				
			}else{
				pvp[config.application.pvpFunction](onBoardSendDetails+'~'+player1+'~'+player2)
			}
			
			
			
			//setNewAlphabets()
		}
		//alert("Word Accepted")
	}
	//setNewAlphabets()	
}

function CheckIndividuals(onBoard,position){
	
		var flag = 0
		var words = ""
		classes = $('#'+onBoard).attr("class").split(/\s/)
		z = classes[classes.length - 1]
		z = z.substring(2)
		number = Number(z)
		firstWord = String.fromCharCode(64+number)
		words = words + firstWord
		//alert(words)
	//Check Individual Letters
	//for(i=0;i<onBoard.length;i++){
		//alert(onBoard.length)
//		var words
		var xPos = parseInt(onBoard.split("-")[1])
		//alert(xPos)
		var yPos = parseInt(onBoard.split("-")[2])
		//alert(yPos)
		
		if(position == "H" || position === "One"){
		//DownCheck
		for(j=xPos+1; j<15; j++){
			startPos = "b-"+j+"-"+yPos			
			classes = $('#'+startPos).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			//alert("D--"+z.indexOf("nm"))
			if(z.indexOf("nm")>=0){
			z = z.substring(2)
			number = Number(z)

			words = words + String.fromCharCode(64+number)
			//alert(words)
			}
			else{
				break;	
			}
		}
		
		//UpCheck
		for(j=xPos-1; j>=0; j--){
			startPos = "b-"+j+"-"+yPos			
			classes = $('#'+startPos).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			//alert("U--"+z.indexOf("nm"))
			if(z.indexOf("nm")>=0){
			z = z.substring(2)
			number = Number(z)

			words = String.fromCharCode(64+number) + words
			//alert(words)
			}
			else{
				break;	
			}
		}
		
		//alert(words)
		var alphabet2 = words.substr(0,1)
		if(words.length>1){
			if(dictionary[alphabet2.toLowerCase()].indexOf(words.toLowerCase())<0){
				flag=1
			}
		}
		else{
			flag=2
		}
		
	}
		//alert(word)
		//alert(alphabet1+" --- "+word)
		//alert(dictionary[alphabet1].indexOf(word))
		//if(dictionary[alphabet2.toLowerCase()].indexOf(words.toLowerCase())>=0){
			//words = firstWord
	else if(position == "V" || position === "One"){	
			//RightCheck
			for(j=yPos+1; j<15; j++){
				startPos = "b-"+xPos+"-"+j			
				classes = $('#'+startPos).attr("class").split(/\s/);
				z = classes[classes.length - 1];
				if(z.indexOf("nm")>=0){
				z = z.substring(2)
				number = Number(z)

				words = words + String.fromCharCode(64+number)
				//alert(words)
				}
				else{
					break;	
				}
			}
			
			//LeftCheck
			for(j=yPos-1; j>=0; j--){
				startPos = "b-"+xPos+"-"+j			
				classes = $('#'+startPos).attr("class").split(/\s/);
				z = classes[classes.length - 1];
				if(z.indexOf("nm")>=0){
				z = z.substring(2)
				number = Number(z)

				words = String.fromCharCode(64+number) + words
				//alert(words)
				}
				else{
					break;	
				}
			}
			//}
			//alert(words)
			alphabet2 = words.substr(0,1)
		
			//alert(word)
			//alert(alphabet1+" --- "+word)
			//alert(dictionary[alphabet1].indexOf(word))
			if(words.length>1){
				if(dictionary[alphabet2.toLowerCase()].indexOf(words.toLowerCase())<0){
					flag=1
				}
			}
			else{
			flag=2
		}
	}
		
	return flag	
}


function CalculateScoreH(vPos,vVal){
	var Flag = 0
	//var alphaArr = []
	for(i=0;i<vPos.length;i++){
		classes = $('#'+vPos[i]).attr("class").split(/\s/);
		var startClass = vPos[i]
		var startClassVal = vVal[i]
		var hPos = vPos[i].split("-")[1]
		var start = parseInt(vPos[i].split("-")[2])
		//RightCheck
		for(j=start+1; j<15; j++){
			startPos = "b-"+hPos+"-"+j			
			classes = $('#'+startPos).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			if(z.indexOf("nm")>=0){
				Flag = 1
				//alphaArr.push(startPos)
				scoreCalculate(classes[0],classes[1])
			}
			else{
				break;	
			}
		}
		
		//LeftCheck
		for(j=start-1; j>=0; j--){
			startPos = "b-"+hPos+"-"+j			
			classes = $('#'+startPos).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			if(z.indexOf("nm")>=0){
				Flag = 1
				//alphaArr.push(startPos)
				scoreCalculate(classes[0],classes[1])
			}
			else{
				break;	
			}
		}
		
		if(Flag == 1){
			Flag = 0
			scoreCalculate(startClass,startClassVal)
		}
		
		/*if(alphaArr.length>0){
			checkOtherAlphaScore(alphaArr,"DONE")
		}*/
		
		//alphaArr = []
	}
}

function CalculateScoreV(hPos,hVal){
	//var alphaArr = []
	var Flag = 0
	for(i=0;i<hPos.length;i++){
		classes = $('#'+hPos[i]).attr("class").split(/\s/);
		var startClass = hPos[i]
		var startClassVal = hVal[i]
		var vPos = hPos[i].split("-")[2]
		var start = parseInt(hPos[i].split("-")[1])
		//DownCheck
		for(j=start+1; j<15; j++){
			startPos = "b-"+j+"-"+vPos			
			classes = $('#'+startPos).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			if(z.indexOf("nm")>=0){
				Flag = 1
				//alphaArr.push(startPos)
				scoreCalculate(classes[0],classes[1])
			}
			else{
				break;	
			}
		}
		
		//UpCheck
		for(j=start-1; j>=0; j--){
			startPos = "b-"+j+"-"+vPos			
			classes = $('#'+startPos).attr("class").split(/\s/);
			z = classes[classes.length - 1];
			//alert("U--"+z.indexOf("nm"))
			if(z.indexOf("nm")>=0){
				Flag = 1
				//alphaArr.push(startPos)
				scoreCalculate(classes[0],classes[1])
			}
			else{
				break;	
			}
		}
		
		if(Flag == 1){
			Flag = 0
			scoreCalculate(startClass,startClassVal)
		}
		
		/*if(alphaArr.length>0){
			checkOtherAlphaScore(alphaArr,"One")
		}*/
		
		//alphaArr = []
	}
}



function checkOtherAlphaScore(restPos,pos,restPosVal){
	if(pos=="One"){
		CalculateScoreH(restPos,restPosVal)
	}
	if(pos=="DONE"){
		CalculateScoreV(restPos,restPosVal)
	}
}




var tW = 0
var dW = 0

function scoreCalculate(theClass,theValueClass){
	
	var theValue = theValueClass.substring(2);
	
	playerScore = Number(playerScore) + Number(alphabetPoint[theValue])
	
	if(theClass == "boxDL"){
		playerScore = Number(playerScore) + Number(alphabetPoint[theValue])
	}
	if(theClass == "boxTL"){
		playerScore = Number(playerScore) + (Number(alphabetPoint[theValue])) + (Number(alphabetPoint[theValue]))
	}
	if(theClass == "boxTW"){
		tW++
	}
	if(theClass == "boxDW"){
		dW++
	}
}

function checkPlayerScore2(playerScore2){
	if(dW>0){
		for(i=0;i<dW;i++){
			playerScore2 = Number(playerScore2) * 2
		}
	}
	if(tW>0){
		for(i=0;i<tW;i++){
			playerScore2 = Number(playerScore2) * 3
		}
	}
	return playerScore2
}


function setNewAlphabets(){
		
	$('.boxDrag').each(function(){

		if($('#'+this.id).css("opacity") === '0')
		{
			var randomAlphabets2 = new RandomList(alphabets);

			m2 = 'm'+alphabets[randomAlphabets2.getItem().rand]

			var classes2 = $('a#'+this.id).attr("class").split(/\s/);

			$('#'+this.id).removeClass(classes2[classes2.length - 1])
			
			$('#'+this.id).addClass(m2)
			
			$('#'+this.id).css("opacity") === '1'	
		}
		drag.reset(this);		
	})
}

function shufflePressed(){
	for(i = 1;i<8;i++){
		var cls = $('a#k'+i).attr("class").split(/\s/)[2];
		$('a#k'+i).removeClass(cls)
		if(i==7){
			$('a#k1').addClass(cls)
		}
		else{
			$('a#k'+(i+1)).addClass(cls)
		}
	}
}


function disableAll(){
	$('#btnShuffle').removeAttr('onclick');
	$('#btnYes').removeAttr('onclick');
	$('#btnPass').removeAttr('onclick');
	$('#btnSwap').removeAttr('onclick');
}

function enableAll(){	
	$('#btnShuffle').attr('onclick','shufflePressed()');
	$('#btnYes').attr('onclick','yesPressed()');
	$('#btnPass').attr('onclick','passPressed()');
	$('#btnSwap').attr('onclick','drawSwapOption()');
}

function hideAll(){
	
	$('#moveDiv').hide();
	$('#btnShuffle').hide();
	$('#btnYes').hide();
	$('#btnPass').hide();
	$('#btnSwap').hide();
	$('#lblWaiting').show();
}

function showAll(){
	$('#moveDiv').show();
	$('#btnShuffle').show();
	$('#btnYes').show();
	$('#btnPass').show();
	$('#btnSwap').show();
	$('#lblWaiting').hide();
}


function disableDraggingFor(element) {
  // this works for FireFox and WebKit in future according to http://help.dottoro.com/lhqsqbtn.php
  $('.bimg').draggable = false;
  // this works for older web layout engines
  $('.bimg').onmousedown = function(event) {
                event.preventDefault();
                return false;
              };
}

function showScoreBoard1(allMoves){
	
	//$('.current').append('<div id="loadinginprogress">Loading...</div>');
	/*for (var i = 0; i < maxEmptySquares;i++){
		emptySquares.push(randomSquares.getSquare().rand)
	}*/
	
	showGameBoardResponse()
/*
	var html = '<br><br>';
	html += '<div id="wL" class="winnerLoser ">'
	html += '<a href="javascript:showGameBoardResponse()"><img src="img/icon.png" width="57" height="57" /></a>'	
	html += '</div>'
	html += '<br>'
	

	//html += '<div class="ad"></div>'



	//$('#game').html(html)
	//$('#game').addClass('bg')
	$('#game').html(html)*/
       
}

function isMyTurnAlert(allMoves){
	var whoCanMove = Math.round(allMoves.length/2)%2
	if (whoCanMove != iAm){
		alert("0 you can start a new game now")
		return 0
	}
	else if (!isEven(allMoves.length)){
		alert("1 opponent did not play the game")
		return 1
	}
	else if (isEven(allMoves.length)){
		alert("2 now you play game")
		return 2
	}
	//return 2
}

function showScoreBoard2(allMoves){
	
	//$('.current').append('<div id="loadinginprogress">Loading...</div>');
	/*for (var i = 0; i < maxEmptySquares;i++){
		emptySquares.push(randomSquares.getSquare().rand)
	}*/

	var html = '<br><br>';
	html += '<div id="wL" class="winnerLoser ">'
	html += '<a href="javascript:showGameBoardResponse()"><img src="img/AvatarBlack.png" width="57" height="57" /></a>'	
	html += '</div>'
	html += '<br>'
	

	//html += '<div class="ad"></div>'



	//$('#game').html(html)
	//$('#game').addClass('bg')
	$('#game').html(html)
       
}

function validateBoard(){

	if(filledBoxes >= 81){	
			stopTimer()
			showScoreBoard2();
			pvp.makeMove(boardId+","+emptySquares.join('.')+","+seconds)
	}
}
function stopTimer() {
				clearInterval(action);
				alert(minutes+":"+seconds)
				minutes = 0
				seconds = 0
}


function isEven (someNumber){
    return (someNumber%2 == 0) ? true : false;
};


function isMyTurn(allMoves){
	var whoCanMove = Math.round(allMoves.length/2)%2
	if (whoCanMove != iAm)
		return 0
	else if (!isEven(allMoves.length))
		return 1
	else if (isEven(allMoves.length))
		return 2
	//return 2
}

var nIAm = '0'

var wMoved = '1'


function displayOldMoves(moves, wcm){
	
	var allMoves = moves.split('|')	
	//console.log("isMyTurn"+isMyTurn(allMoves))
	//console.log("wcm"+wcm)
	//console.log("iAm"+iAm)
	
	if(iAm == '1'){
		nIAm = '1'
	}
	else{
		nIAm = '0'
	}
	
	if(allMoves.length>1){
		wMoved = allMoves[allMoves.length-2][0]
	}
	
	for (var a=0; a< allMoves.length-1; a++){
		var move  = allMoves[a]
		//console.log(allMoves[a])
		
		myMakeAMove(move)
	}
	
	if(wMoved==nIAm){
		//$('.current').append('<div id="loadinginprogress">Waiting...</div>');
		hideAll();
	}
}



var originalPosition;
var currentChoice


function myMakeAMove(message){
	var msg = message.split(",")
	//console.log(msg)
	
	var player1ScoreNew = msg[msg.length-1].split("~")[1]
	var player2ScoreNew = msg[msg.length-1].split("~")[2]
	msg[msg.length-1] = msg[msg.length-1].split("~")[0]
	
	//console.log('msg:- '+msg.length)
	//console.log(msg[2])
	
	
	$("#player1Score").html(player1ScoreNew)
	$("#player2Score").html(player2ScoreNew)
	
	if(msg[0]==='0' || msg[0]==='1'){
		for(i=1;i<msg.length-1;i+=2){
			$('#'+msg[i]).addClass(msg[i+1])
		}
	}
	else{
		for(i=0;i<msg.length-1;i+=2){
			$('#'+msg[i]).addClass(msg[i+1])
		}
	}
	
	setNewAlphabets()
}

function passPressed(){
	disableAll();
	$('.current').append('<div id="loadinginprogress">Waiting...</div>');
	var pass = "pass"
	pvp.makeMove(pass);
}


function makeAMove(message){
	if(message != "pass"){
		
		$('#loadinginprogress').remove()
		$('#loadinginprogress').remove()
		
		//enableAll();
		showAll();
		
		var msg = message.split(",")
		console.log(msg)
		
		var player1ScoreNew = msg[msg.length-1].split("~")[1]
		var player2ScoreNew = msg[msg.length-1].split("~")[2]
		msg[msg.length-1] = msg[msg.length-1].split("~")[0]
		
		console.log('msg:- '+msg.length)
		console.log(msg[2])
		
		
		$("#player1Score").html(player1ScoreNew)
		$("#player2Score").html(player2ScoreNew)
		
		if(msg[0]==='0' || msg[0]==='1'){
			for(i=1;i<msg.length-1;i+=2){
				$('#'+msg[i]).addClass(msg[i+1])
			}
		}
		else{
			for(i=0;i<msg.length-1;i+=2){
				$('#'+msg[i]).addClass(msg[i+1])
			}
		}
	}
	if(message == "pass"){
		
		$('#loadinginprogress').remove()
	}
	
	setNewAlphabets()
	
}

var casles

var a = 0

var zoom = 0
var zoomClicked = 0

var toggleFlag = '0'

var clickedPlace = '';
var msX = 0;
var msY = 0;
var lastTouch = 0



function checkClickedPlace(mouseY,mouseX){
	clickedPlace = '';
				
	if(mouseX<=4){
		if(mouseY<=4){
			clickedPlace += "left top";
		}
		else if(mouseY>4 && mouseY<=9){
			clickedPlace += "left center";
			msX = 0;
			msY = 225;
		}
		else if(mouseY>9){
			clickedPlace += "left bottom";
			msX = 0;
			msY = 300;
		}
	}
	else if(mouseX>4 && mouseX<=9){
		if(mouseY<=4){
			clickedPlace += "center top";
			msX = 240;
			msY = 0;
		}
		else if(mouseY>4 && mouseY<=9){
			clickedPlace += "center";
			msX = 240;
			msY = 225;
		}
		else if(mouseY>9){
			clickedPlace += "center bottom";
			msX = 240;
			msY = 300;
		}
	}
	else if(mouseX>9){
		if(mouseY<=4){
			clickedPlace += "right top";
			msX = 320;
			msY = 0;
		}
		else if(mouseY>4 && mouseY<=9){
			clickedPlace += "right center";
			msX = 320;
			msY = 225;
		}
		else if(mouseY>9){
			clickedPlace += "right bottom";
			msX = 320;
			msY = 300;
		}
	}
}


function drawBoard(){
	
	var html ='<div style="width:320px; height:480px">';
	

html+='<div style="width:320px; height:50px">';
html+='<p id="time">Time</p>';
html+='<p id="score">Score</p>';
html+='</div>';
html+='<div style="width: 320px; height: 50px;">';

html+='<p id="str" style="background-color: #3F3; font-weight: normal; font-family: Arial Black, Gadget, sans-serif; font-size: 24px; color: #F0C; text-align: center; text-transform: uppercase">';

html+='Text</p>';

html+='</div>';

html+='<div>';
html+='<table id="tb" width="320px" border="3" >';
  html+='<tr>';
    html+='<td id="t11" class="tbldata" align="center" ><img id="r1c1" class="bimg" draggable="false" ></td>';
   html+= '<td id="t12" class="tbldata" align="center" ><img id="r1c2" class="bimg" draggable="false" ></td>';
    html+='<td id="t13" class="tbldata" align="center" ><img id="r1c3" class="bimg" draggable="false" ></td>';
    html+='<td id="t14" class="tbldata" align="center" ><img id="r1c4" class="bimg" draggable="false" ></td>';
  html+='</tr>';
  html+='<tr>';
    html+='<td id="t21" class="tbldata" align="center" ><img id="r2c1" class="bimg" draggable="false" ></td>';
    html+='<td id="t22" class="tbldata" align="center" ><img id="r2c2" class="bimg" draggable="false" ></td>';
    html+='<td id="t23" class="tbldata" align="center" ><img id="r2c3" class="bimg" draggable="false" ></td>';
    html+='<td id="t24" class="tbldata" align="center" ><img id="r2c4" class="bimg" draggable="false" ></td>';
  html+='</tr>';
   html+='<tr>';
    html+='<td id="t31" class="tbldata" align="center" ><img id="r3c1" class="bimg" draggable="false" > </td>';
    html+='<td id="t32" class="tbldata" align="center" ><img id="r3c2" class="bimg" draggable="false" > </td>';
    html+='<td id="t33" class="tbldata" align="center" ><img id="r3c3" class="bimg" draggable="false" ></td>';
    html+='<td id="t34" class="tbldata" align="center" ><img id="r3c4" class="bimg" draggable="false" ></td>';
  html+='</tr>';
  html+='<tr>';
    html+='<td id="t41" class="tbldata" align="center" ><img id="r4c1" class="bimg" draggable="false" ></td>';
    html+='<td id="t42" class="tbldata" align="center" ><img id="r4c2" class="bimg" draggable="false" ></td>';
    html+='<td id="t43" class="tbldata" align="center" ><img id="r4c3" class="bimg" draggable="false" ></td>';
    html+='<td id="t44" class="tbldata" align="center" ><img id="r4c4" class="bimg" draggable="false" ></td>';
  html+='</tr>';
html+='</table>';
html+='</div>';
html+='</div>';
	
	//window.onload(disableDraggingFor('bimg'));
	
	$('#game').html(html)
	
}

function drawNewBoard(){
	
	//setDictionary()
	
	drawBoard();
	
	var images = new Array('img/A.png', 'img/B.png', 'img/C.png', 'img/D.png', 'img/E.png', 'img/F.png', 'img/G.png', 'img/H.png','img/I.png','img/J.png','img/K.png','img/L.png','img/M.png','img/N.png','img/O.png','img/P.png','img/Q.png','img/R.png','img/S.png','img/T.png','img/U.png','img/V.png','img/W.png','img/X.png','img/Y.png','img/Z.png');
  var l = images.length;
  var rnd11 = Math.floor(l*Math.random());  var rnd12 = Math.floor(l*Math.random());  var rnd13 = Math.floor(l*Math.random());  var rnd14 = Math.floor(l*Math.random());  
  var rnd21 = Math.floor(l*Math.random());  var rnd22 = Math.floor(l*Math.random());  var rnd23 = Math.floor(l*Math.random());  var rnd24 = Math.floor(l*Math.random());
  var rnd31 = Math.floor(l*Math.random());  var rnd32 = Math.floor(l*Math.random());  var rnd33 = Math.floor(l*Math.random());  var rnd34 = Math.floor(l*Math.random());
  var rnd41 = Math.floor(l*Math.random());  var rnd42 = Math.floor(l*Math.random());  var rnd43 = Math.floor(l*Math.random());  var rnd44 = Math.floor(l*Math.random());
  
  $('#r1c1').attr('src',images[rnd11]);  $('#r1c2').attr('src',images[rnd12]);  $('#r1c3').attr('src',images[rnd13]);  $('#r1c4').attr('src',images[rnd14]);
  $('#r2c1').attr('src',images[rnd21]);  $('#r2c2').attr('src',images[rnd22]);  $('#r2c3').attr('src',images[rnd23]);  $('#r2c4').attr('src',images[rnd24]);  
  $('#r3c1').attr('src',images[rnd31]);  $('#r3c2').attr('src',images[rnd32]);  $('#r3c3').attr('src',images[rnd33]);  $('#r3c4').attr('src',images[rnd34]);
  $('#r4c1').attr('src',images[rnd41]);  $('#r4c2').attr('src',images[rnd42]);  $('#r4c3').attr('src',images[rnd43]);  $('#r4c4').attr('src',images[rnd44]);  
  
  
  var chk=false;
  var st="";
  var tblgb="";
  movement();
  
	function movement(){
	  $('.tbldata').on('mousedown',function(e){
		  		   
		console.log('mousedown WORKS');
		tblgb=e.currentTarget.id;
		var stt=e.currentTarget.innerHTML;
		st=stt.charAt(55);
		$('#str').text(st);
		
		  chk=true;

		  
	  });
	  
	  $('.tbldata').on('mouseup', function(e){
			  console.log('mousedown WORKS');
			  
			  chk=false;
			  $('.tbldata').attr('bgcolor',"");
			  st="";
			  
			  
		  });	
			  
	  $('.tbldata').on('mousemove',function(e){
		  //console.log("whats going onnnnnnnnnn!!!!! "+this.id)
		
		console.log('mousemove WORKS');
		//e.preventDefault();
	
		//	var key = selectKey(touch);
			
			//	console.log('move '+key)
				if(chk)
			  {
				 
			
			 $('#'+e.currentTarget.id).attr('bgcolor','#FF0000');
			// console.log('move '+e.srcElement.offsetParent.id)
					
				  				  console.log('gb '+tblgb);
								  console.log('id '+e.currentTarget.id);
							  
											  
				 	if (tblgb != e.currentTarget.id )
					{
						tblgb = e.currentTarget.id;
						var stt=e.currentTarget.innerHTML;
						st+=stt.charAt(55);
						$('#str').text(st);
				
					$('#score').text('left '+e.currentTarget.offsetLeft+ " top " + e.currentTarget.offsetTop)
				  
					}
				}
          
			  	  
		});	
    		
	}
  
  /*function selectKey(e) {
	//e.preventDefault();
    var keys = $('.bimg');
	//console.log("pageX "+e.pageX+"pageY "+e.pageY)
	//canvas
    for(var i = 0; i < keys.length; i++) {
		//console.log(keys[i].id);
		k = keys[i].id
        var offset = $('#'+k).offset()
        if((e.pageX >= offset.left && e.pageX <= offset.left + offset.width) &&
            (e.pageY >= offset.top && e.pageY <= offset.top + offset.height)) {
				
				$('#time').text("left "+offset.left+"top "+offset.top)
				$('#score').text(" e.pageX "+e.pageX+" e.pageY "+e.pageY)
				
				return keys[i]
        }
    }
    return null;
	
}*/
  
}

// For ZOOMING THE BOARD////////////////////////////////////////


/*function OnScrollDiv() {
		var info = document.getElementById ("visibleBoard");
		mX = info.scrollLeft;
		mY = info.scrollTop;
	}*/


function tableAnimate(mX,mY,cP){
	if(zoom == 0){
				zoom = 1;
				$('.boardTbl').css("-webkit-transform-origin",cP);

				$('.board').css("overflow","scroll");

				$('.boardTbl').animate({
				  scale: 2
				}, 500, 'ease', function (){
					$('.boardTbl').css("-webkit-transform-origin","left top");
					if(cP != "left top"){
						scrollAnimate(mX,mY)
					}					
				});				
	}
	else{
		if(cP != "left top"){
			scrollAnimate(-mX,-mY)
		}
		zoom = 0;
		$('.boardTbl').css("-webkit-transform-origin",cP);
		$('.boardTbl').animate({
		  scale: 1
		}, 500, 'ease');
		$('.board').css("overflow","hidden");
	}
}

function scrollAnimate(mX,mY){
	var resize = 200; // resize amount in percentage
	var origH  = 300;  // original image height
	var origW  = 320; // original image width
	var newH   = origH * (resize / 100);
	var newW   = origW * (resize / 100);
	
	if(zoom == 1){
		var myCont = document.getElementById ("visibleBoard");
		myCont.scrollLeft = (mX * (resize / 100)) - (newW / 2); 
		//Number(mX);/s/-520;
		myCont.scrollTop = (mY * (resize / 100)) - (newH / 2);
		//Number(mY);//-60;
	}
	/*else{
		var myCont = document.getElementById ("visibleBoard");
		myCont.scrollLeft = myCont.left;
		myCont.scrollTop = myCont.top;
	}*/
}

function zoomClick(mX,mY,cP){
	tableAnimate(mX,mY,cP);		
}


function swapCancel(){
	
	$('.boxDrag').each(function(){

		if($('#'+this.id).data("refObj2") == 'swapBucket')
		{			
			$('#'+this.id).css("opacity","1")
			
			var idNum = (this.id).substring(1);

			$("#mD-"+idNum).append(this);
			
			$('#'+this.id).data("refObj","")
			$('#'+this.id).data("refObj2","")	
			
			drag.reset(this);
		}

				
	})
	
	$('#swapDiv').remove();
	enableAll();
}

function swapPressed(){
	enableAll();
	$('.boxDrag').each(function(){

		if($('#'+this.id).data("refObj2") == 'swapBucket')
		{
			
			var randomAlphabets2 = new RandomList(alphabets);

			m2 = 'm'+alphabets[randomAlphabets2.getItem().rand]

			var classes2 = $('#'+this.id).attr("class").split(/\s/);

			$('#'+this.id).removeClass(classes2[classes2.length - 1])
			
			$('#'+this.id).addClass(m2)
			
			$('#'+this.id).css("opacity","1")
			
			var idNum = (this.id).substring(1);

			$("#mD-"+idNum).append(this);
			
			$('#'+this.id).data("refObj","")
			$('#'+this.id).data("refObj2","")	
			
			drag.reset(this);
		}

				
	})
	
	$('#swapDiv').remove();
}


function drawSwapOption(){
	disableAll();
	var newHtml = '';

	newHtml += '<div id="swapDiv" class="keySwap">'
	
	newHtml += '<div id="swapTiles" class="swappingTiles">'
	//newHtml += '<a class="boxSwapFor1" id="swapBucket-1"></a>'
	for (var i = 1; i < 8; i++){
		newHtml += '<a class="boxSwap" id="swapBucket-'+i+'"></a>'
	}

	newHtml += '</div>'
	
	newHtml += '<div style="float:left;margin-top:2px;margin-left:10px" id="btnSwapOk" onclick="swapPressed()"><img src="img/swap_swap_ovwe.png" width="70" height="23" /></div>'
	newHtml += '<div style="float:right;margin-top:2px;margin-right:10px" id="btnSwapCancel" onclick="swapCancel()"><img src="img/swap_cancel_over.png" width="70" height="23" /></div>'
	newHtml += '</div>'
	
	$('.current').append(newHtml);
	
	//$("#swapDiv").animate({scale:1.3, originX:0, originY:0 },0)
	
	$('.boxSwap').each(function(){
		drop.set(this);
	});
}

function drawBonusAlphabets(){
	var newHtml2 = '';
	newHtml2 += '<div id="bonusAlphaDiv" class="bonusAlpha">'
	newHtml2 += '<div id="innerBonusAlphaDiv" class="innerBonusAlpha">'
	for (var i = 1; i < 27; i++){
		newHtml2 += '<div id="bonusAlpha-'+i+'" class="bonusEach m'+i+'"></div>'
	}
	
	newHtml2 += '</div>'
	newHtml2 += '</div>'
	
	$('.current').append(newHtml2);
	$("#bonusAlphaDiv").animate({scale:1.3, originX:0, originY:0 },0)
	$('.bonusEach').click(function(){
		var bonusClass = 'n'+$('#'+this.id).attr("class").split(/\s/)[1];
		selectedClass = bonusClass;
		boxInfo.addClass(bonusClass);
		$('#bonusAlphaDiv').remove();
	});
}

function btnBonusNoPressed(){
	console.log(boxInfo);
	$('#bonusAlphaDiv').remove();
}

var boxInfo = ''
var selectedClass = ''


function drawRequiredLetters(){
	var m
	k = 1
	$('.boxDrag').each(function(){
		var randomAlphabets3 = new RandomList(alphabets);
		var test = randomAlphabets3.getItem().rand
		m =	'm'+alphabets[test]
		$('a#k'+k).addClass(m)
		k++			
	})
}

var alphaOnBoard = false;

function dragDrop(){
	
	drawRequiredLetters()
	
	$('.boxDrag').each(function(){
            drag.set(this, {
                start: function(){
					
					var c = (this).id
					var classes = $('#'+c).attr("class").split(/\s/);
                    var z = 'n'+classes[classes.length - 1];
							
							if(z!="nm27"){
								$('#'+$('#'+c).data('refObj')).removeClass(z)
							}
							else{
								$('#'+$('#'+c).data('refObj')).removeClass(selectedClass)
							}
							
							$('#'+c).removeClass(classes[0]).removeClass(classes[1]).removeClass(classes[2]);
							classes[1] = "bD"											
							$('#'+c).addClass(classes[0]).addClass(classes[1]).addClass(classes[2]);
							//$('#'+c).css("opacity","1")
							$('#'+c).data('refObj',"")
							
							var idNum = c.substring(1);
							onBoardAlphabets[idNum] = "U"		
							
							$("#mD-"+idNum).append(this);
							//$('#'+c).css("opacity","1")
							//drag.reset(this);
                },
                move: function(hits){
					var c = (this).id
					$('#'+c).css("opacity","1")
                },
                drop: function(hits){					
                    if(hits.length) {
						var c = (this).id
						
						var o = $(rect.closest(hits, this))
						
						//alert(o[0].id)
						if(o[0].id.split('-')[0] == "b" && zoomClicked == 0){
							mouseY = Number(o[0].id.split('-')[1]);
							mouseX = Number(o[0].id.split('-')[2]);
							checkClickedPlace(mouseY,mouseX)
							zoomClicked = 1;			
							zoomClick(msX,msY,clickedPlace);
						}
						
						var classes = $('#'+c).attr("class").split(/\s/);
						var idClasses
						
						var offset = $("#"+o[0].id).offset();

						var offset2 = $("#"+c).offset();
						
						if((o[0].id).split("-")[0]=="swapBucket"){
							
							$("#"+o[0].id).append(this);						
							$('#'+c).data('refObj',o[0].id)
							$('#'+c).data('refObj2',(o[0].id).split("-")[0])
							
							idClasses = $('#'+o[0].id).attr("class").split(/\s/);
								
								if(idClasses[idClasses.length - 1].indexOf("nm")<0){
									
									
									
									var z = 'n'+classes[classes.length - 1];
									
									if($('#'+c).css("opacity") === '1')
									{												
										$('#'+c).css("opacity","0")
										if(z != "nm27"){
											o.addClass(z)
										}
										else{
											boxInfo = o;
											drawBonusAlphabets();
										}
										//onBoardAlphabets[c.substring(1)] = o[0].id
										
										$('#'+c).css('top', 'inherit');
										$('#'+c).css('left', 'inherit');
										/*$('#'+c).removeClass(classes[0]).removeClass(classes[1]).removeClass(classes[2]);
										classes[1] = "bD2"											
										$('#'+c).addClass(classes[0]).addClass(classes[1]).addClass(classes[2]);*/
									}
								}
						}
						
						
						//(o[0].id).split("-")[0]=="k" || o[0].id == "moveDiv"
						
						if(((o[0].id)=="k-keyDiv" || o[0].id == "moveDiv") && (o[0].id).split("-")[0]!="swapBucket"){
																	
							drag.reset(this);
						}
						
						if((o[0].id).split("-")[0]!="swapBucket"){
						if($('#'+c).css("opacity") === '0')
						{					
							var z = 'n'+classes[classes.length - 1];
							
							if(z!="nm27"){
								$('#'+$('#'+c).data('refObj')).removeClass(z)
							}
							else{
								$('#'+$('#'+c).data('refObj')).removeClass(selectedClass)
							}
							
							$('#'+c).removeClass(classes[0]).removeClass(classes[1]).removeClass(classes[2]);
							classes[1] = "bD"											
							$('#'+c).addClass(classes[0]).addClass(classes[1]).addClass(classes[2]);
							$('#'+c).css("opacity","1")
							$('#'+c).data('refObj',"")
							
							var idNum = c.substring(1);
							onBoardAlphabets[idNum] = "U"		
							
							$("#mD-"+idNum).append(this);
							//drag.reset('a#'+c2);					
						}
						else{
						
							if((o[0].id).split("-")[0]!="swapBucket" && (o[0].id).split("-")[0]!="k" && o[0].id != "moveDiv"){
								
								idClasses = $('#'+o[0].id).attr("class").split(/\s/);
								
								if(idClasses[idClasses.length - 1].indexOf("nm")<0){
		
									var z = 'n'+classes[classes.length - 1];
									
									if($('#'+c).css("opacity") === '1')
									{												
										$('#'+c).css("opacity","0")
										$('#'+c).data('refObj',o[0].id)
										$('#'+c).data('refObj2',"onBoard")
										if(z != "nm27"){
											o.addClass(z)
										}
										else{
											boxInfo = o;
											drawBonusAlphabets();
										}
										onBoardAlphabets[c.substring(1)] = o[0].id
										$("#"+o[0].id).append(this);
										$('#'+c).css('top', 'inherit');
										$('#'+c).css('left', 'inherit');
										$('#'+c).removeClass(classes[0]).removeClass(classes[1]).removeClass(classes[2]);
										classes[1] = "bD2"											
										$('#'+c).addClass(classes[0]).addClass(classes[1]).addClass(classes[2]);
									}
									else{
										//$('a#'+c).css("opacity","1")
										//o.removeClass(z)
									}
								}
							}
						}
						
						}
					} else {
						drag.reset(this);
					}
                }

            });

        });

        // set dropables		
		
		$('.key').each(function(){
            drop.set(this);
        });
		
		$('#moveDiv').each(function(){
            drop.set(this);
        });
		
        $('.box').each(function(){
            drop.set(this);
        });
		
		$('.boxTW').each(function(){
            drop.set(this);
        });
		
		$('.boxDW').each(function(){
            drop.set(this);
        });
		
		$('.boxTL').each(function(){
            drop.set(this);
        });
		
		$('.boxDL').each(function(){
            drop.set(this);
        });
		
		$('.boxSP').each(function(){
            drop.set(this);
        });
		
		$('#swapBucket').each(function(){
            drop.set(this);
        });
}


var dictionary = []
var dloaded=0
var NumberOfAlphabets = 26
var shouldLoadGame = false

function setDictionary(){
	console.log("Time1: "+(new Date()).getTime())
	for(i=0;i<NumberOfAlphabets;i++){
		dBName = String.fromCharCode(65+i)+' Words.csv'
		//alert(dBName)
		
		$.get("Dictionary/"+dBName, function(data){
			
			//console.log("Time1: "+(new Date()).getTime())
			dloaded++
			var a = data.split('\n')
			
			//console.log("Time1: "+(new Date()).getTime())
			var letter = a[0].substr(0,1)
			//alert(letter)
			
			dictionary[letter] = a
			//console.log(a.length)
			
			//console.log("Time2: "+(new Date()).getTime())
			//var r = Math.floor(Math.random() * a.length)
			//console.log("Find : "+ a[r] + " " +dictionary[letter].indexOf(a[r]))
			//console.log("Time2: "+(new Date()).getTime())
			
			loadGameIfNeeded()
				
			
		})

	}
}

//	alert(dictionary.a[0])

function loadGameIfNeeded(){
	if (dloaded == NumberOfAlphabets)
		console.log("Time2: "+(new Date()).getTime())
	if(dloaded == NumberOfAlphabets && shouldLoadGame){	
		shouldLoadGame = false
		showGameBoardResponseNew()
	}
}

//setDictionary()

function showGameBoardResponseNew(){
	//$('.current').append('<div id="loadinginprogress">Loading...</div>');
	if(filledBoxes > 0)
		filledBoxes = 0
	//setDictionary();
	drawBoard();
	//onBoardAlphabets = [];
	//startTimer()
	//drawRequiredLetters();
	dragDrop();
}

function showGameBoardResponse(){
	shouldLoadGame = true
	loadGameIfNeeded()
		
}