
import { NidzaElement } from "./base-component";

export class NidzaTextComponent extends NidzaElement {

  constructor(arg) {

    super();

    this.id = arg.id;
    this.text = arg.text;
    this.ctx = arg.ctx;
    this.canvasDom = arg.canvasDom;

    this.dimension.setReferent(this.canvasDom);

    var newW = 20, newH = 20;
    if (arg.dimension) {
      newW = arg.dimension.width || 20;
      newH = arg.dimension.height || 20;
    }

    this.dimension.setDimension(newW, newH);

    var newX = 20, newY = 20;
    if (arg.position) {
      newX = arg.position.x || 20;
      newY = arg.position.y || 20;
    }

    this.position.setReferent(this.canvasDom);
    this.position.setPosition(arg.position.x, arg.position.y);

  }

  draw() {
    this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());
  }

  drawOverride() {
    //
  }

}