models.BackgroundParallax = class extends models.Image {
  constructor(path) {
    super(path, 0, 0);
  }
  
  display(x, y, width, height) {
    push();
    let progressFloat = (_.player.x + _.player.width) / _.map.width;
    image(
      this.image,
      x || this.x - 0.3 * progressFloat * this.width,
      y || this.y,
      width || this.width,
      height || this.height
    );
    pop();
  }
};
