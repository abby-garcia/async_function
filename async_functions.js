var MusicPlayer = function() {
    this.listeners = {};
};

MusicPlayer.prototype.on = function(eventName, listener) {
    if (!this.listeners.hasOwnProperty(eventName)) {
        this.listeners[eventName] = [listener];
    }
    else {
        this.listeners[eventName].push(listener);
    }
};

MusicPlayer.prototype.emit = function(eventName) {
    if (!this.listeners.hasOwnProperty(eventName)) {
        return;
    }

    var args = [];
    for (var i=1; i<arguments.length; i++) {
        args.push(arguments[i]);
    }

    this.listeners[eventName].forEach(function(listener){
        listener.apply(null, args);
    });
};

var player = new MusicPlayer();

player.on('start', function(artist, song) {
    console.log('Starting audio stream playin', artist, song);
});

player.on('stop', function() {
    console.log('Stopping audio stream');
});

player.on('start', function() {
    console.log('Updating UI to started state');
});

player.on('stop', function() {
    console.log('Updating UI to stopped state');
});

player.emit('start', 'Sleater Kinney', 'No Cities to Love');
player.emit('stop');








// Same as above BUT it was an Event Emitter

// When the EventEmitter object emits an event, all of the Functions attached to 
//that specific event are called synchronously. 
// Any values returned by the called listeners are ignored and will be discarded.


var events = require('events');

var player = new events.EventEmitter();

player.on('start', function(artist, song) {
    console.log('Starting audio stream playing', artist, song);
});

player.on('stop', function() {
    console.log('Stopping audio stream');
});

player.on('start', function() {
    console.log('Updating UI to started state');
});

player.on('stop', function() {
    console.log('Updating UI to stopped state');
});

player.emit('start', 'Sleater Kinney', 'No Cities to Love');
player.emit('stop');

// progress bar  with eventEmitter();

var events = require('events');

var progress = new events.EventEmitter();

progress.on('onStart', function() {
  console.log('Start!');  
});

progress.on('onProgress', function(number) {
  console.log('Your progress', number );  
});

progress.on('onEnd', function() {
  console.log('You\'re done');  
});

function start(){
    progress.emit('onStart');
    for(var i = 1; i <= 100; i++){
        if( i % 10 === 0){
            progress.emit('onProgress', i);
        }
    }
    
    progress.emit('onEnd');
    
}

start();

