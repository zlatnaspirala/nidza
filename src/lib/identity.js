
import { NidzaTextComponent } from "./text-component";

export class NidzaIdentity {
  constructor(arg) {
    this.canvasDom = arg.canvasDom;
    this.ctx = arg.ctx;
    this.elements = arg.elements;
  }

  addTextComponent(arg) {
    arg.ctx = this.ctx;
    let textComponent = new NidzaTextComponent(arg);
    textComponent.draw();
    this.elements.push(textComponent);
  }

  print() {
    console.log('I am big holder nothing else.');
  }

}