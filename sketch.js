// Libraries
fallback.load(
  {
    p5: [
      "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js",
      "lib/js/p5.min.js"
    ],
    "p5.SoundFile": [
      "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.sound.min.js",
      "lib/js/p5.sound.min.js"
    ],
    "p5.prototype.select": [
      "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/addons/p5.dom.min.js",
      "lib/js/p5.dom.min.js"
    ]
  },
  {
    shim: {
      "p5.SoundFile": ["p5"],
      "p5.prototype.select": ["p5"]
    }
  }
);

models = {};
fallback.load(
  {
    "models.Box": "models/box.js",
    "models.Ellipse": "models/round.js",
    "models.AnimatedSprite": "models/AnimatedSprite.js",
    "models.Player": "models/Player.js"
  },
  {
    shim: {
      "models.Player": ["models.AnimatedSprite"]
    }
  }
);
fallback.ready(startSketch);

let bird;
let ground;
let player;

function startSketch() {
  let gameWidth = 1920;
  let gameHeight = 1080;
  window.setup = function setup() {
    createCanvas(gameWidth, gameHeight);
    frameRate(60);
    bird = new models.Box(200, 200, 50, 80);
    ground = new models.Box(gameWidth / 2, gameHeight, gameWidth, 60);

    player = new models.Player(100, 200, 50, 80);
  };

  window.draw = function draw() {
    background(0);
    bird.show();
    ground.show();
    player.show();
  };

  ///
  window.keyPressed = function() {
    (this.keyPressed.events || []).forEach(e => e(...arguments));

    // for (let event of this.events) {
    //   event(...arguments);
    // }
  };

  // Don't actually need the __proto__ but I think I should keep it there...
  window.keyPressed.__proto__.addEvent = function(evtFn) {
    if (!this.events) {
      this.events = [];
    }
    if (typeof evtFn !== "function")
      throw Error(
        "Error registering keyPressed event: Passed argument is not a function"
      );

    this.events.push(evtFn);
  };

  window.keyPressed.__proto__.delEvent = function(evtFn) {
    if (!this.events) {
      this.events = [];
    } else {
      if (typeof evtFn !== "function")
        throw Error(
          "Error registering keyPressed event: Passed argument is not a function"
        );

      this.events = this.events.filter(val => val != evtFn);
    }
  };
  ///

  window.keyReleased = function() {
    (this.keyReleased.events || []).forEach(e => e(...arguments));
  };

  // Don't actually need the __proto__ but I think I should keep it there...
  window.keyReleased.__proto__.addEvent = function(evtFn) {
    if (!this.events) {
      this.events = [];
    }
    if (typeof evtFn !== "function")
      throw Error(
        "Error registering keyReleased event: Passed argument is not a function"
      );

    this.events.push(evtFn);
  };

  window.keyReleased.__proto__.delEvent = function(evtFn) {
    if (!this.events) {
      this.events = [];
    } else {
      if (typeof evtFn !== "function")
        throw Error(
          "Error registering keyReleased event: Passed argument is not a function"
        );

      this.events = this.events.filter(val => val != evtFn);
    }
  };
  ///
}
