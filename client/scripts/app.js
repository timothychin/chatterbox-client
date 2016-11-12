//BROKEN CHAT
// YOUR CODE HERE:

var app = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.friends = {};

app.init = function() {
  app.fetch();
};

app.send = function(message) {
  $.ajax({
    url: app.server,
    data: JSON.stringify(message), 
    type: 'POST',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.fetch();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.fetch = function() {
  var messageReceived;
  $.ajax({
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    data: 'order=-createdAt',
    success: function (data) {
      messageReceived = data;
      app.renderMessage(messageReceived);
      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });
};
app.clearMessages = function() {
  $('#chats').children().remove();
};

app.clearRooms = function () {
  var currentRoom = $('select').val();
  var allRooms = $('select').children();
  for (var i = 0; i < allRooms.length; i++) {
    if (allRooms[i].value !== currentRoom) {
      allRooms[i].remove();
    }
  }
  // $('select').children().remove();
};


app.renderMessage = function(message) {
  var rooms = [];
  rooms.push($('select').children().val());
  for (var i = 0; i < message.results.length; i++) {  
    if (rooms.indexOf(message.results[i].roomname) === -1) {
      rooms.push(message.results[i].roomname);
      app.renderRoom(message.results[i].roomname);
    }
    if (message.results[i].roomname === $('select').val()) {
      var chat = $('<p class="username">' + '<a href="#" class="clickUser">' + message.results[i].username + '</a>' + ': ' + message.results[i].text + '</p>');
      if (app.friends.hasOwnProperty(message.results[i].username)) {
        chat.css('font-weight', 'bold');
      }
      // var main = $('<p class="username"></p>');
      // chat.text(message.results[i].username + ': ' + message.results[i].text);
      $('#chats').append(chat);
    }
  }
  // main.text(message.username);
  // $('#main').append(main);
};

app.renderRoom = function(room) {
  var newRoom = $('<option>' + room + '</option>');
  $('#roomSelect').append(newRoom);
};

app.handleUsernameClick = function(user) {
  app.friends[user] = user;
  // app.friends.push(user);
  app.clearMessages();
  app.clearRooms();
  app.fetch();
};

app.handleSubmit = function() {
  var user = window.location.search.split('username=');
  user = user[1];
  var input = {};
  input.username = user;
  input.text = $('#message').val();
  if ($('#roomName').val()) {
    app.renderRoom($('#roomName').val());
    input.roomname = $('#roomName').val();
    app.clearMessages();
  } else {
    input.roomname = $('select').val();  // || $('#roomName').val();
  }
  app.send(input);
};


// $(document).on('click', '.username', function() {
//   app.handleUsernameClick();
// });

$(document).on('click', '#send .submit', function() {
  app.handleSubmit();
});

$(document).on('change', 'select', function() {
  app.clearMessages();
  app.clearRooms();
  app.fetch();
});

$(document).on('click', '.clickUser', function() {
  // debugger;
  var thisUser = $(this)[0].textContent;
  console.log(thisUser);
  app.handleUsernameClick(thisUser);

});

app.init();
