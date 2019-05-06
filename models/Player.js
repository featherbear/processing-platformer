UP = "up";
DOWN = "down";

models.Player = class extends models._AnimatedSprite {
  constructor(x, y, ...args) {
    super("man", 3);

    this.x = x;
    this.y = y;
    this.w = this.width;
    this.h = this.height;

    this.evtPress = null;
    this.evtRelease = null;

    this.direction = { x: null, y: null };
    this.movementSpeed = 1.25;
    this.registerEvents();
  }

  registerEvents() {
    window.keyPressed.addEvent(
      (this.evtPress = evt => {
        switch (evt.key) {
          case "a":
            this.direction.x = LEFT;
            break;
          case "d":
            this.direction.x = RIGHT;
            break;
          // case "w":
          //   this.direction.y = UP;
          //   break;
          // case "s":
          //   this.direction.y = DOWN;
          //   break;
          case " ":
            this.jump();
            break;
          default:
            console.log(evt);
            break;
        }
      })
    );

    window.keyReleased.addEvent(
      (this.evtPress = evt => {
        switch (evt.key) {
          case "a":
            if (this.direction.x == LEFT) this.direction.x = null;
            break;
          case "d":
            if (this.direction.x == RIGHT) this.direction.x = null;
            break;
          case "w":
            if (this.direction.y == UP) this.direction.y = null;
            break;
          case "s":
            if (this.direction.y == DOWN) this.direction.y = null;
            break;
        }
      })
    );
  }
  jump() {
    // if (!this.canJump) return;
    console.warn("TODO: JUMP");
    this.y -= 50;

    // double jump?
  }
  show() {
    this.display(this.x, this.y);

    let centreX = _.screen.width / 2;
    let centreY = _.screen.height / 2;

    if (this.direction.x == LEFT) {
      let newX = this.x - 5 * this.movementSpeed;
      if (newX >= 0) {
        // TODO: collision check

        if (this.x < centreX) _.camera.x -= 5 * this.movementSpeed;
        this.x = newX;
      }
    }

    if (this.direction.x == RIGHT) {
      let newX = this.x + 5 * this.movementSpeed;
      if (newX + this.w < _.map.width) {
        // TODO: collision check


        if (this.x > centreX) _.camera.x += 5 * this.movementSpeed;
        this.x = newX;
      }
    }
    if (this.direction.y == UP) {
      this.y -= 5;
    }

    if (this.direction.y == DOWN) {
      this.y += 5;
    }
  }
};
