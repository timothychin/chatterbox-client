// YOUR CODE HERE:

console.log('app is running');

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
  // debugger;
  for (var i = 0; i < message.results.length; i++) {  
    var filteredUser = app.filterInput(message.results[i].username);
    var filteredText = app.filterInput(message.results[i].text);
    var filteredRoom = app.filterInput(message.results[i].roomname);
    // debugger;
    // console.log(filteredText);
    if (rooms.indexOf(filteredRoom) === -1) {
      rooms.push(filteredRoom);
      app.renderRoom(filteredRoom);
    }
    if (filteredRoom === $('select').val()) {
      var chat = $('<p class="username" id="chat">' + '<a href="#" class="clickUser">' + filteredUser + '</a>' + ': ' + filteredText + '</p>');
      if (app.friends.hasOwnProperty(filteredUser)) {
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
  var input = {}; 
  var user = window.location.search.split('username=');
  user = user[1];
  input.username = app.filterInput(user);
  input.text = app.filterInput($('#message').val());
  if ($('#roomName').val()) {
    app.renderRoom($('#roomName').val());
    input.roomname = app.filterInput($('#roomName').val());
    app.clearMessages();
  } else {
    input.roomname = app.filterInput($('#roomName').val());
  }
  app.send(input);
};

app.filterInput = function(string) {
  // debugger;
  if (typeof string !== 'string') {
    string = '';
  }
  var filter = {
    '<': '&lt;',
    '>': '&gt;',
    '$': '&#36;',
    '"': '&quot;',
    "'": '&#39'
  };
  var filteredString = '';
  for (var i = 0; i < string.length; i++) {
    if (filter.hasOwnProperty(string[i])) {
      filteredString += filter[string[i]];
    } else {
      filteredString += string[i];
    }
  }
  return filteredString;
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
