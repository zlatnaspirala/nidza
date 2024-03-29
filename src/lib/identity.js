
import { NidzaTextComponent } from "./text-component.js";
import { NidzaStarComponent } from "./star-component.js";
import { NidzaMatrixComponent } from "./matrix-component.js";
import { NidzaCustom2dComponent} from "./custom2d-component.js";

import { isMobile } from "./utility.js";

export class NidzaIdentity {

  constructor(arg) {

    this.canvasDom = arg.canvasDom;
    this.ctx = arg.ctx;
    this.elements = arg.elements;

    this.clearOnUpdate = true;
    this.updaterIsLive = false;
    this.updater = null;
    this.updaterInterval = 1;
    this.uRegister = [];

    console.info("Construct uniq acess key for nidza instance.");

    addEventListener(this.getKey('activate-updater'), this.activateUpdater, {passive: true});
    addEventListener(this.getKey('deactivate-updater'), this.deactivateUpdater, {passive: true});

    this.setupGlobalCtx();

  }

  attachClickEvent(callback) {
    if (isMobile()) {
      this.canvasDom.addEventListener("touchstart", callback, {passive: true});
    } else {
      this.canvasDom.addEventListener("click", callback, {passive: true});
    }
  }

  attachMoveEvent(callback) {
    if (isMobile()) {
      this.canvasDom.addEventListener("touchmove", callback, {passive: true});
    } else {
      this.canvasDom.addEventListener("mousemove", callback, {passive: true});
    }
  }

  onClick() {
    console.info('default indentity click event call.');
  }

  setBackground (arg) {
    this.canvasDom.style.background = arg;
  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  setupGlobalCtx() {
    this.ctx.textAlign="center";
    this.ctx.textBaseline="middle";
  }

  setCanvasBgColor(color) {
    arg.canvasDom.style.background = color;
  }

  addTextComponent(arg) {
    arg.ctx = this.ctx;
    arg.canvasDom = this.canvasDom;
    let textComponent = new NidzaTextComponent(arg);
    textComponent.draw();
    this.elements.push(textComponent);
    return textComponent;
  }

  addStarComponent(arg) {
    arg.ctx = this.ctx;
    arg.canvasDom = this.canvasDom;
    let starComponent = new NidzaStarComponent(arg);
    starComponent.draw();
    this.elements.push(starComponent);
    return starComponent;
  }

  addMatrixComponent(arg) {
    arg.ctx = this.ctx;
    arg.canvasDom = this.canvasDom;
    let starComponent = new NidzaMatrixComponent(arg);
    starComponent.draw();
    this.elements.push(starComponent);
    return starComponent;
  }

  addCustom2dComponent(arg) {
    arg.ctx = this.ctx;
    arg.canvasDom = this.canvasDom;
    let cComponent = new NidzaCustom2dComponent(arg);
    cComponent.draw();
    this.elements.push(cComponent);
    return cComponent;
  }

  activateUpdater = (e) => {
    var data = e.detail;
    if (data) {
      if (this.uRegister.indexOf(data.id) == -1) {
        if (data.oneDraw) {
          this.updateScene();
          return;
        } else {
          // resister
          this.uRegister.push(data.id);
        }
      }
    }

    if (!this.isUpdaterActive()) {
      this.updater = setInterval(() => {
        this.updateScene();
      }, this.updaterInterval);
    }

  }

  deactivateUpdater  = (e) => {

    var data = e.detail;
    if (data) {
      var loc = this.uRegister.indexOf(data.id);
      if (loc == -1) {
        console.warn("remove event but not exist", data.id);
      } else {
        this.uRegister.splice(loc, 1);
        if (this.uRegister.length == 0) {
          clearInterval(this.updater);
          this.updater = null;
          // console.info("There is no registred active elements -> deactivate updater.");
        }
      }
    }

  }

  isUpdaterActive() {
    if (this.updater == null) {
      return false;
    } else {
      return true;
    }
  }

  updateScene() {

    if (this.clearOnUpdate) {
      this.ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
    }

    this.elements.forEach(e => {
      e.position.update();
      if (e.dimension) e.dimension.update();
      if (e.rotation) e.rotation.update();
      e.draw(this.ctx);
    });

  }

  print() {
    console.log('I am big holder nothing else.');
  }

  getElementById(id) {
    return this.elements.filter(element => element.id == id)[0]
  }

  setupMatrix1 () {
    this.canvasDom.style.background = "";
    this.canvasDom.className = "matrix1";
  }

}
