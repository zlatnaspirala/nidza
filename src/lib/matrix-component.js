
import { NidzaElement } from "./base-component";
import { Osc,
         drawSimpleMatrix,
         drawRotatedMatrix } from "./operations";
import {Rotator} from "./rotation";

export class NidzaMatrixComponent extends NidzaElement {

  constructor(arg) {

    const eArg = {
      position: arg.position,
      id: arg.id,
      canvasDom: arg.canvasDom
    }
    super(eArg);

    this.id = arg.id;
    this.text = arg.text;
    this.color = arg.color || 'black';

    this.fontSizeInternal = 16;
    this.columns = Math.floor(this.dimension.getWidth() / 2);
    this.drops = [];
    for(var i=0; i < this.columns; i++){
      this.drops.push(0);
    }

    // Must be optimized with new override draws who setup font
    // for now i use flag `isActive`.
    this.font = {
      isActive: false,
      fontSize: "30px",
      fontStyle: "bold",
      fontName: "serif"
    };

    if (arg.font) {
      this.font = {
        isActive: true,
        fontSize: arg.font.fontSize,
        fontStyle: arg.font.fontStyle,
        fontName: arg.font.fontName
      };
    }

    this.ctx = arg.ctx;
    this.canvasDom = arg.canvasDom;
    this.draw = drawSimpleMatrix;
    this.drawRotatedText = drawRotatedMatrix;
    // this.drawRotatedBorderText = drawRotatedBorderText;
    // this.drawBorder = drawBorder;
    // this.drawWithBorder = drawWithBorder;

    this.border = {
      typeOfDraw: 'fill-stroke',
      isActive: true,
      fillColor: 'gold',
      strokeColor: 'red',
      radius: 10
    };

    if (arg.border) {
      this.border = {
        typeOfDraw: arg.border.typeOfDraw || 'fill-stroke',
        isActive: true,
        fillColor: arg.border.fillColor || 'gold',
        strokeColor: arg.border.strokeColor || 'red',
        radius: arg.border.radius || 10
      };
      this.setBorder(this.border);
    }

    this.rotation = new Rotator(this.id, this.canvasDom.id);
    this.rotation.setId(this.id);
    addEventListener(this.getKey("activate-rotator"), this.activateRotator, false);

    var newW = 20, newH = 20;
    if (arg.dimension) {
      newW = arg.dimension.width || 20;
      newH = arg.dimension.height || 20;
    }

    this.dimension.setReferent(this.canvasDom);
    this.dimension.elementIdentity = this.id;
    this.dimension.setDimension(newW, newH);

  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  getFont() {
    return this.font.fontStyle + " " + this.font.fontSize + " " + this.font.fontName;
  }

  setBorder(arg) {

    if (arg) {
      this.border = {
        typeOfDraw: arg.typeOfDraw || 'fill-stroke',
        isActive: true,
        fillColor: arg.fillColor || 'gold',
        strokeColor: arg.strokeColor || 'red',
        radius: arg.radius || 10
      };
    }

    this.border.isActive = true;
    if (this.rotation && this.rotation.isActive) {
      // this.draw = this.drawRotatedBorderText;
    } else {
      // this.draw = this.drawWithBorder;
    }
  }

  // Important - overriding is here
  // flag rotation.isActive indicate
  activateRotator = () => {

    if (this.rotation.isActive == false) {
      this.rotation.isActive = true;
      this.draw = this.drawRotatedText;
    }

    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), { 
      detail: {
       id: this.elementIdentity,
       // oneDraw: true
      }
    }));
  }

}