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
    "models.Player": "models/Player.js",
    "models.Image": "models/Image.js",
    "models.BackgroundParallax": "models/Background.js",
    gameMap: "map.js",
    "models.Camera": "models/Camera.js"
  },
  {
    shim: {
      "models.Player": ["models.AnimatedSprite"],
      "models.BackgroundParallax": ["models.Image"]
    }
  }
);
fallback.ready(startSketch);

let _ = {};

function startSketch() {
  _.game = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  window.setup = function setup() {
    frameRate(60);
    _.cameraCoverage = {
      x: 16,
      y: 9
    };

    _.cellLength = min(
      parseInt(_.game.width / _.cameraCoverage.x),
      parseInt(_.game.height / _.cameraCoverage.y)
    );

    _.screen = {
      width: _.cameraCoverage.x * _.cellLength,
      height: _.cameraCoverage.y * _.cellLength
    };

    createCanvas(_.screen.width, _.screen.height);

    _.rows = gameMap.length;
    _.cols = gameMap[0].length;
    if (_.cols < _.cameraCoverage.x || _.rows < _.cameraCoverage.y)
      throw Error(
        `Map not large enough: (${_.cols},${_.rows}) < (${_.cameraCoverage.x},${
          _.cameraCoverage.y
        })`
      );

    _.map = {
      width: _.cols * _.cellLength,
      height: _.rows * _.cellLength
    };

    _.playerScale = 1.5;

    console.log(_.rows, "x", _.cols);

    _.bird = new models.Box(200, 200, 50, 80);
    _.player = new models.Player(100, 200, 50, 80);

    _.background = new models.BackgroundParallax(
      "bg/841032800_preview_Snow 4.png"
    );

    {
      let camera = new models.Camera(_.player.getX, _.player.getY);
      camera.updateMap(_.map.width, _.map.height);
      camera.updateScreen(_.screen.width, _.screen.height);
      _.camera = camera;
    }
  };

  let z = 0;
  window.draw = function draw() {
    background(0);
    _.background.show();

    translate(-_.camera.x, -_.camera.y);
    for (let i = 0; i < _.rows; i++) {
      for (let j = 0; j < _.cols; j++) {
        let elem = gameMap[i][j];
        // rectMode(CORNER);

        switch (elem) {
          case "GRASS":
          case "GROUND":
            fill("#40A560");
            break;
          case "SPIKE":
            fill("#FF0080");
            break;
          default:
            fill("#A7A7A7");
            break;
        }
        if (elem) {
          stroke("#FFF");

          rect(j * _.cellLength, i * _.cellLength, _.cellLength, _.cellLength);
        }
      }
    }

    _.bird.show();
    // _.ground.show();
    _.player.show();

    if (++z % 50 == 0) {
      console.log("Player at x: " + _.player.x);
    }
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
