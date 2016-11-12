// YOUR CODE HERE:
//https://api.parse.com/1/classes/messages;`  `

var app = {};

app.init = function() {

};

app.send = function(message) {
  $.ajax({
    data: JSON.stringify(message), 
    type: 'POST'
  });
};

app.fetch = function() {
  $.ajax({
    type: 'GET'
  });
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessage = function(message) {
  var chat = $('<p class="username"></p>');
  // var main = $('<p class="username"></p>');
  chat.text(message.username + ': ' + message.text);
  $('#chats').append(chat);

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
