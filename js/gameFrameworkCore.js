function goto(label){
    label = '#'+label;
	jQT.goTo(label,'slideleft');
    $(label).append('<div class="ad"></div>');
}
function initGameView(){
	pvp.getMoves(function (moves, lastMove){
			/*if(lastMove.who == 1)
				myMove = true*/
			displayOldMoves(moves,lastMove.who)
		})
	goto('gameview')
}function opponentName() {
    if(iAm == 0 && slots) {
        return slots[playingSlot].name;
    } else {
        return 'My Friend'
    }
}
function playerName() {
    return 'Me';
}