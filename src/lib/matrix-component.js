
import {NidzaElement} from "./base-component.js";
import { Osc } from "./operations.js";
import {getRandomIntFromTo, getRandomArbitrary} from "./utility.js";
import {Rotator} from "./rotation.js";

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

    this.centralObjectS = new Osc(0, 360, 1);
    this.centralObjectS.setDelay(110);

    this.centralObjectE = new Osc(0, 360, 1.2);
    this.centralObjectE.setDelay(110);

    this.centralObjectRadius = new Osc(0, 22, 1);
    this.centralObjectRadius.regimeType = "oscMin";
    this.centralObjectRadius.setDelay(330);

    this.centralObjectRadiusLocal = new Osc(10, 15, 1);
    this.centralObjectRadiusLocal.regimeType = "oscMin";
    this.centralObjectRadiusLocal.setDelay(22);

    this.centralObjectLineW = new Osc(1, 44, 1);
    this.centralObjectLineW.regimeType = "oscMin";
    this.centralObjectLineW.setDelay(11);

    this.objectLineW = new Osc(2, 4, 1);
    this.objectLineW.setDelay(22);

    this.objectGlobalAlpha = new Osc(0, 1, 0.01);
    this.objectGlobalAlpha.regimeType = "oscMin";
    this.objectGlobalAlpha.setDelay(11);

    this.colorR = new Osc(0, 11, 1);
    this.colorR.regimeType = "oscMin";
    this.colorG = new Osc(77, 222, 1);
    this.colorG.regimeType = "oscMin";

    this.colorB = new Osc(0, 11, 1);
    this.colorB.regimeType = "oscMin";
    this.colorR.setDelay(0);
    this.colorB.setDelay(0);
    this.colorG.setDelay(0);

    this.fontSizeInternal = 28;
    this.columns = Math.floor( this.dimension.getWidth() / 2 );
    this.drops = [];
    for ( var i = 0; i < this.columns / 1.77; i++ ) {
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

  getColor () {
    return "rgb(" + this.colorR.getValue() + ", " + this.colorG.getValue() + ", " + this.colorB.getValue() + ")";
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
    this.ctx.fillStyle = this.getColor();
    // this.ctx.fillRect(0, 0, this.canvasDom.width, this.canvasDom.height);
    this.ctx.fontSize = "700 " + this.fontSizeInternal + "px";
    // this.ctx.fillStyle = "#00cc33";
    for ( var i = 0; i < this.columns; i++ ) {
      var index = Math.floor( Math.random() * this.text.length );
      var x = i * this.fontSizeInternal;
      var y = this.drops[i] * this.fontSizeInternal;

      this.ctx.shadowBlur = 122;
      this.ctx.fillText( this.text[index], x, y - 35, this.dimension.getWidth() * 10 );

      this.ctx.shadowBlur = 22;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText( this.text[index], x, y - 15, this.dimension.getWidth() * 10 );
      this.ctx.fillText( this.text[index], x, y + 10, this.dimension.getWidth() );
      this.ctx.shadowBlur = 15;
      this.ctx.fillText( this.text[index], x, y + 30, this.dimension.getWidth() );

      this.ctx.fillStyle = this.getColor();

      this.ctx.font = "bold " + getRandomIntFromTo( 9, 30 ) + "px " + this.font.fontName;

      this.ctx.strokeStyle = this.getColor();
      this.ctx.shadowBlur = 25;
      this.ctx.shadowColor = 'black';
      this.ctx.fillText( this.text[index], y, x, this.dimension.getWidth() );
      this.ctx.strokeText( this.text[index], y + 5, x + 5, this.dimension.getWidth() );
      this.ctx.strokeText( this.text[index], y + 25, x + 25, this.dimension.getWidth() );


      this.ctx.beginPath();
      this.ctx.arc( x, y, getRandomArbitrary( 1, 50 ), 0, getRandomArbitrary( 1, 2 ) * Math.PI );
      this.ctx.stroke();

      this.ctx.shadowBlur = 1;
      
      this.ctx.globalAlpha = this.objectGlobalAlpha.getValue();
      this.ctx.beginPath();
      this.ctx.arc(x, y,
        this.centralObjectRadiusLocal.getValue(), this.centralObjectS.getValue() * Math.PI / 180, this.centralObjectE.getValue() * Math.PI / 180);
      this.ctx.arc(x, y,
      this.centralObjectRadiusLocal.getValue() , this.centralObjectS.getValue() * Math.PI / 180, this.centralObjectE.getValue() * Math.PI / 180, true);
      this.ctx.closePath();
      this.ctx.lineWidth = this.centralObjectLineW.getValue();
      this.ctx.stroke();
      this.ctx.fillStyle = this.getColor()
      this.ctx.fill();


      this.ctx.shadowBlur = 0;
      this.ctx.globalAlpha = 1;

      this.ctx.fillStyle = this.getColor()

      this.ctx.beginPath();
      this.ctx.arc(this.position.getX(), this.position.getY(),
        this.centralObjectRadius.getValue(), this.centralObjectS.getValue() * Math.PI / 180, this.centralObjectE.getValue() * Math.PI / 180);
      this.ctx.arc(this.position.getX(), this.position.getY(), 
      this.centralObjectRadius.getValue() , this.centralObjectS.getValue() * Math.PI / 180, this.centralObjectE.getValue() * Math.PI / 180, true);
      this.ctx.closePath();
      this.ctx.lineWidth = this.centralObjectLineW.getValue();
      this.ctx.stroke();
      this.ctx.fillStyle = this.getColor()
      this.ctx.fill();

      this.ctx.lineWidth = this.objectLineW.getValue();;

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