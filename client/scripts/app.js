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
  $('#chats').html('<blink>' + message + '</blink>');
};

app.renderRoom = function(room) {
  var newRoom = $('<div>' + room + '</div>');
  $('#roomSelect').append(newRoom);
};

app.handleUsernameClick = function() {

};

app.handleUsernameClick.restore = function() {

};