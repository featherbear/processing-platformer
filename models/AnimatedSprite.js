models._AnimatedSprite = class {
  constructor(imagePrefix, count) {
    if (!imagePrefix || !count)
      throw Error("new _AnimatedSprite(imagePrefix, count)");
    this.images = [];
    this.frame = 0;
    this.imageCount = count;

    for (var i = 0; i < this.imageCount; i++) {
      var filename = "sprites/" + imagePrefix + nf(i, 4) + ".png";
      this.images.push(loadImage(filename));
    }

    this.frameRate = 60;
    this.targetFrameRate = 10;
    this.frameDuration = parseInt(this.frameRate / this.targetFrameRate);
    this.frameCounter = 1;
  }

  display(xpos, ypos) {
    this.frameCounter = (this.frameCounter + 1) % this.frameDuration;
    if (this.frameCounter == 0) this.frame = (this.frame + 1) % this.imageCount;
    push();
    // imageMode(CENTER);
    // scale(_.playerScale);
    image(this.images[this.frame], xpos, ypos);
    pop();
  }

  get width() {
    return this.images[0].width;
  }

  get height() {
    return this.images[0].height;
  }
};

models.AnimatedSprite = class extends models._AnimatedSprite {
  constructor(imagePrefix, count, x, y, ...args) {
    if (typeof x !== "number" || typeof y !== "number")
      throw Error("new AnimatedSprite(x, y)");
    super(imagePrefix, count, ...args);

    this.x = x;
    this.y = y;
  }

  show() {
    this.display(this.x, this.y);
  }
};
