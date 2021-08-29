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

    this.step = 1;
    this.start = 0;
    this.finish = 10;
    this.value = 0;
    this.delay = 100;
    this.delayInitial = 100;
    this.regimeType = "REPEAT";

    this.value = start;
    this.start = start;
    this.finish = finish;
    this.step = step;
    if ( regimeType ) {this.regimeType = regimeType;}

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
            return this.value;
          }
          case "REPEAT": {
            this.value = this.start;
            this.onRepeat();
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
          return this.value;
        }

      } else if ( this.regimeType === "oscMax" ) {

        if ( this.value + this.step <= this.finish ) {
          this.value = this.value + this.step;
          return this.value;
        } else {
          this.regimeType = "oscMin";
          return this.value;
        }

      }

    }
    return 0;
  }

  // For overriding
  onRepeat() {
    console.log( 'on repeat default log' )
  };

}

export function toRad(angle) {
  if ( typeof angle === "string" || typeof angle === "number" ) {
    return angle * ( Math.PI / 180 );
  } else {
    console.log(
      "toRad, Input arg angle " + typeof angle + " << must be string or number."
    );
  }
}

export function drawRotatedText() {
  this.ctx.save();
  this.ctx.translate(this.position.getX(),
  this.position.getY())
  this.ctx.rotate(toRad(this.rotation.angle));
  this.ctx.fillText(
    this.text, 0, 0,
    this.dimension.getWidth(),
    this.dimension.getHeight());
  this.ctx.restore();
}

export function drawRotatedBorderText() {
  this.ctx.save();
  this.ctx.translate(this.position.getX(), this.position.getY());
  this.ctx.rotate(toRad(this.rotation.angle));
  this.ctx.fillText(
    this.text, 0, 0,
    this.dimension.getWidth(),
    this.dimension.getHeight());
  this.drawBorder(0, 0, this.dimension.getWidth(), this.dimension.getHeight(),
    10, "lime", "stroke", "#012293")
  this.ctx.restore();
}

export function drawBorder(x, y, width, height, radius, color, type) {
  this.ctx.save();
  if ( type == "stroke" ) {
    this.ctx.strokeStyle = color;
  } else {
    this.ctx.fillStyle = color;
  }

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
  if ( type == "stroke" ) {
    this.ctx.stroke();
  } else {
    this.ctx.fill();
  }
  this.ctx.restore();
}

export function drawSimpleText() {
  this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());
}

export function drawStar() {
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

export function drawStarRotation () {
  this.ctx.beginPath();
  this.ctx.save();
  this.ctx.translate(0, 0);
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