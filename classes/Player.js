class Player {
    constructor(socketId, playerName, playerNumber) {
        this.socketId = socketId;
        this.playerName = playerName;
        this.playerNum = playerNumber;        
        this.hand = [];
        this.playerTotal = 0;
        this.playerTotalAlt = 0;
        this.gameMsg = "";
        this.bet = 0;
        this.chips = 10000;
        this.powers = [];
        this.powerStatus = false;
        this.powerUsed = [];
    }
}

module.exports = Player;