const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 4000;
const axios = require('axios');

const socketio = require('socket.io');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
// app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/gamedb"
// );

// Adding Classes
const Player = require('./classes/Player')

// Global Variables
let player = {};
let players = [];

// Start the API server
const expressServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = socketio(expressServer);


// VARIABLES!!!!!
const cards = require('./cards.json')
let ready = 0;
let deck = [];
let dealerCards = [];
let dealerTotal = 0;
let dealerTotalAlt = 0;
let tableID = '';
let status = '';
let stay = 0;
let round = 0;

// FUNCTIONS!!!!!!
shuffle = (a) => {
  let k,
    t,
    i = a.length,
    rand = Math.random;

  // For each element in the array, swap it with a random
  // element (which might be itself)
  while (i--) {
    k = (rand() * (i + 1)) | 0;
    t = a[k];
    a[k] = a[i];
    a[i] = t;
  }
  return a;
}

// Function to shuffle deck
checkDeck = deck => {
  return deck.length < 10 ? deck.concat(shuffle(cards)) : deck;
};

// Function to draw cards
drawCards = (deck, playerCards, numberOfCards) => {
  var i;
  for (i = 1; i <= numberOfCards; i++) {
    let card = deck.pop();
    console.log('this is added')
    console.log(card.value)
    playerCards.push(card);
  }
  return playerCards;
};

// Calculates the values
calcCardTotal = (cards, eleven) => {
  let sum = Object.keys(cards).reduce(function (total, card) {
    let cardVal = Number(cards[card].cardValue);
    cardVal = cardVal === 1 && eleven ? 11 : cardVal;
    return Number(total) + cardVal;
  }, 0);
  return sum;
};

// Check if player bust
checkForBust = (t1, t2) => {
  console.log(t1)
  console.log(t2)

  let min = Math.min(t1, t2);

  console.log(min)

  if (min > 21) {
    status = "Over 21 - You Lose!!!";
  }
};

// Check if dealer bust agianst player
checkDealerStatus = (dealerCards, playerTotal) => {
  let t1,
    t2,
    status = "";

  t1 = this.calcCardTotal(dealerCards, false);
  t2 = this.calcCardTotal(dealerCards, true);

  if (Math.min(t1, t2) > 21 && playerTotal <= 21) {
    status = "You Win!!!";
  } else if (
    (t1 <= 21 && t1 === playerTotal) ||
    (t2 <= 21 && t2 === playerTotal)
  ) {
    status = "Tie";
  } else if (
    (t1 <= 21 && t1 > playerTotal) ||
    (t2 <= 21 && t2 > playerTotal)
  ) {
    status = "Dealer wins!!!";
  } else if (
    (t1 <= 21 && t1 < playerTotal) &&
    (t2 <= 21 && t2 < playerTotal) && (playerTotal <= 21)) {
    status = "You Win!!!";
  }

  return status;
};



// Connection with socket server
io.on('connection', socket => {

  socket.emit('MSG From Server', {
    message: `Welcome to the socketio server! Your SocketID: ${socket.id}`,
    socketid: socket.id
  });

  socket.on('MSG To Server', dataFromClient => {
    console.log(dataFromClient.message);
  });

  // Logining In
  socket.on('LOGIN', data => {

    if (data.playerName.length === 0) {
      return socket.emit('LOGIN_ERROR', 'Name is required.')
    }

    socket.join('Room 1', () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms); // [ <socket.id>, 'room 237' ]    
      io.to('Room 1').emit('ROOM_JOIN_SUCCESS', `${data.playerName} has joined the room`); // broadcast to everyone in the room
    });

    if (data.playerName === '/table') {
      console.log(data.playerName);
      tableID = data.playerID;
      socket.emit('LOGIN_SUCCESS', {
        table: true,
        playerName: data.playerName
      });
    }
    else {

      player = new Player(socket.id, data.playerName);

      players.push(player);

      socket.emit('LOGIN_SUCCESS', player);

      console.log(players);

      io.to('Room 1').emit('Number of Players', {
        numberOfPlayers: players.length,
        players: players
      })
    }
  })





  // ----------------------- GAME LOGIC -------------------------//
  // Player is ready
  socket.on('Player is ready', data => {
    ready += data.ready;

    for (var i = 0; i < players.length; i++) {
      if (players[i].socketId === data.playerID) {
        players[i].bet = data.bet
      }
    }

    // READY CHECK
    if (ready === players.length) {
      console.log("SHOULD BE WORKING")

      round += 1;

      deck = checkDeck(deck);

      // Deal Cards to players
      for (var i = 0; i < players.length; i++) {
        drawCards(deck, players[i].hand, 2)
      }

      // Deal Cards to dealer
      drawCards(deck, dealerCards, 2)

      // Tells everyone in room
      io.emit('Players are ready', {
        playersInGame: players,
        dealerCards: dealerCards
      })

      console.log('tableid: ' + tableID);

      // Tells the table only
      io.to(tableID).emit('Table Cards', {
        playersInGame: players,
        dealerCards: dealerCards
      })
    }
  })

  // Calculating Cards for each socket
  socket.on('Calc', data => { // both Aces doesnt work
    dealerTotal = calcCardTotal(dealerCards, false);
    dealerTotalAlt = calcCardTotal(dealerCards, true);
    let newPlayerTotal = calcCardTotal(data.playerCards, false);
    let newPlayerTotalAlt = calcCardTotal(data.playerCards, true);

    for (var i = 0; i < players.length; i++) {
      if (players[i].socketId === data.playerID) {
        players[i].playerTotal = newPlayerTotal;
        players[i].playerTotalAlt = newPlayerTotalAlt;
      }
    }

    // Tells everyone in room
    socket.emit('Player Calc', {
      playerID: data.playerID,
      dealerTotal: dealerTotal,
      dealerTotalAlt: dealerTotalAlt,
      playerTotal: newPlayerTotal,
      playerTotalAlt: newPlayerTotalAlt,
      playersInGame: players
    })

    // Tells the table only
    io.to(tableID).emit('Table Calc', {
      dealerTotal: dealerTotal,
      dealerTotalAlt: dealerTotalAlt,
      playersInGame: players
    })
  })

  // When a player hits
  socket.on('Player clicked hit', data => {
    console.log('Player has hit')

    for (var i = 0; i < players.length; i++) {
      if (players[i].socketId === data) {
        drawCards(deck, players[i].hand, 1);
      }
    }

    // Tells everyone in room
    socket.emit('Player has hit', {
      playerID: data,
      playersInGame: players
    })

    // Tells the table only
    io.to(tableID).emit('Table player hits', {
      playersInGame: players
    })
  })

  // Check if player bust
  socket.on('Check for bust', data => {
    console.log('LOKKK AY MEEEEE')
    console.log(players)

    for (var i = 0; i < players.length; i++) {
      if (players[i].socketId === data) {
        checkForBust(players[i].playerTotal, players[i].playerTotalAlt);
        players[i].gameMsg = status;
        if (players[i].gameMsg === 'Over 21 - You Lose!!!') {
          players[i].chips = players[i].chips - players[i].bet;
        }
      }
    }

    // Tells everyone in room
    socket.emit('Check player for busting', {
      playerID: data,
      playersInGame: players,
      status: status
    })

    // Tells the table only
    io.to(tableID).emit('Check table for busting', {
      playersInGame: players
    })

    status = '';
  })

  // Check bust after stay
  socket.on('Player clicked Stay', data => {
    console.log('Stay was clicked')

    stay += data.stay

    let playersLeft = 0;

    for (var i = 0; i < players.length; i++) {
      if (players[i].gameMsg === '') {
        playersLeft += 1
      }
    }

    console.log('Stay: ' + stay)
    console.log('Players Left: ' + playersLeft)

    // TWO ACES DONES'T WORK IT IS ALWAYS 2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
    if (stay === playersLeft) {
      let newDealerTotal = Math.max(dealerTotal, dealerTotalAlt);
      while (newDealerTotal < 17) {
        drawCards(deck, dealerCards, 1);
        dealerTotal = calcCardTotal(dealerCards, false);
        dealerTotalAlt = calcCardTotal(dealerCards, true);

        newDealerTotal = Math.max(dealerTotal, dealerTotalAlt);

        if (dealerTotalAlt > 21) {
          newDealerTotal = Math.min(dealerTotal, dealerTotalAlt);
        }
        console.log(newDealerTotal)
      }

      for (var i = 0; i < players.length; i++) {

        let newPlayerTotal = Math.max(players[i].playerTotal, players[i].playerTotalAlt)

        if (players[i].playerTotalAlt > 21) {
          newPlayerTotal = Math.min(players[i].playerTotal, players[i].playerTotalAlt)
        }

        if (Math.min(dealerTotal, dealerTotalAlt) > 21 && newPlayerTotal <= 21) {
          players[i].gameMsg = 'You Win!!!';
          players[i].chips = players[i].chips + (players[i].bet * 2);
        } else if (
          (dealerTotal <= 21 && dealerTotal === newPlayerTotal) ||
          (dealerTotalAlt <= 21 && dealerTotalAlt === newPlayerTotal)
        ) {
          players[i].gameMsg = 'Tie';
          players[i].chips = players[i].chips + players[i].bet;
        } else if (
          (dealerTotal <= 21 && dealerTotal > newPlayerTotal) ||
          (dealerTotalAlt <= 21 && dealerTotalAlt > newPlayerTotal)
        ) {
          players[i].gameMsg = 'Dealer wins!!!';
          players[i].chips = players[i].chips - players[i].bet;
        } else if (
          (dealerTotal <= 21 && dealerTotal < newPlayerTotal) &&
          (dealerTotalAlt <= 21 && dealerTotalAlt < newPlayerTotal) && (newPlayerTotal <= 21)
        ) {
          players[i].gameMsg = 'You Win!!!';
          players[i].chips = players[i].chips + (players[i].bet * 2);
        }

      }

      console.log('PLAYERSSSSSSS UPDATINGGGG')
      console.log(players)

      // Tells everyone in room
      io.emit('Check bust when player stays', {
        playersInGame: players
      })

      console.log('Dealer SHit')
      console.log(dealerCards);
      console.log(dealerTotal);
      console.log(dealerTotalAlt);

      console.log('platersssss')
      console.log(players)

      // Tells the table only
      io.to(tableID).emit('Check table bust when player stays', {
        dealerCards: dealerCards,
        dealerTotal: dealerTotal,
        dealerTotalAlt: dealerTotalAlt,
        playersInGame: players
      })
    }
  })

  // Reset Game (Coded for one player and if u win)
  socket.on('Reset Game', data => {
    console.log(data);

    let checkingStatus = 0;

    for (var i = 0; i < players.length; i++) {
      if (players[i].gameMsg === '') {
        checkingStatus += 1
      };
    }

    if (checkingStatus === 0) {

      // The reset
      ready = 0;
      deck = [];
      dealerCards = [];
      dealerTotal = 0;
      dealerTotalAlt = 0;
      stay = 0;

      for (var i = 0; i < players.length; i++) {
        players[i].gameMsg = '';
        players[i].bet = 0;
        players[i].playerTotal = 0;
        players[i].playerTotalAlt = 0;
        players[i].hand = [];
      }

      console.log('data reset');
      console.log(players);

      // I HAVE IT END AT THREE ROUNDS FOR TESTING CAN BE CHANGED LATER
      if (round < 3) {

        // INPUT MUSIC HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // MAYBE HAVE MUSIC PLAYED BY STATE

        // Delay for gameMsg and music
        delayForEffect = () => {
          setTimeout(() => {

            console.log('SURIPRSE MOTHER FUCKA!!!!!!')
            console.log('Round: ' + round)

            io.emit('Next Round', players)

            io.to(tableID).emit('Next Round Table', players)

          }, 3000);
        }

        delayForEffect();

      }
      else {

        console.log('End Of Game!!!!!!!!!!')

        // CODE FOR MULTIPLE WINNERS!!!!!!!!!!!!!!!!!!
        let topPlayerID;
        let topPlayer;
        let topPlayerValue;

        topPlayerValue = Math.max.apply(Math, players.map(function (player) { return player.chips; }))
        console.log('Top Player Value: ' + topPlayerValue)

        for (var i = 0; i < players.length; i++) {

          players[i].bet = 0;

          if (players[i].chips === topPlayerValue) {
            topPlayerID = players[i].socketId;
            topPlayer = players[i].playerName;
          }
          players[i].gameMsg = `GAME OVER \n WINNER: ${topPlayer} \n CHIPS: ${topPlayerValue}`;
        }

        console.log(topPlayer);

        // INPUT MUSIC HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // MAYBE HAVE MUSIC PLAYED BY STATE

        // INPUT MONGO-DB CODE HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // USE topPlayerID, topPlayer, topPlayerValue

        socket.emit('GAME OVER', players)

        delayForEffect2 = () => {
          setTimeout(() => {

            console.log('RESET THE WHOLE GAME')

            ready = 0;
            deck = [];
            dealerCards = [];
            dealerTotal = 0;
            dealerTotalAlt = 0;
            status = '';
            stay = 0;
            round = 0;
            player = {};
            players = [];

            io.emit('New Game', 'YOU SHOULD SEE ME')

            io.to(tableID).emit('New Game Table', 'YOU SHOULD SEE ME TOO')

          }, 3000);
        }

        delayForEffect2();
      }
    }
  })

  // Using powers
  socket.on('Use power', data => {

    let value;

    if (data.powerUsed === '+1') {
      value = 1;
    } else if (data.powerUsed === '+2') {
      value = 2;
    } else if (data.powerUsed === '+3') {
      value = 3;
    } else if (data.powerUsed === '+4') {
      value = 4;
    } else if (data.powerUsed === '+5') {
      value = 5;
    }

    console.log('Value: ' + value);

    for (var i = 0; i < players.length; i++) {
      if (players[i].socketId === data.playerID) {
        players[i].powers = data.powers;
        players[i].playerTotal = players[i].playerTotal + value;
        players[i].playerTotalAlt = players[i].playerTotalAlt + value;
      }
    }

    console.log('players')
    console.log(players)

    socket.emit('Player used power', players)
  })

  socket.on('disconnect', function () {
    console.log('SocketID: ' + socket.id + ' disconnected');
  });

})





