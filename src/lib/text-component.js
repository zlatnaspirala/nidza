
import { NidzaElement } from "./base-component";
import { drawRotatedText,
         drawBorder,
         drawRotatedBorderText } from "./operations";

export class NidzaTextComponent extends NidzaElement {

  constructor(arg) {

    super();

    this.id = arg.id;
    this.text = arg.text;
    this.ctx = arg.ctx;
    this.canvasDom = arg.canvasDom;

    this.border = {
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

    var newX = 20, newY = 20;
    if (arg.position) {
      newX = arg.position.x || 20;
      newY = arg.position.y || 20;
    }

    this.position.setReferent(this.canvasDom);
    this.position.elementIdentity = this.id;
    this.position.setPosition(newX, newY);

    // Setup draw
    this.draw = this.drawSimple;

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

  drawSimple() {
    this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());
  }

  drawWithBorder() {
    this.drawBorder( this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight(),
                10, "lime", "stroke", "#012293")
    this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());
  }

  

}