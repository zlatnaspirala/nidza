
import { NidzaIdentity } from "./lib/identity";

export class Nidza {

  constructor() {
    this.collections = [];
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
    document.body.append(c);

    let nidzaIntentityInstance  = new NidzaIdentity({
      canvasDom: c,
      ctx: ctx,
      elements: []
    });

    this.access[arg.id] = nidzaIntentityInstance;
    this.collections.push(nidzaIntentityInstance);

    return nidzaIntentityInstance;

  }

}