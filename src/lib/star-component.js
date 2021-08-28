
import {NidzaElement} from "./base-component";
import {
  drawRotatedText,
  drawBorder,
  drawRotatedBorderText
} from "./operations";

export class NidzaStarComponent extends NidzaElement {

  constructor( arg ) {

    super();

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

    var newW = 20, newH = 20;
    if ( arg.dimension ) {
      newW = arg.dimension.width || 20;
      newH = arg.dimension.height || 20;
    }

    this.dimension.setReferent( this.canvasDom );
    this.dimension.elementIdentity = this.id;
    this.dimension.setDimension( newW, newH );

    var newX = 20, newY = 20;
    if ( arg.position ) {
      newX = arg.position.x || 20;
      newY = arg.position.y || 20;
    }

    this.position.setReferent( this.canvasDom );
    this.position.elementIdentity = this.id;
    this.position.setPosition( newX, newY );

    // Setup draw
    this.draw = this.drawSimple;

    this.drawRotatedText = drawRotatedText;
    this.drawRotatedBorderText = drawRotatedBorderText;
    this.drawBorder = drawBorder;
  }

  drawSimple() {
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.translate(this.position.getX(), this.position.getY());
    this.ctx.moveTo(0, 0 - this.radius);
    for ( let i = 0; i < this.n; i++ ) {
      this.ctx.rotate(Math.PI / this.n);
      this.ctx.lineTo(0, 0 - ( this.radius * this.inset));
      this.ctx.rotate(Math.PI / this.n);
      this.ctx.lineTo(0, 0 - this.radius);
    }
    this.ctx.restore();
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  }
}
