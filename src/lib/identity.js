
import { NidzaTextComponent } from "./text-component";
import { NidzaStarComponent } from "./star-component";

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
    addEventListener('activate-updater', this.activateUpdater);
    addEventListener('deactivate-updater', this.deactivateUpdater);
    this.setupGlobalCtx();
  }

  setupGlobalCtx() {
    this.ctx.textAlign="center";
    this.ctx.textBaseline="middle";
  }

  setCanvasBgColor () {

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
      // check if exist
      var loc = this.uRegister.indexOf(data.id);
      if (loc == -1) {
        alert("BAD");
      } else {
        this.uRegister.splice(loc, 1);
        // console.log("Test deactivate", data.id);
        if (this.uRegister.length == 0) {
          clearInterval(this.updater);
          this.updater = null;
          console.info("There is no regiistred active elements deactivate updater.");
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