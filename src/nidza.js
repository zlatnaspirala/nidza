
import { NidzaIdentity } from "./lib/identity";
import { Nidza3dIdentity } from "./lib/identity-3d";
import { Osc } from "./lib/operations";

export class Nidza {

  constructor() {
    this.access = {};
    // Reference
    this.Osc = Osc;
    console.info("Nidza engine constructed.");
  }

  prepareCanvas(arg) {
    let c = document.createElement('canvas');
    let cStyle = "background: transparent";
    c.id = arg.id;
    c.setAttribute("style", cStyle);
    c.width = arg.size.width;
    c.height = arg.size.height;
    return c;
  }

  createNidzaIndentity(arg) {

    let cStyle = "background: transparent";
    let c;
    if (arg.injectCanvas) {
      c = arg.injectCanvas;
      c.setAttribute('style', cStyle);
    } else {
      c = this.prepareCanvas(arg);
    }

    var ctx = c.getContext("2d");
    this.canvasDom = c;
    if (arg.parentDom) {
      arg.parentDom.append(c);
    } else {
      document.body.append(c);
    }

    let nidzaIntentityInstance  = new NidzaIdentity({
      canvasDom: c,
      ctx: ctx,
      elements: [],
      parentDom: arg.parentDom
    });

    this.access[arg.id] = nidzaIntentityInstance;
    return nidzaIntentityInstance;
  }

  createNidza3dIndentity(arg) {

    let cStyle = "background: transparent";
    let c;
    if (arg.injectCanvas) {
      c = arg.injectCanvas;
      c.setAttribute('style', cStyle);
    } else {
      c = this.prepareCanvas(arg);
    }

    this.canvasDom = c;
    const gl = this.canvasDom.getContext("webgl");
    if (!gl) {
      console.warn("No support for webGL.");
      return;
    }
    if (arg.parentDom) {
      arg.parentDom.append(this.canvasDom);
    } else {
      document.body.append(this.canvasDom);
    }

    let nidza3dIntentityInstance  = new Nidza3dIdentity({
      canvasDom: this.canvasDom,
      ctx: gl,
      parentDom: arg.parentDom
    });

    this.access[arg.id] = nidza3dIntentityInstance;
    return nidza3dIntentityInstance;
  }

}
