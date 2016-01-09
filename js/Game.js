var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
  create: function() {

    this.player;
    this.platforms;
    this.cursors;

    this.stars;
    this.score = 0;
    this.scoreText;
    this.level = 1;

    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    //  The score
    this.scoreText = this.game.add.text(16, 16, '' + this.game.world.width /2  + " / 352 ", { fontSize: '32px', fill: '#fff' });

    this.loadLevel(this.level);

    //  Our controls.
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.rkey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    this.rkey.onDown.add(this.restart, this);
  },

  update: function() {

    this.player.body.velocity.x = 60;
    this.player2.body.velocity.x = -60;

    //  Collide the player and the stars with the platforms
    this.game.physics.arcade.collide(this.players, this.blockedLayer);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.game.physics.arcade.overlap(this.player, this.player2, this.clearLevel, null, this);

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown)
    {
        if (this.player.body.blocked.down) {
           this.player.body.velocity.y = -100;
        }
        if (this.player2.body.blocked.down) {
            this.player2.body.velocity.y = -100;
        }
        console.log("1:" + this.player.x + " / " + this.player.y);
        console.log("2:" + this.player2.x + " / " + this.player2.y);
    }

  },
  distanceBetweenTwoPoints: function(a, b) {
        var xs = b.x - a.x;
        xs = xs * xs;

        var ys = b.y - a.y;
        ys = ys * ys;

        return Math.sqrt(xs + ys);
    },
  clearLevel : function(player, player2) {
    
    //  Add and update the score

    /*
    if (this.distanceBetweenTwoPoints(player, this.goal) < 8 && 
        this.distanceBetweenTwoPoints(player2, this.goal) < 8) {
 */
    if (Math.abs(player.y - this.goal.y) < 8 && Math.abs(player2.y - this.goal.y)) {
        this.level += 1;
        if (this.level == 4) {
            this.scoreText.text = "Great work. The Twins salute you. Game over";
            this.game.paused = true;
        }
        else {
            this.loadLevel(this.level);
        }
    }

  },


loadLevel : function(levelName) {

    if (this.map) {    
        this.map.destroy();
        this.player.destroy();
        this.player2.destroy();
        this.players.destroy();
        this.blockedLayer.destroy();
    }
    this.map = this.game.add.tilemap("level" + levelName);
    
    this.map.addTilesetImage('sheet16', 'tiles');

    this.blockedLayer = this.map.createLayer('Tile Layer 1');
    this.map.setCollisionBetween(1, 10000, true, 'Tile Layer 1');

    this.blockedLayer.resizeWorld();

    // The player and its settings
    this.players = this.game.add.group();
    this.player = this.game.add.sprite(8, this.game.world.height - 72, 'dude');
    this.player2 = this.game.add.sprite(this.game.world.width - 24, this.game.world.height - 72, 'dude');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(this.player);
    this.game.physics.arcade.enable(this.player2);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
this.player.anchor.setTo(0.5);
    this.player.scale.setTo(-0.4, 0.4);

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player2.body.bounce.y = 0.2;
    this.player2.body.gravity.y = 300;
    this.player2.scale.setTo(0.4);

    this.players.add(this.player);
    this.players.add(this.player2);

    //  Our two animations, walking left and right.
    this.player2.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player2.animations.add('right', [5, 6, 7, 8], 10, true);

    this.goal = {};
   if (levelName == '1') {
        this.scoreText.text = "Meet your twin at the summit! \nClick up to jump and R to restart level!";   
        this.goal.y = 352;

        this.goal.x = this.game.world.width /2 ;    

    }
    else if (levelName == '2') {
        this.scoreText.text = "Good work. Next mountain! ";
         this.goal.y = 352 - 32;

        this.goal.x = this.game.world.width /2 ;    

    }
    else if (levelName == '3') {
        this.scoreText.text = "Awesome. Final mountain! ";
         this.goal.y = 352 - 16*6;

        this.goal.x = this.game.world.width /2 ;    

    }
  },

  restart : function() {
    this.loadLevel(this.level);
  }
};
