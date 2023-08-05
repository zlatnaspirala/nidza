
import { NidzaElement } from "./base-component.js";
import { Osc,
         drawSimpleText,
         drawRotatedText,
         drawBorder,
         drawWithBorder,
         drawRotatedBorderText } from "./operations.js";
import {Rotator} from "./rotation.js";

export class NidzaCustom2dComponent extends NidzaElement {

  constructor(arg) {

    const eArg = {
      position: arg.position,
      id: arg.id,
      canvasDom: arg.canvasDom,
      // draw: arg.draw
    }
    super(eArg);

    this.id = arg.id;

    this.draw = arg.draw;

    this.ctx = arg.ctx;
    this.canvasDom = arg.canvasDom;

    var newW = 20, newH = 20;
    if (arg.dimension) {
      newW = arg.dimension.width || 20;
      newH = arg.dimension.height || 20;
    }

    this.dimension.setReferent(this.canvasDom);
    this.dimension.elementIdentity = this.id;
    this.dimension.setDimension(newW, newH);

    dispatchEvent(new CustomEvent("activate-updater", {
      detail: {
        id: arg.id,
        oneDraw: false
      }
    }));

  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  activeDraw = () => {
    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), { 
      detail: {
       id: this.elementIdentity,
       oneDraw: false
      }
    }));
  }

}