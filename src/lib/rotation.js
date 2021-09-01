
import { Osc } from "./operations";

export class Rotator {

  constructor(eleId, identityId) {
    this.isActive = false;
    this.angle = 0;
    this.osc = null;
    this.elementIdentity = null;
    this.updateOrigin = () => {};
    this.update = () => {};
    this.elementIdentity = eleId;
    this.nIndentity = identityId;
  }

  getKey(action) {
    return action + this.nIndentity;
  }

  clearUpdate() {
    this.update = this.updateOrigin;
  }

  setId(id) {
    if (this.osc != null) this.osc.elementIdentity = id;
  }

  setAngle(angle) {

    this.clearUpdate();

    if (!this.isActive) {
      dispatchEvent(new CustomEvent(this.getKey("activate-rotator"),
        { detail: { id: this.elementIdentity } }));
    }

    this.angle = angle;
    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), {
      detail: { id: this.elementIdentity, oneDraw: true }
    }));
  }

  setRotation(osc) {

    if (osc instanceof Osc) {
      this.osc = osc;
      this.osc.elementIdentity = this.elementIdentity;
    } else {
      console.warn("Rotator use default rotation setup.")
      this.osc = new Osc(0, 360, 0.5);
    }

    // can be handled more...
    // no need always 
    this.update = this.updateOsc;

    if (!this.isActive) {
      dispatchEvent(new CustomEvent(this.getKey("activate-rotator"),
        { detail: { id: this.elementIdentity } }));
    }

    dispatchEvent(new CustomEvent(this.getKey("activate-updater"),
      { detail: { id: this.elementIdentity } }));
  }

  updateOsc() {
    this.angle = this.osc.getValue();
  }

}