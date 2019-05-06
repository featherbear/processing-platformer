models.Box = class {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    fill(255);
    rectMode(CENTER);
    stroke("#AA0000");
    rect(this.x, this.y, this.w, this.h);
  }
};