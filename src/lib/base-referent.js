
/**
 * @description No need class for this.
 * Use bind is easy in ECMA6.
 */
export function setReferent (canvasDom) {
  this.canvasDom = canvasDom;
  // this.pIdentity = canvasDom.id;
  this.referentCanvasWidth = () => {
      return this.canvasDom.width;
  };
  this.referentCanvasHeight = () => {
      return this.canvasDom.height;
  };
}