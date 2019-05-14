models.Camera = class {
  constructor(target_xFn, target_yFn) {
    this.target_xFn = target_xFn;
    this.target_yFn = target_yFn;

    this.map_x = null;
    this.map_y = null;

    this.screen_x = null;
    this.screen_y = null;

    this._x_bound = null;
    this._y_bound = null;
  }

  _updateXBound() {
    this._x_bound = this.map_x - this.screen_x + 1;
  }
  _updateYBound() {
    this._y_bound = this.map_y - this.screen_y + 1;
  }

  updateTargetFns(xFn, yFn) {
    this.updateTargetXFn(xFn);
    this.updateTargetYFn(yFn);
  }
  updateTargetXFn(xFn) {
    this.target_xFn = xFn;
  }
  updateTargetYFn(yFn) {
    this.target_yFn = yFn;
  }

  updateMap(x, y) {
    this.updateMapX(x);
    this.updateMapY(y);
  }
  updateMapX(x) {
    this.map_x = x;
    this._updateXBound();
  }
  updateMapY(y) {
    this.map_y = y;
    this._updateYBound();
  }

  updateScreen(x, y) {
    this.updateScreenX(x);
    this.updateScreenY(y);
  }
  updateScreenX(x) {
    this.screen_x = x;
    this._updateXBound();
  }
  updateScreenY(y) {
    this.screen_y = y;
    this._updateYBound();
  }

  get x() {
    let x = this.target_xFn();
    let centreX = this.screen_x / 2;
    return x > centreX && this.map_x > this.screen_x
      ? Math.min(x - centreX, this._x_bound)
      : 0;
  }
  
  get y() {
    let y = this.target_yFn();
    let centreY = this.screen_y / 2;
    return y > centreY && this.map_y > this.screen_y
      ? Math.min(y - centreY, this._y_bound)
      : 0;
  }
};
