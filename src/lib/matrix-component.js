
import {NidzaElement} from "./base-component";
import { Osc } from "./operations";
import {getRandomIntFromTo, getRandomArbitrary} from "./utility";
import {Rotator} from "./rotation";

export class NidzaMatrixComponent extends NidzaElement {

  constructor( arg ) {

    const eArg = {
      position: arg.position,
      id: arg.id,
      canvasDom: arg.canvasDom
    }
    super( eArg );

    this.id = arg.id;
    this.text = arg.text;
    this.color = arg.color || 'black';

    this.fontSizeInternal = 16;
    this.columns = Math.floor( this.dimension.getWidth() / 2 );
    // this.columns = 5;
    this.drops = [];
    for ( var i = 0; i < this.columns; i++ ) {
      this.drops.push( 0 );
    }

    // Must be optimized with new override draws who setup font
    // for now i use flag `isActive`.
    this.font = {
      isActive: false,
      fontSize: "30px",
      fontStyle: "bold",
      fontName: "serif"
    };

    if ( arg.font ) {
      this.font = {
        isActive: true,
        fontSize: arg.font.fontSize,
        fontStyle: arg.font.fontStyle,
        fontName: arg.font.fontName
      };
    }

    this.ctx = arg.ctx;
    this.canvasDom = arg.canvasDom;
    this.draw = this.drawSimpleMatrix;
    this.drawRotatedText = this.drawRotatedMatrix;
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

    if ( arg.border ) {
      this.border = {
        typeOfDraw: arg.border.typeOfDraw || 'fill-stroke',
        isActive: true,
        fillColor: arg.border.fillColor || 'gold',
        strokeColor: arg.border.strokeColor || 'red',
        radius: arg.border.radius || 10
      };
      this.setBorder( this.border );
    }

    this.rotation = new Rotator( this.id, this.canvasDom.id );
    this.rotation.setId( this.id );
    addEventListener( this.getKey( "activate-rotator" ), this.activateRotator, false);

    var newW = 20, newH = 20;
    if ( arg.dimension ) {
      newW = arg.dimension.width || 20;
      newH = arg.dimension.height || 20;
    }

    this.dimension.setReferent( this.canvasDom );
    this.dimension.elementIdentity = this.id;
    this.dimension.setDimension( newW, newH );

  }

  getKey( action ) {
    return action + this.canvasDom.id;
  }

  getFont() {
    return this.font.fontStyle + " " + this.font.fontSize + " " + this.font.fontName;
  }

  setBorder( arg ) {

    if ( arg ) {
      this.border = {
        typeOfDraw: arg.typeOfDraw || 'fill-stroke',
        isActive: true,
        fillColor: arg.fillColor || 'gold',
        strokeColor: arg.strokeColor || 'red',
        radius: arg.radius || 10
      };
    }

    this.border.isActive = true;
    if ( this.rotation && this.rotation.isActive ) {
      // this.draw = this.drawRotatedBorderText;
    } else {
      // this.draw = this.drawWithBorder;
    }
  }

  // Important - overriding is here
  // flag rotation.isActive indicate
  activateRotator = () => {

    if ( this.rotation.isActive == false ) {
      this.rotation.isActive = true;
      this.draw = this.drawRotatedText;
    }

    dispatchEvent( new CustomEvent( this.getKey( "activate-updater" ), {
      detail: {
        id: this.elementIdentity,
        // oneDraw: true
      }
    } ) );
  }


  /**
   * @description Draw Matrix effect component:
   *  - Simple
   */
  drawSimpleMatrix() {
    this.ctx.save();
    if ( this.font.isActive ) this.ctx.font = this.getFont();
    this.ctx.fillStyle = this.color;
    // this.ctx.fillRect(0, 0, this.canvasDom.width, this.canvasDom.height);
    this.ctx.fontSize = "700 " + this.fontSizeInternal + "px";
    this.ctx.fillStyle = "#00cc33";
    for ( var i = 0; i < this.columns; i++ ) {
      var index = Math.floor( Math.random() * this.text.length );
      var x = i * this.fontSizeInternal;
      var y = this.drops[i] * this.fontSizeInternal;

      this.ctx.fillText( this.text[index], x, y );

      this.ctx.fillStyle = "#00cc33";

      this.ctx.shadowBlur = 122;
      this.ctx.shadowColor = 'orange';
      this.ctx.fillText( this.text[index], x, y - 35, this.dimension.getWidth() * 10 );

      this.ctx.shadowBlur = 22;
      this.ctx.shadowColor = 'gray';
      this.ctx.fillText( this.text[index], x, y - 15, this.dimension.getWidth() * 10 );

      this.ctx.shadowBlur = 2;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText( this.text[index], x, y, this.dimension.getWidth() * 10 );

      this.ctx.shadowBlur = 5;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText( this.text[index], x, y + 10, this.dimension.getWidth() );

      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText( this.text[index], x, y + 30, this.dimension.getWidth() );

      this.ctx.fillStyle = "black";

      this.ctx.shadowBlur = 125;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText( this.text[index], x, y + 50, this.dimension.getWidth() );


      this.ctx.font = "bold " + getRandomIntFromTo( 9, 30 ) + "px " + this.font.fontName;

      this.ctx.strokeStyle = "lime";
      this.ctx.shadowBlur = 25;
      this.ctx.shadowColor = 'black';
      this.ctx.fillText( this.text[index], y, x, this.dimension.getWidth() );
      this.ctx.strokeText( this.text[index], y + 5, x + 5, this.dimension.getWidth() );
      this.ctx.strokeText( this.text[index], y + 25, x + 25, this.dimension.getWidth() );


      this.ctx.beginPath();
      this.ctx.arc( x, y, getRandomArbitrary( 1, 50 ), 0, getRandomArbitrary( 0, 2 ) * Math.PI );
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc( x, y, getRandomArbitrary( 5, 30 ), 0, 2 * Math.PI );
      this.ctx.fill();

      if ( y >= this.canvasDom.height && Math.random() > 0.99 ) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
    // this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());

    this.ctx.restore();
  }

  drawRotatedMatrix() {
    this.ctx.save();
    this.ctx.translate( this.position.getX(),
      this.position.getY() )
    this.ctx.rotate( toRad( this.rotation.angle ) );
    if ( this.font.isActive ) this.ctx.font = this.getFont();
    // this.ctx.fillRect(0, 0, this.canvasDom.width, this.canvasDom.height);
    this.ctx.fontSize = "700 " + this.fontSizeInternal + "px";
    this.ctx.fillStyle = "#00cc33";
    for ( var i = 0; i < this.columns; i++ ) {
      var index = Math.floor( Math.random() * this.text.length );
      var x = i * this.fontSizeInternal;
      var y = this.drops[i] * this.fontSizeInternal;

      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = '#fff';
      this.ctx.fillText( this.text[index], x, y, this.dimension.getWidth() * 10 );

      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText( this.text[index], x + 2, y + 2, this.dimension.getWidth() * 10 );

      if ( y >= this.canvasDom.height && Math.random() > 0.99 ) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
    this.ctx.restore();
  }

}