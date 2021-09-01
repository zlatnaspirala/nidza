import {setReferent} from "./base-referent";

export class Dimension {
  constructor(curentWidth, curentHeight) {
    this.width = curentWidth;
    this.height = curentHeight;
    this.targetX = curentWidth;
    this.targetY = curentHeight;
    this.velX = 0;
    this.velY = 0;
    this.thrust = 0.1;
    this.IN_MOVE = false;
    this.onTargetReached = function () {};
    this.referentCanvasWidth = () => 250;
    this.referentCanvasHeight = () => 250;
    this.setReferent = setReferent;
    this.elementIdentity = null;
  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  setSpeed(num_) {
    if (typeof num_ === "number") {
      this.thrust = num_;
    } else {
      console.warn(
        "nidza raport : warning for method 'Position.setSpeed'  Desciption : arguments (w , h ) must be type of number."
      );
    }
  }

  smoothWidth(x) {
    dispatchEvent(new CustomEvent("activate-updater", { detail: { id: this.elementIdentity } }));
    this.IN_MOVE = true;
    this.targetX = x;
  }

  smoothHeight(y) {
    dispatchEvent(new CustomEvent("activate-updater", { detail: { id: this.elementIdentity } }));
    this.IN_MOVE = true;
    this.targetY = y;
  }

  smooth(x_, y_) {
    dispatchEvent(new CustomEvent("activate-updater", { detail: { id: this.elementIdentity } }));
    this.IN_MOVE = true;
    this.targetX = x_;
    this.targetY = y_;
  }

  setDimension(x_, y_, type_) {
    this.targetX = x_;
    this.targetY = y_;
    this.width = x_;
    this.height = y_;
    this.IN_MOVE = false;
    dispatchEvent(new CustomEvent("activate-updater",
      { detail: { id: this.elementIdentity, oneDraw: true } }));
  }

  onDone() {
    dispatchEvent(new CustomEvent("deactivate-updater", { detail: { id: this.elementIdentity } }));
  }

  update() {
    var tx = this.targetX - this.width,
      ty = this.targetY - this.height,
      dist = Math.sqrt(tx * tx + ty * ty),
      rad = Math.atan2(ty, tx),
      angle = (rad / Math.PI) * 180;
    this.velX = (tx / dist) * this.thrust;
    this.velY = (ty / dist) * this.thrust;
    if (this.IN_MOVE == true) {
      if (dist > this.thrust) {
        this.width += this.velX;
        this.height += this.velY;
      } else {
        this.width = this.targetX;
        this.height = this.targetY;
        this.IN_MOVE = false;
        this.onDone();
        this.onTargetReached();
      }
    }
  }

  getWidth() {
    return (this.referentCanvasWidth() / 100) * this.width;
  }

  getHeight() {
    return (this.referentCanvasHeight() / 100) * this.height;
  }
}
