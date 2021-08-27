
import { NidzaTextComponent } from "./text-component";

export class NidzaIdentity {
  constructor(arg) {
    this.canvasDom = arg.canvasDom;
    this.ctx = arg.ctx;
    this.elements = arg.elements;

    this.clearOnUpdate = true;
    this.updaterIsLive = false;
    this.updater = null;
    this.updaterInterval = 20;
    addEventListener('activate-updater', this.activateUpdater);
  }

  addTextComponent(arg) {
    arg.ctx = this.ctx;
    arg.canvasDom = this.canvasDom;
    let textComponent = new NidzaTextComponent(arg);
    textComponent.draw();
    this.elements.push(textComponent);
  }

  activateUpdater = () => {
    if (!this.isUpdaterActive()) {
      this.updater = setInterval(() => {
        this.updateScene();
      }, this.updaterInterval);
    }
  }

  deactivateUpdater () {
    clearInteval(this.updater);
    this.updater = null;
  }

  isUpdaterActive () {
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

}