
import { NidzaElement } from "./base-component";

export class NidzaTextComponent extends NidzaElement {

  constructor(arg) {
    super();
    this.text = arg.text;
    this.ctx = arg.ctx;
  }

  draw() {
    this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), 250);
  }

}