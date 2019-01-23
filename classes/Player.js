class Player {
    constructor(socketId, playerName) {
        this.socketId = socketId;
        this.playerName = playerName;
        this.hand = [];
        this.playerTotal = 0;
        this.playerTotalAlt = 0;
        this.gameMsg = "";
        this.bet = 0;
        this.chips = 100;
        this.powers = [];
    }
}

module.exports = Player;