
import { NidzaIdentity } from "./lib/identity";

export class Nidza {

  constructor() {
    this.access = {};
    console.info("Nidza engine constructed.");
  }

  createNidzaIndentity(arg) {

    var c = document.createElement('canvas');
    c.id = arg.id;
    c.setAttribute("style", "border:solid red 1px;");
    c.width = arg.size.width;
    c.height = arg.size.height;
    var ctx = c.getContext("2d");

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