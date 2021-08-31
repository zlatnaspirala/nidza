
import {NidzaElement} from "./base-component";
import {
  toRad,
  drawStar,
  drawStarRotation,
} from "./operations";

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

    this.rotation = {
      isActive: false,
      angle: 0
    }

    this.draw = drawStar;
    this.drawStarRotation = drawStarRotation;

  }

  activateRotator(angle) {
    if (!this.rotation.isActive) {
      this.draw = this.drawRotatedStar;
      this.rotation.isActive = true;
    }

    this.rotation.angle = angle;

    dispatchEvent(new CustomEvent("activate-updater", {
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
