
export class Position {

  constructor(curentX, curentY) {
  this.x = curentX;
  this.y = curentY;
  this.targetX = curentX;
  this.targetY = curentY;
  this.velX = 0;
  this.velY = 0;
  this.thrust = 0.1;
  this.IN_MOVE = false;
  this.onTargetReached = function () {};
  }

  setSpeed (num_) {
      if (typeof num_ === "number") {
          this.thrust = num_;
      } else {
          console.warn("nidza raport : warning for method 'Position.setSpeed'  Desciption : arguments (w , h ) must be type of number.");
      }
  }

  translateX (x) {
      this.IN_MOVE = true;
      this.targetX = x;
  };

  translateY (y) {
      this.IN_MOVE = true;
      this.targetY = y;
  };

  translate (x_, y_) {
      this.IN_MOVE = true;
      this.targetX = x_;
      this.targetY = y_;
  };

  setPosition (x_, y_, type_) {
    this.targetX = x_;
    this.targetY = y_;
    this.x = x_;
    this.y = y_;
    this.IN_MOVE = false;
  }

  update () {
      var tx = this.targetX - this.x,
          ty = this.targetY - this.y,
          dist = Math.sqrt(tx * tx + ty * ty),
          rad = Math.atan2(ty, tx),
          angle = rad / Math.PI * 180;
      this.velX = (tx / dist) * this.thrust;
      this.velY = (ty / dist) * this.thrust;
      if (this.IN_MOVE == true) {
          if (dist > this.thrust) {
              this.x += this.velX;
              this.y += this.velY;
          } else {
              this.x = this.targetX;
              this.y = this.targetY;
              this.IN_MOVE = false;
              this.onTargetReached();
          }
      }
  }

  getX() {
    return window.innerWidth / 100 * this.x;
  }

  getY() {
    return window.innerHeight / 100 * this.y;
  }

}