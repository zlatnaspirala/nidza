
import { NidzaIdentity } from "./lib/identity";
import { Osc } from "./lib/operations";

export class Nidza {

  constructor() {
    this.access = {};
    // Reference
    this.Osc = Osc;
    console.info("Nidza engine constructed.");
  }

  createNidzaIndentity(arg) {
    let c = document.createElement('canvas');
    let cStyle = "background: linear-gradient(-90deg, black, red);";
    // cStyle    += "border:solid red 1px;";
    c.id = arg.id;
    c.setAttribute("style", cStyle);
    c.width = arg.size.width;
    c.height = arg.size.height;
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

}