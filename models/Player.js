UP = "up";
DOWN = "down";

models.Player = class extends models.AnimatedSprite {
  constructor(x, y, ...args) {
    super("man", 3, x, y, ...args);

    this.evtPress = null;
    this.evtRelease = null;

    this.direction = { x: null, y: null };

    this.inAir = false;

    this.movementSpeed = 1.25;
    this.registerEvents();
  }

  registerEvents() {
    window.keyPressed.addEvent(
      (this.evtPress = evt => {
        switch (evt.key.toLowerCase()) {
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
        switch (evt.key.toLowerCase()) {
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
    this.inAir = true;
    this.y -= 50;

    // double jump?
  }
  show() {
    push();
    stroke("#0000FF");
    fill("#000000");
    rect(this.x, this.y, this.width, this.height);

    this.display(this.x, this.y);

    let centreX = _.screen.width / 2;
    let centreY = _.screen.height / 2;

    if (this.direction.x == LEFT) {
      let newX = this.x - 5 * this.movementSpeed;
      if (newX >= 0) {
        // TODO: collision check

        if (this.x - _.camera.x < centreX) _.camera.x -= 5 * this.movementSpeed;
        this.x = newX;
      }
    }

    if (this.direction.x == RIGHT) {
      let newX = this.x + 5 * this.movementSpeed;
      if (newX + this.width < _.map.width) {
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
    pop();
  }
};
