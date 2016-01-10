var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.load.image('sky', 'assets/sky_new.png');
    this.load.image('cloud', 'assets/cloud.png');


    this.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON); 
    this.load.tilemap('level2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level3', 'assets/level3.json', null, Phaser.Tilemap.TILED_JSON); 
    this.load.tilemap('level4', 'assets/level4.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level5', 'assets/level5.json', null, Phaser.Tilemap.TILED_JSON); 
    this.load.tilemap('level6', 'assets/level6.json', null, Phaser.Tilemap.TILED_JSON); 

    this.game.load.audio('music1', 'assets/twinspeak1.ogg');
    this.game.load.audio('music2', 'assets/twinspeak2.ogg');
    this.game.load.audio('music3', 'assets/twinspeak3.ogg');

    this.game.load.spritesheet('tiles', 'assets/sheet16.png', 16, 16, 7*7);

    this.load.image('title', 'assets/titlescreen.png');
    
  },
  create: function() {
    this.state.start('Title');
  }
};
