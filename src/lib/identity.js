
import { NidzaTextComponent } from "./text-component";
import { NidzaStarComponent } from "./star-component";
import { isMobile } from "./utility";

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

    addEventListener(this.getKey('activate-updater'), this.activateUpdater);
    addEventListener(this.getKey('deactivate-updater'), this.deactivateUpdater);

    this.setupGlobalCtx();

  }

  attachClickEvent(callback) {
    if (isMobile()) {
      this.canvasDom.addEventListener("touchstart", callback);
    } else {
      this.canvasDom.addEventListener("click", callback);
    }
  }

  attachMoveEvent(callback) {
    if (isMobile()) {
      this.canvasDom.addEventListener("touchmove", callback);
    } else {
      this.canvasDom.addEventListener("mousemove", callback);
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
          console.info("There is no registred active elements -> deactivate updater.");
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
      e.dimension.update();
      e.rotation.update();
      e.draw();
    });

  }

  print() {
    console.log('I am big holder nothing else.');
  }

  getElementById(id) {
    return this.elements.filter(element => element.id == id)[0]
  }

}