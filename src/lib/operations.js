
import { getRandomArbitrary, getRandomIntFromTo} from "./utility";

/**
 * @description Diffrent variant of math and
 * draws calculation data.
 */

/**
 * @description
 * Osc is math Value Oscilator.
 * Argument regimeType is optimal
 */
export class Osc {

  constructor(start, finish, step, regimeType) {

    this.elementIdentity = null;
    this.step = 1;
    this.start = 0;
    this.finish = 10;
    this.value = 0;
    this.delay = 2;
    this.delayInitial = 2;
    this.regimeType = "REPEAT";

    this.value = start;
    this.start = start;
    this.finish = finish;
    this.step = step;
    if ( regimeType ) {this.regimeType = regimeType;}

    this.ciklus = 0;

  }

  resetCiklus() {
    this.ciklus = 0;
  }

  setNewSeqFrameRegimeType( newSeqType ) {
    this.regimeType = newSeqType;
  }

  setNewValue(newValue) {
    this.value = newValue;
  }

  setDelay(newDelay) {
    this.delay = newDelay;
    this.delayInitial = newDelay;
  }

  getRawValue() {
    return this.value;
  }

  getValue() {

    if ( this.regimeType === "CONST" ) {return this.value;}

    if ( this.delay > 0 ) {
      this.delay--;
      return this.value;
    }
    this.delay = this.delayInitial;

    if ( this.regimeType !== "oscMin" && this.regimeType !== "oscMax" ) {

      if ( this.value + this.step <= this.finish ) {
        this.value = this.value + this.step;
        return this.value;
      } else {

        switch ( this.regimeType ) {

          case "STOP": {
            this.ciklus++;
            this.onStop(this);
            return this.value;
          }
          case "REPEAT": {
            this.ciklus++;
            this.value = this.start;
            this.onRepeat(this);
            return this.value;
          }
          default:
            console.warn( "NO CASE" );
        }
      }

    } else {

      if ( this.regimeType === "oscMin" ) {

        if ( this.value - this.step >= this.start ) {
          this.value = this.value - this.step;
          return this.value;
        } else {
          this.regimeType = "oscMax";
          if (this.ciklus > 0) this.onReachMin(this);
          return this.value;
        }

      } else if ( this.regimeType === "oscMax" ) {

        if ( this.value + this.step <= this.finish ) {
          this.value = this.value + this.step;
          return this.value;
        } else {
          this.onReachMax(this);
          this.regimeType = "oscMin";
          this.ciklus++;
          return this.value;
        }

      }

    }
    return 0;
  }

  onReachMax() {
    console.info( 'on reach max default log' )
  }

  onReachMin() {
    console.info( 'on reach min default log' )
  }

  onStop() {
    console.info( 'on stop default log' )
  }

  onRepeat() {
    // console.info('on repeat default log');
  };

}

/**
 * @description Convert angle to radians
 */
export function toRad(angle) {
  if ( typeof angle === "string" || typeof angle === "number" ) {
    return angle * ( Math.PI / 180 );
  } else {
    console.warn(
      "toRad, Input arg angle " + typeof angle + " << must be string or number."
    );
  }
}

/**
 * @description Draw Text with:
 *  - rotation procedure
 */
export function drawRotatedText() {
  this.ctx.save();
  this.ctx.translate(this.position.getX(),
  this.position.getY())
  this.ctx.rotate(toRad(this.rotation.angle));
  if (this.font.isActive) this.ctx.font = this.getFont();
  this.ctx.fillText(
    this.text, 0, 0,
    this.dimension.getWidth(),
    this.dimension.getHeight());
  this.ctx.restore();
}

/**
 * @description Draw Text with:
 *  - rotation procedure
 *  - Border procedure
 */
export function drawRotatedBorderText() {
  this.ctx.save();
  this.ctx.translate(this.position.getX(), this.position.getY());
  this.ctx.rotate(toRad(this.rotation.angle));
  if (this.font.isActive) this.ctx.font = this.getFont();
  this.drawBorder(
    0,
    0,
    this.dimension.getWidth(),
    this.dimension.getHeight(),
    10,
    this.border.fillColor,
    this.border.strokeColor,
    this.border.typeOfDraw);
  this.ctx.fillStyle = this.color;
  this.ctx.fillText(
    this.text, 0, 0,
    this.dimension.getWidth(),
    this.dimension.getHeight());
  this.ctx.restore();
}

/**
 * @description Draw Text vs Border with
 * radius option for rounded corners
 */
export function drawBorder(x, y, width, height, radius, fillColor, strokeColor, type) {

  this.ctx.save();
  this.ctx.strokeStyle = strokeColor;
  this.ctx.fillStyle = fillColor;
  x -= width / 2;
  y -= height / 2;
  this.ctx.beginPath();
  this.ctx.moveTo( x, y + radius );
  this.ctx.lineTo( x, y + height - radius );
  this.ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
  this.ctx.lineTo( x + width - radius, y + height );
  this.ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  this.ctx.lineTo( x + width, y + radius );
  this.ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
  this.ctx.lineTo( x + radius, y );
  this.ctx.quadraticCurveTo( x, y, x, y + radius );
  if (type == "fill-stroke") {
    this.ctx.fill();
    this.ctx.stroke();
  } else if (type == "stroke") {
    this.ctx.stroke();
  } else if (type == "fill") {
    this.ctx.fill();
  }
  this.ctx.restore();
}

/**
 * @description Draw Text:
 *  - Border procedure
 */
export function drawWithBorder() {
  this.ctx.save();
  if (this.font.isActive) this.ctx.font = this.getFont();
  this.drawBorder(this.position.getX(),
                  this.position.getY(),
                  this.dimension.getWidth(),
                  this.dimension.getHeight(),
                  10,
                  this.border.fillColor,
                  this.border.strokeColor,
                  this.border.typeOfDraw);
  this.ctx.fillStyle = this.color;
  this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());
  this.ctx.restore();
}

/**
 * @description Draw Text:
 *  - Simple
 */
export function drawSimpleText() {
  this.ctx.save();
  if (this.font.isActive) this.ctx.font = this.getFont();
  this.ctx.fillStyle = this.color;
  this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());
  this.ctx.restore();
}

export function drawStar() {
  this.ctx.beginPath();
  this.ctx.save();
  this.fillStyle = this.color;
  this.ctx.translate(this.position.getX(), this.position.getY());
  this.ctx.moveTo(0, 0 - this.radius);
  for ( let i = 0; i < this.n; i++ ) {
    this.ctx.rotate(Math.PI / this.n);
    this.ctx.lineTo(0, 0 - ( this.radius * this.inset));
    this.ctx.rotate(Math.PI / this.n);
    this.ctx.lineTo(0, 0 - this.radius);
  }
  this.ctx.closePath();
  this.ctx.stroke();
  this.ctx.fill();
  this.ctx.restore();
}

export function drawStarRotation () {
  this.ctx.beginPath();
  this.ctx.save();
  this.ctx.fillStyle = this.color;
  this.ctx.translate(0, 0);
  this.ctx.moveTo(0, 0 - this.radius);
  for ( let i = 0; i < this.n; i++ ) {
    this.ctx.rotate(Math.PI / this.n);
    this.ctx.lineTo(0, 0 - ( this.radius * this.inset));
    this.ctx.rotate(Math.PI / this.n);
    this.ctx.lineTo(0, 0 - this.radius);
  }
  
  this.ctx.closePath();
  this.ctx.stroke();
  this.ctx.fill();
  this.ctx.restore();
}

/**
 * @description Draw Matrix effect component:
 *  - Simple
 */
export function drawSimpleMatrix() {
  this.ctx.save();
  if (this.font.isActive) this.ctx.font = this.getFont();
  this.ctx.fillStyle = this.color;
  // this.ctx.fillRect(0, 0, this.canvasDom.width, this.canvasDom.height);
  this.ctx.fontSize = "700 " + this.fontSizeInternal + "px";
  this.ctx.fillStyle = "#00cc33";
  for(var i=0; i<this.columns; i++){
      var index = Math.floor(Math.random()*this.text.length);
      var x = i * this.fontSizeInternal;
      var y = this.drops[i] * this.fontSizeInternal;

      this.ctx.fillText(this.text[index], x, y);

      this.ctx.fillStyle = "#00cc33";

      this.ctx.shadowBlur = 122;
      this.ctx.shadowColor = 'orange';
      this.ctx.fillText(this.text[index], x , y - 35, this.dimension.getWidth() * 10 );

      this.ctx.shadowBlur = 22;
      this.ctx.shadowColor = 'gray';
      this.ctx.fillText(this.text[index], x , y - 15, this.dimension.getWidth() * 10 );

      this.ctx.shadowBlur = 2;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText(this.text[index], x , y , this.dimension.getWidth() * 10 );

      this.ctx.shadowBlur = 5;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText(this.text[index], x , y + 10, this.dimension.getWidth()  );

      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText(this.text[index], x , y + 30, this.dimension.getWidth()  );

      this.ctx.fillStyle = "black";

      this.ctx.shadowBlur = 125;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText(this.text[index], x , y + 50, this.dimension.getWidth()  );

      
      this.ctx.font = "bold " + getRandomIntFromTo(9, 30) + "px " + this.font.fontName;

      this.ctx.strokeStyle  = "lime";
      this.ctx.shadowBlur = 25;
      this.ctx.shadowColor = 'black';
      this.ctx.fillText(this.text[index], y , x , this.dimension.getWidth()  );
      this.ctx.strokeText(this.text[index], y + 5 , x + 5 , this.dimension.getWidth()  );
      this.ctx.strokeText(this.text[index], y + 25 , x + 25 , this.dimension.getWidth()  );


      this.ctx.beginPath();
      this.ctx.arc(x, y,  getRandomArbitrary(1,50), 0, getRandomArbitrary(0,2) * Math.PI);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(x, y,  getRandomArbitrary(5,30), 0, 2 * Math.PI);
      this.ctx.fill();

      if(y >= this.canvasDom.height && Math.random() > 0.99){
          this.drops[i] = 0;
      }
      this.drops[i]++;
  }
  // this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());

  this.ctx.restore();
}

export function drawRotatedMatrix() {
  this.ctx.save();
  this.ctx.translate(this.position.getX(),
  this.position.getY())
  this.ctx.rotate(toRad(this.rotation.angle));
  if (this.font.isActive) this.ctx.font = this.getFont();
  // this.ctx.fillRect(0, 0, this.canvasDom.width, this.canvasDom.height);
  this.ctx.fontSize = "700 " + this.fontSizeInternal + "px";
  this.ctx.fillStyle = "#00cc33";
  for(var i=0; i<this.columns; i++){
      var index = Math.floor(Math.random()*this.text.length);
      var x = i * this.fontSizeInternal;
      var y = this.drops[i] * this.fontSizeInternal;

      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = '#fff';
      this.ctx.fillText(this.text[index], x, y, this.dimension.getWidth() * 10 );

      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText(this.text[index], x + 2, y + 2, this.dimension.getWidth() * 10 );

      if(y >= this.canvasDom.height && Math.random() > 0.99){
          this.drops[i] = 0;
      }
      this.drops[i]++;
  }
  this.ctx.restore();
}