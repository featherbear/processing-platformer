models.Image = class {
  constructor(path, x, y) {
    this.imagePath = path;
    this.image = loadImage(path);
    this.x = x;
    this.y = y;
    // this.width = width;
    // this.height = height;
  }

  display(x, y, width, height) {
    push();
    image(
      this.image,
      x || this.x,
      y || this.y,
      width || this.width,
      height || this.height
    );
    pop();
  }

  show() {
    this.display();
  }

  get width() {
    return this.image.width;
  }

  get height() {
    return this.image.height;
  }
};
