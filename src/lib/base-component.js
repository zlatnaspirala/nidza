
import {Position} from "./position.js";
import {Dimension} from "./dimension.js";

export class NidzaElement {

  constructor(arg) {
    this.position = new Position(arg.position.x, arg.position.y);
    this.dimension = new Dimension(100,100);

    this.position.setReferent(arg.canvasDom);
    this.position.elementIdentity = arg.id;

  }

}
