(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _statesGameState = require('states/GameState');

var _statesGameState2 = _interopRequireDefault(_statesGameState);

var _statesGameOver = require('states/GameOver');

var _statesGameOver2 = _interopRequireDefault(_statesGameOver);

var Game = (function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		_get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, 800, 600, Phaser.AUTO, 'content', null);
		this.state.add('GameState', _statesGameState2['default'], false);
		this.state.add('GameOver', _statesGameOver2['default'], false);
		this.state.start('GameState');
	}

	return Game;
})(Phaser.Game);

new Game();

},{"states/GameOver":7,"states/GameState":8}],2:[function(require,module,exports){
/**
 Copyright (c) 2015 Belahcen Marwane (b.marwane@gmail.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

'use strict';

var HealthBar = function HealthBar(game, providedConfig) {
    this.game = game;

    this.setupConfiguration(providedConfig);
    this.setPosition(this.config.x, this.config.y);
    this.drawBackground();
    this.drawHealthBar();
    this.setFixedToCamera(this.config.isFixedToCamera);
};
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.setupConfiguration = function (providedConfig) {
    this.config = this.mergeWithDefaultConfiguration(providedConfig);
    this.flipped = this.config.flipped;
};

HealthBar.prototype.mergeWithDefaultConfiguration = function (newConfig) {
    var defaultConfig = {
        width: 250,
        height: 40,
        x: 0,
        y: 0,
        bg: {
            color: '#651828'
        },
        bar: {
            color: '#FEFF03'
        },
        animationDuration: 200,
        flipped: false,
        isFixedToCamera: false
    };

    return mergeObjetcs(defaultConfig, newConfig);
};

function mergeObjetcs(targetObj, newObj) {
    for (var p in newObj) {
        try {
            targetObj[p] = newObj[p].constructor == Object ? mergeObjetcs(targetObj[p], newObj[p]) : newObj[p];
        } catch (e) {
            targetObj[p] = newObj[p];
        }
    }
    return targetObj;
}

HealthBar.prototype.drawBackground = function () {

    var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
    bmd.ctx.fillStyle = this.config.bg.color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.config.width, this.config.height);
    bmd.ctx.fill();

    this.bgSprite = this.game.add.sprite(this.x, this.y, bmd);
    this.bgSprite.anchor.set(0.5);

    if (this.flipped) {
        this.bgSprite.scale.x = -1;
    }
};

HealthBar.prototype.drawHealthBar = function () {
    var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
    bmd.ctx.fillStyle = this.config.bar.color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.config.width, this.config.height);
    bmd.ctx.fill();

    this.barSprite = this.game.add.sprite(this.x - this.bgSprite.width / 2, this.y, bmd);
    this.barSprite.anchor.y = 0.5;

    if (this.flipped) {
        this.barSprite.scale.x = -1;
    }
};

HealthBar.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;

    if (this.bgSprite !== undefined && this.barSprite !== undefined) {
        this.bgSprite.position.x = x;
        this.bgSprite.position.y = y;

        this.barSprite.position.x = x - this.config.width / 2;
        this.barSprite.position.y = y;
    }
};

HealthBar.prototype.setPercent = function (newValue) {
    if (newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;

    var newWidth = newValue * this.config.width / 100;

    this.setWidth(newWidth);
};

HealthBar.prototype.setWidth = function (newWidth) {
    if (this.flipped) {
        newWidth = -1 * newWidth;
    }
    this.game.add.tween(this.barSprite).to({ width: newWidth }, this.config.animationDuration, Phaser.Easing.Linear.None, true);
};

HealthBar.prototype.setFixedToCamera = function (fixedToCamera) {
    this.bgSprite.fixedToCamera = fixedToCamera;
    this.barSprite.fixedToCamera = fixedToCamera;
};

module.exports = HealthBar;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _PlayerCorpse = require('./PlayerCorpse');

var _PlayerCorpse2 = _interopRequireDefault(_PlayerCorpse);

var Player = (function (_Phaser$Sprite) {
  _inherits(Player, _Phaser$Sprite);

  function Player(gameState, game, x, y) {
    _classCallCheck(this, Player);

    _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, game, x, y, 'dude');
    this.name = 'Player';

    this.scale = { x: 0.6, y: 0.6 };
    this.gameState = gameState;

    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.initialPosition = {
      x: x,
      y: y
    };
    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(118.66 * 0.6 + 20, 128 * 0.6, 5, 16);
    this.anchor.setTo(.5, 0);

    this.animations.add('seppucku', [6, 0], 10, false);
    this.animations.add('walk', [1, 2], 10, true);
    this.animations.add('stop', [1], 5, true);
    this.animations.add('jump', [5], 20, true);
    this.animations.add('attack', [6, 7], 10, false);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.attackButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.seppuckuButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

    // console.log('(Phaser.Keyboard ', Object.keys(Phaser.Keyboard));

    this.direction = 1;
    this.jumpTimer = 0;
    this.corpses = [];
    this.isJumping = false;
    this.animations.play('stop');
    this.health = 100;
  }

  _createClass(Player, [{
    key: 'setCurrentEnemy',
    value: function setCurrentEnemy(sprite) {
      this.currentEnemy = sprite;
    }
  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      var almostGrounded = this.body.onFloor() || 0.2 > Math.abs(this.body.deltaY());
      var canJump = almostGrounded && this.game.time.now > this.jumpTimer;

      this.body.velocity.x = 0;
      var cursors = this.cursors;
      var jumpButton = this.jumpButton;

      if (this.animations.currentAnim.name === 'seppucku' && this.animations.currentAnim.isPlaying) {
        return;
      }
      if (this.seppuckuButton.isDown && !!!this.justSeppukued) {
        (function () {
          console.log('seppucku!!');
          _this.justSeppukued = true;
          var that = _this;
          setTimeout(function () {
            that.justSeppukued = false;
          }, 1000);
          _this.body.velocity.x = 0;
          _this.animations.play('seppucku');
          var pos = _this.body.position;
          _this.corpses.push(new _PlayerCorpse2['default'](_this, _this.game, pos.x, pos.y - 15, 'dude'));
          _this.x = _this.initialPosition.x;
          _this.y = _this.initialPosition.y;
        })();
      }

      if (this.attackButton.isDown && !!!this.justAttacked) {
        (function () {
          _this.justAttacked = true;
          _this.body.velocity.x = 0;
          // this.body.velocity.y = 0
          _this.animations.play('attack');
          if (!!_this.currentEnemy) _this.currentEnemy.damage(50);
          var that = _this;
          setTimeout(function () {
            that.justAttacked = false;
          }, 200);
        })();
      }
      if (this.animations.currentAnim.name === 'attack' && this.animations.currentAnim.isPlaying) {
        return;
      }
      if (cursors.left.isDown || cursors.right.isDown) {
        var d = cursors.right.isDown ? 1 : -1;
        this.direction = d;
        this.scale.x = d * Math.abs(this.scale.x);
        this.body.velocity.x = d * 150;

        if (!this.isJumping) this.animations.play('walk');
      } else {
        if (!this.isJumping) {
          this.animations.stop();
          this.animations.play('stop');
        }
      }

      if (canJump) this.isJumping = false;
      if (jumpButton.isDown && canJump) {
        this.body.velocity.y = -180;
        this.jumpTimer = this.game.time.now + 1750;
        this.isJumping = true;
        // this.animations.stop();
        this.animations.play('jump');
        console.log('jump anim');
      }

      this.currentEnemy = undefined;
    }
  }]);

  return Player;
})(Phaser.Sprite);

exports['default'] = Player;
module.exports = exports['default'];

},{"./PlayerCorpse":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerCorpse = (function (_Phaser$Sprite) {
  _inherits(PlayerCorpse, _Phaser$Sprite);

  function PlayerCorpse(player, game, x, y, resource) {
    _classCallCheck(this, PlayerCorpse);

    _get(Object.getPrototypeOf(PlayerCorpse.prototype), 'constructor', this).call(this, game, x, y, resource);
    this.scale = _extends({}, player.scale);
    // this.scale.x = player.scale.x;
    // this.scale.y = player.scale.y;
    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(42, 50, 5, 16);

    // console.log('(Phaser.Keyboard ', Object.keys(Phaser.Keyboard));

    this.facing = 'left';
    this.jumpTimer = 0;
    this.frame = 0;
    this.lifespan = 10000;
  }

  _createClass(PlayerCorpse, [{
    key: 'fade',
    value: function fade() {
      var n = this.lifespan / 10000;
      this.alpha = n;
    }
  }, {
    key: 'update',
    value: function update() {
      // if (this.lifespan > 0) {
      //   this.fade();
      // }
      this.body.velocity.x = 0;
    }
  }]);

  return PlayerCorpse;
})(Phaser.Sprite);

exports['default'] = PlayerCorpse;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stalker = (function (_Phaser$Sprite) {
  _inherits(Stalker, _Phaser$Sprite);

  function Stalker(stage, game, x, y) {
    _classCallCheck(this, Stalker);

    _get(Object.getPrototypeOf(Stalker.prototype), 'constructor', this).call(this, game, x, y, 'skull');
    this.scale = { x: 2, y: 2 };
    this.gameState = stage;
    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.immovable = true;
    this.body.bounce.y = 0.0;
    this.body.collideWorldBounds = true;
    this.direction = 1;
    this.startingPosition = x;
    this.range = 200;
    this.justTurned = false;
    this.anchor.setTo(.5, 0.5);
    this.agility = 5;
    this.state = 'idle';

    this.scale.y = 0.5;
    this.scale.x = 0.5;

    this.animations.add('die', [114, 115, 116, 117, 118, 119, 120, 121], 10, false);
    this.animations.add('attack', [44, 45, 46, 47, 48, 46, 45], this.agility * 2, false);
    this.animations.add('idle', [0, 1, 2], this.agility, true);
    this.animations.add('walk', [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], this.agility * 2, true);

    this.health = 50;

    this.damageSound = this.game.add.audio('damage_stalker');
    this.deathSound = this.game.add.audio('death_stalker');
    this.attackSound = this.game.add.audio('punch');
  }

  _createClass(Stalker, [{
    key: 'damage',
    value: function damage(dam) {
      var _this = this;

      if (this.state !== 'dead' && this.health - dam <= 0) {
        (function () {
          _this.body.velocity.x = 0;
          _this.animations.play('die');
          _this.state = 'dead';
          var that = _this;
          _this.deathSound.play();
          setTimeout(function () {
            that.kill();
          }, 1000);
        })();
      } else {
        _get(Object.getPrototypeOf(Stalker.prototype), 'damage', this).call(this, dam);
        this.damageSound.play();
        //const that = this;
        //this.punchSound.onDecoded.add(function() {that.punchSound.play();});
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      if (this.state != 'dead') {
        if (Math.abs(this.gameState.gameObjects.player.x - this.x) < this.range && Math.abs(this.gameState.gameObjects.player.y - this.y) < 100) {
          //in range and same vertical position
          this.direction = (this.gameState.gameObjects.player.x - this.x) / Math.abs(this.gameState.gameObjects.player.x - this.x);
          this.state = 'following';
        } else {
          this.state = 'idle';
        }

        this.game.physics.arcade.collide(this, this.gameState.gameObjects.player, function (spriteA, player) {
          player.setCurrentEnemy(_this2);
          if (Math.abs(_this2.gameState.gameObjects.player.y - _this2.y) < 100) //same vertical position
            _this2.state = 'attacking';
        }, null, this);

        switch (this.state) {
          case 'idle':
            this.body.velocity.x = 0;
            this.animations.play('idle');
            break;
          case 'following':
            this.scale.x = this.direction * Math.abs(this.scale.x);
            this.body.velocity.x = this.direction * 10 * this.agility;
            this.animations.play('walk');
            break;
          case 'attacking':
            if (!this.justAttacked) {
              (function () {
                _this2.justAttacked = true;
                _this2.body.velocity.x = 0;
                var that = _this2;
                setTimeout(function () {
                  that.animations.play('attack');
                  setTimeout(function () {
                    if (that.game.physics.arcade.distanceBetween(that, that.gameState.gameObjects.player) < 100) {
                      that.gameState.gameObjects.player.damage(20);
                      that.attackSound.play();
                    }
                  }, 200);
                  setTimeout(function () {
                    that.justAttacked = false;
                  }, 500); //cool down
                }, 300); //reaction time
              })();
            }
            break;
        }
      }
    }
  }]);

  return Stalker;
})(Phaser.Sprite);

exports['default'] = Stalker;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Zombie = (function (_Phaser$Sprite) {
  _inherits(Zombie, _Phaser$Sprite);

  function Zombie(gamestate, game, x, y) {
    _classCallCheck(this, Zombie);

    _get(Object.getPrototypeOf(Zombie.prototype), 'constructor', this).call(this, game, x, y, 'monster');
    this.scale = { x: 2, y: 2 };
    this.gameState = gamestate;
    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.immovable = true;
    this.body.bounce.y = 0.0;
    this.body.collideWorldBounds = true;
    this.direction = 1;
    this.startingPosition = x;
    this.range = 80;
    this.justTurned = false;
    this.anchor.setTo(.5, 0.5);
    this.agility = 1;
    this.state = 'roaming';

    this.scale.y = 0.5;
    this.scale.x = 0.5;

    this.animations.add('die', [114, 115, 116, 117, 118, 119, 120, 121], 10, false);
    this.animations.add('attack', [44, 45, 46, 47, 48, 46, 45], this.agility * 10, false);
    this.animations.add('walk', [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], this.agility * 10, true);

    this.health = 100;

    this.damageSound = this.game.add.audio('damage_zombie');
    this.deathSound = this.game.add.audio('death_zombie');
    this.attackSound = this.game.add.audio('punch');
  }

  _createClass(Zombie, [{
    key: 'damage',
    value: function damage(dam) {
      var _this = this;

      if (this.state !== 'dead' && this.health - dam <= 0) {
        (function () {
          _this.body.velocity.x = 0;
          _this.animations.play('die');
          console.log("I'm dying");
          _this.state = 'dead';
          var that = _this;
          _this.deathSound.play();
          setTimeout(function () {
            that.kill();
          }, 1000);
        })();
      } else {
        _get(Object.getPrototypeOf(Zombie.prototype), 'damage', this).call(this, dam);
        this.damageSound.play();
        //const that = this;
        //this.punchSound.onDecoded.add(function() {that.punchSound.play();});
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      if (this.state != 'dead') {
        this.game.physics.arcade.collide(this, this.gameState.gameObjects.player, function (spriteA, player) {
          _this2.state = 'attacking';
          player.setCurrentEnemy(_this2);
          _this2.currentEnemy = player;
        }, null, this);

        if (!this.animations.currentAnim.isPlaying && this.animations.currentAnim.name === 'attack') {
          this.state = 'roaming';
        }

        switch (this.state) {
          case 'attacking':
            if (!this.justAttacked) {
              (function () {
                _this2.direction = (_this2.gameState.gameObjects.player.x - _this2.x) / Math.abs(_this2.gameState.gameObjects.player.x - _this2.x);
                _this2.scale.x = _this2.direction * Math.abs(_this2.scale.x);
                _this2.justAttacked = true;
                _this2.body.velocity.x = 0;
                var that = _this2;
                setTimeout(function () {
                  that.animations.play('attack');
                  setTimeout(function () {
                    if (that.game.physics.arcade.distanceBetween(that, that.gameState.gameObjects.player) < 100) {
                      that.attackSound.play();
                      that.gameState.gameObjects.player.damage(10);
                    }
                  }, 200);
                  setTimeout(function () {
                    that.justAttacked = false;
                  }, 1000); //cooldown
                }, 300); //reaction time
              })();
            }
            break;
          case 'roaming':
            if (Math.abs(this.x - this.startingPosition) > this.range / 2 && //out of the range
            this.direction * (this.x - this.startingPosition) > 0) //going in the wrong direction
              this.direction *= -1; //turn

            this.scale.x = this.direction * Math.abs(this.scale.x);
            this.body.velocity.x = this.direction * 10 * this.agility;
            this.animations.play('walk');
            break;
        }
        //this.currentEnemy = undefined;
      }
    }
  }]);

  return Zombie;
})(Phaser.Sprite);

exports['default'] = Zombie;
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameOver = (function (_Phaser$State) {
  _inherits(GameOver, _Phaser$State);

  function GameOver() {
    _classCallCheck(this, GameOver);

    _get(Object.getPrototypeOf(GameOver.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(GameOver, [{
    key: "init",
    value: function init(score) {
      // we don't have a score..
      this.score = score;
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "create",
    value: function create() {
      console.log('CREATE');
      window.camera = this.game.camera;
      var that = this;
      // this.game.camera.follow = null;
      // this.game.camera.x = 0;
      // this.game.camera.y = 0;
      var center = { x: this.game.camera.bounds.centerX, y: this.game.camera.bounds.centerY };
      var text1 = new Phaser.Text(this.game, center.x, center.y, "Game Over Cestil", { font: "45px Arial", fill: "#ff0044", align: "center" });

      var text2 = new Phaser.Text(this.game, center.x, center.y, "Restart", { font: "45px Arial", fill: "#ff0044", align: "center" });
      text2.inputEnabled = true;
      text2.events.onInputDown.add(function () {
        that.state.start('GameState', true);
        text1.destroy();
        text2.destroy();
      });

      this.game.stage.addChild(text1);
      this.game.stage.addChild(text2);
      text1.fixedToCamera = true;
      text1.anchor.set(0.5);
      console.log(this.game.camera);

      //
    }
  }]);

  return GameOver;
})(Phaser.State);

exports["default"] = GameOver;
module.exports = exports["default"];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectsPlayer = require('objects/Player');

var _objectsPlayer2 = _interopRequireDefault(_objectsPlayer);

var _objectsZombie = require('objects/Zombie');

var _objectsZombie2 = _interopRequireDefault(_objectsZombie);

var _objectsStalker = require('objects/Stalker');

var _objectsStalker2 = _interopRequireDefault(_objectsStalker);

var _objectsHealthBar = require('objects/HealthBar');

var _objectsHealthBar2 = _interopRequireDefault(_objectsHealthBar);

var GameState = (function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    _get(Object.getPrototypeOf(GameState.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(GameState, [{
    key: 'preload',
    value: function preload() {
      this.game.load.tilemap('thelevel', 'assets/thelevel.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('tiles-1', 'assets/tiles-1.png');
      this.game.load.image('min', 'assets/min.png');
      this.game.load.image('mininicular', 'assets/mininicular.png');

      this.game.load.image('sensor', 'assets/sensor.png');
      this.game.load.spritesheet('door', 'assets/door.png', 16, 64);
      this.game.load.spritesheet('dude', 'assets/samuraifinal.png', 118.66, 128, 9);
      this.game.load.spritesheet('droid', 'assets/droid.png', 32, 32);
      this.game.load.image('starSmall', 'assets/star.png');
      this.game.load.image('starBig', 'assets/star2.png');
      this.game.load.image('background', 'assets/background2.png');
      this.game.load.spritesheet('mummy', 'assets/mummy37x45.png', 37, 45, 25);
      this.game.load.spritesheet('monster', 'assets/monster128x128.png', 128, 128, 122);
      this.game.load.spritesheet('skull', 'assets/skull128x128.png', 128, 128, 122);
      this.game.load.audio('punch', 'assets/punch.wav');
      this.game.load.audio('damage_zombie', 'assets/painmonster.wav');
      this.game.load.audio('death_zombie', 'assets/deathmonster.wav');
      this.game.load.audio('damage_stalker', 'assets/painskull.wav');
      this.game.load.audio('death_stalker', 'assets/deathskull.wav');
      this.game.load.audio('sword', 'assets/sword.wav');
      this.game.load.audio('level_ost', 'assets/HeroImmortal.ogg');
    }
  }, {
    key: 'create',
    value: function create() {
      var ost = this.game.add.audio('level_ost');
      ost.play();
      ost.volume = 0.3;
      this.game.stage.backgroundColor = "#EFEFEF";
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      // this.game.stage.backgroundColor = '#000000';
      // this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');
      // this.background.fixedToCamera = true;

      this.map = this.game.add.tilemap('thelevel');
      this.map.addTilesetImage('mininicular');
      this.map.setCollisionByExclusion([48, 59, 50, 51, 52, 53, 54, 55]);
      // this.map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

      this.layer = this.map.createLayer('Tile Layer 1');
      // this.layer2 = this.map.createLayer('Tile Layer 2');

      // this.map.setTileIndexCallback([90], (sprite, tile) => {
      //   console.log('hit', {sprite, tile});
      // }, null, this.layer2);
      //
      //Un-comment this on to see the collision tiles
      // this.layer.debug = true;

      this.layer.resizeWorld();

      this.game.physics.arcade.gravity.y = 250;

      this.gameObjects = [];
      this.gameObjects['player'] = new _objectsPlayer2['default'](this, this.game, 32, 32);
      // this.gameObjects['stalker'] = new Stalker(this.game,300,40);
      // this.gameObjects['mummy'] = new Zombie(this.game,100,40);
      this.game.camera.follow(this.gameObjects['player']);

      this.gameObjects['player'].events.onKilled.addOnce(this.gameOver, this);

      var sensorsSpec = JSON.parse('[' + this.map.properties.sensors + ']');
      var game = this.game;

      this.sensors = [];
      var sensors = this.sensors;
      var g = this.game;
      var tileW = this.map.tileWidth;
      var tileH = this.map.tileHeight;
      sensorsSpec.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var _ref2$0 = _slicedToArray(_ref2[0], 2);

        var stx = _ref2$0[0];
        var sty = _ref2$0[1];

        var _ref2$1 = _slicedToArray(_ref2[1], 2);

        var dtx = _ref2$1[0];
        var dty = _ref2$1[1];

        var sensorSprite = game.add.sprite(stx * tileW, (1 + sty) * tileH, 'sensor');
        sensorSprite.anchor.y = 1;

        var doorSprite = game.add.sprite(dtx * tileW, (1 + dty) * tileH, 'door');
        doorSprite.anchor.y = 1;
        doorSprite.animations.add('open', [1]);
        doorSprite.animations.add('close', [0]);
        g.physics.arcade.enable(doorSprite);
        doorSprite.body.allowGravity = false;
        doorSprite.body.immovable = true;

        doorSprite.play('close');
        sensors.push({ sensorSprite: sensorSprite, doorSprite: doorSprite, hit: false });
      });

      var _map$addTilesetImage = this.map.addTilesetImage('min');

      var tileproperties = _map$addTilesetImage.tileproperties;

      this.loadEnemies(tileproperties, game, this.map);
      this.loadTriggers(tileproperties, game, this.map);

      this.healthBar = new _objectsHealthBar2['default'](this.game, { x: 220 });
      this.healthBar.setFixedToCamera(true);
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      this.game.state.start('GameOver');
    }
  }, {
    key: 'loadTriggers',
    value: function loadTriggers(tileproperties, game, map) {
      var _this = this;

      var game_state = this;
      var tileW = this.map.tileWidth;
      var tileH = this.map.tileHeight;
      var layer = map.createLayer('Triggers');
      layer.renderable = false;

      var triggers = {
        'exit': function exit(sprite, tile) {
          if (sprite.name === 'Player') {
            // congrats!
            console.log('exit door touched', { sprite: sprite, tile: tile });
            _this.gameOver();
          }
        }
      };

      var go = this.gameObjects;
      layer.layer.data.forEach(function (row, rowIdx) {
        row.forEach(function (tile, colIdx) {
          if (tile.index > -1 && tile.properties.type) {
            var key = tile.properties.type + '_' + rowIdx + ':' + colIdx;
            console.log('creating trigger', key);
            map.setTileLocationCallback(colIdx, rowIdx, 1, 1, triggers[tile.properties.type], game_state, game_state.layer);
          }
        });
      });
    }
  }, {
    key: 'loadEnemies',
    value: function loadEnemies(tileproperties, game, map) {
      var game_state = this;
      var tileW = this.map.tileWidth;
      var tileH = this.map.tileHeight;
      var layer = map.createLayer('Enemy');
      layer.renderable = false;

      var go = this.gameObjects;
      layer.layer.data.forEach(function (row, rowIdx) {
        row.forEach(function (tile, colIdx) {
          if (tile.index > -1) {
            if (tile.properties.type) {
              var key = tile.properties.type + '_' + rowIdx + ':' + colIdx;
              console.log('creating', key);
              switch (tile.properties.type) {
                case 'mummy':
                  go[key] = new _objectsZombie2['default'](game_state, game, colIdx * tileW, (rowIdx - 1) * tileH);
                  break;
                case 'stalker':
                  go[key] = new _objectsStalker2['default'](game_state, game, colIdx * tileW, (rowIdx - 1) * tileH);
                  break;
                default:
                  break;
              }
              go[key].name = key;
            }
          }
        });
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var game = this.game;
      var that = this;

      this.healthBar.setPercent(that.gameObjects.player.health);

      this.sensors.forEach(function (s) {
        var hit = that.gameObjects.player.overlap(s.sensorSprite);
        if (hit !== s.hit) {
          console.log('hit it: ' + hit);
          s.hit = hit;
          if (hit) {
            s.doorSprite.play('open');
          } else {
            s.doorSprite.play('close');
          }
        }
      });

      var sensors = this.sensors;
      var deleteSensors = [];
      this.gameObjects.player.corpses.forEach(function (corpse) {
        //corpses collisions
        game.physics.arcade.collide(corpse, that.layer);
        Object.keys(that.gameObjects).forEach(function (key) {
          game.physics.arcade.collide(corpse, that.gameObjects[key]);
        });
        that.gameObjects.player.corpses.forEach(function (otherCorpse) {
          if (corpse !== otherCorpse) {
            game.physics.arcade.collide(corpse, otherCorpse);
          }
        });
        sensors.forEach(function (sensor) {
          if (!sensor.hit) {
            var hit = corpse.overlap(sensor.sensorSprite);
            if (hit) {
              sensor.doorSprite.play('open');
              sensor.hit = true;
              deleteSensors.push(sensor);
            }
          }
        });
      });
      deleteSensors.forEach(function (s) {
        var idx = sensors.indexOf(s);
        sensors.splice(idx, 1);
      });

      Object.keys(this.gameObjects).forEach(function (key) {
        //console.log('update', key, that.gameObjects[key]);
        if (that.gameObjects[key].__cane) {
          console.log(key, that.gameObjects[key]);
        }
        game.physics.arcade.collide(that.gameObjects[key], that.layer);
        sensors.forEach(function (_ref3) {
          var doorSprite = _ref3.doorSprite;
          var hit = _ref3.hit;

          if (!hit) {
            game.physics.arcade.collide(that.gameObjects[key], doorSprite);
          }
        });
        //that.gameObjects[key].update(that);
      });
    }
  }]);

  return GameState;
})(Phaser.State);

exports['default'] = GameState;
module.exports = exports['default'];

},{"objects/HealthBar":2,"objects/Player":3,"objects/Stalker":5,"objects/Zombie":6}]},{},[1])
//# sourceMappingURL=game.js.map
