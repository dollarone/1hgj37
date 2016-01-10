var PlatformerGame = PlatformerGame || {};

PlatformerGame.Title = function(){};

//setting game configuration and loading the assets for the loading screen
PlatformerGame.Title.prototype = {
  create: function() {
    //loading screen will have a black background
    this.game.stage.backgroundColor = '#000';

    this.title = this.add.sprite(0, 0, 'title');
    //this.preloadBar.anchor.setTo(0.5);
    
    this.game.input.keyboard.addCallbacks(this, this.skip, null, null);
    this.pressed = false;

  },

  skip : function() {
    if (!this.pressed) {
        this.pressed = true;
        this.state.start('Game');
    }
  },

};