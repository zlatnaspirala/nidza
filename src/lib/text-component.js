
import { NidzaElement } from "./base-component";
import { drawSimpleText,
         drawRotatedText,
         drawBorder,
         drawRotatedBorderText } from "./operations";

export class NidzaTextComponent extends NidzaElement {

  constructor(arg) {

    const eArg = {
      position: arg.position,
      id: arg.id,
      canvasDom: arg.canvasDom
    }
    super(eArg);

    this.id = arg.id;
    this.text = arg.text;
    this.ctx = arg.ctx;
    this.canvasDom = arg.canvasDom;

    this.border = {
      typeOfDraw: 'stroke',
      strokeColor: 'blue',
      isActive: false,
      color: 'yellow',
      radius: 50
    };

    this.rotation = {
      isActive: false,
      angle: 0
    }

    var newW = 20, newH = 20;
    if (arg.dimension) {
      newW = arg.dimension.width || 20;
      newH = arg.dimension.height || 20;
    }

    this.dimension.setReferent(this.canvasDom);
    this.dimension.elementIdentity = this.id;
    this.dimension.setDimension(newW, newH);

    this.draw = drawSimpleText;
    this.drawRotatedText = drawRotatedText;
    this.drawRotatedBorderText = drawRotatedBorderText;
    this.drawBorder = drawBorder;
  }

  setBorder() {
    this.border.isActive = true;
    if (this.rotation.isActive) {
      this.draw = this.drawRotatedBorderText;
    } else {
      this.draw = this.drawWithBorder;
    }
  }

  setAngle(angle) {
    this.rotation.isActive = true;
    this.rotation.angle = angle;
    if (this.border.isActive) { 
      this.draw = this.drawRotatedBorderText;
    } else {
      this.draw = this.drawRotatedText;
    }
    dispatchEvent(new CustomEvent("activate-updater", { 
      detail: {
       id: this.elementIdentity,
       oneDraw: true
      }
    }));
  }

  drawWithBorder() {
    this.drawBorder( this.position.getX(),
                     this.position.getY(),
                     this.dimension.getWidth(),
                     this.dimension.getHeight(),
                     10,
                     this.border.color,
                     this.typeOfDraw);
    this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());
  }

}