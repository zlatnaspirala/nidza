
import {NidzaElement} from "./base-component";
import {
  toRad,
  drawStar,
  drawStarRotation,
} from "./operations";
import {Rotator} from "./rotation";

export class NidzaStarComponent extends NidzaElement {

  constructor(arg) {

    const eArg = {
      position: arg.position,
      id: arg.id,
      canvasDom: arg.canvasDom
    }
    super(eArg);

    this.id = arg.id;
    this.radius = arg.radius;
    this.n = arg.n;
    this.inset = arg.inset;
    this.ctx = arg.ctx;
    this.canvasDom = arg.canvasDom;
    this.color = arg.color;

    this.rotation = new Rotator(this.id, this.canvasDom.id);
    this.rotation.setId(this.id);
    addEventListener(this.getKey("activate-rotator"), this.activateRotator, false);

    this.draw = drawStar;
    this.drawStarRotation = drawStarRotation;

  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  activateRotator = (angle) => {
    if (!this.rotation.isActive) {
      this.draw = this.drawRotatedStar;
      this.rotation.isActive = true;
    }

    this.rotation.angle = angle;

    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), {
      detail: {
       id: this.elementIdentity,
       oneDraw: true
      }
     }));
  }

  drawRotatedStar() {
    this.ctx.save();
    this.ctx.translate(this.position.getX(),
    this.position.getY());
    this.ctx.rotate(toRad(this.rotation.angle));
    this.drawStarRotation();
    this.ctx.restore();
  }

}
