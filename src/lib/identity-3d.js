import {isMobile, loadSync} from "./utility";
import {ShaderComponent} from "./shader-component";
import {ShaderComponentCustom} from "./shader-component-custom";

export class Nidza3dIdentity {
  constructor(arg) {
    this.canvasDom = arg.canvasDom;
    this.gl = arg.ctx;
    this.elements = [];
    this.updater = null;
    this.updaterInterval = 1;
    this.uRegister = [];
    console.info("Construct uniq acess key for nidza instance.");
    addEventListener(this.getKey("activate-updater"), this.activateUpdater, {
      passive: true,
    });
    addEventListener(
      this.getKey("deactivate-updater"),
      this.deactivateUpdater,
      {
        passive: true,
      }
    );

    console.info("Construct 3d webgl access key for nidza instance.");
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
    console.info("default indentity-3d click event call.");
  }

  setBackground(arg) {
    this.canvasDom.style.background = arg;
  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  setCanvasBgColor(color) {
    arg.canvasDom.style.background = color;
  }

  addShaderComponent(arg) {
    arg.gl = this.gl;
    arg.canvasDom = this.canvasDom;
    let shaderComponent = new ShaderComponent(arg);
    this.elements.push(shaderComponent);
    shaderComponent.draw();
    return shaderComponent;
  }

  addShaderComponentCustom(arg) {
    arg.gl = this.gl;
    arg.canvasDom = this.canvasDom;
    let shaderComponent = new ShaderComponentCustom(arg);
    this.elements.push(shaderComponent);
    shaderComponent.draw();
    return shaderComponent;
  }
  
  activateUpdater = e => {
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
  };

  deactivateUpdater = e => {
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
          console.info(
            "There is no registred active elements -> deactivate updater."
          );
        }
      }
    }
  };

  isUpdaterActive() {
    if (this.updater == null) {
      return false;
    } else {
      return true;
    }
  }

  updateScene() {
    this.elements.forEach(e => {
      e.reload();
    });
  }
}
