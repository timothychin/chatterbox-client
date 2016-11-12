// YOUR CODE HERE:

var app = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.init = function() {
  app.fetch();
};

app.send = function(message) {
  var user;
  // create username, message, roomname
  $.ajax({
    url: app.server,
    data: JSON.stringify(message), 
    type: 'POST',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
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

app.renderMessage = function(message) {
  for (var i = 0; i < message.results.length; i++) {  
    var chat = $('<p class="username"></p>');
    // var main = $('<p class="username"></p>');
    chat.text(message.results[i].username + ': ' + message.results[i].text);
    $('#chats').append(chat);
  }
  // main.text(message.username);
  // $('#main').append(main);
};

app.renderRoom = function(room) {
  var newRoom = $('<div>' + room + '</div>');
  $('#roomSelect').append(newRoom);
};

app.handleUsernameClick = function() {

};

app.handleSubmit = function() {

};


$(document).on('click', '.username', function() {
  app.handleUsernameClick();
});

$(document).on('submit', '#send .submit', function() {
  app.handleSubmit();
  console.log('hmmph');
});

app.init();
