const images = [
    "Grace_Jones.png",
    "John_McClane.png",
    "LionO.png",
    "Madonna.png",
    "Michael_Jackson.png",
    "Mr_T.png",
    "ninja_turtle.png",
    "Prince.png",
    "Rainbow_Brite.png",
    "She_Ra.png",
    "Snake_Plissken.png",
    "Terminator.png"
    ]

class Player {
    constructor(socketId, playerName, playerNumber) {
        this.socketId = socketId;
        this.playerName = playerName;
        this.playerNum = playerNumber;
        this.avatar = images[Math.floor(Math.random() * images.length)]        
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