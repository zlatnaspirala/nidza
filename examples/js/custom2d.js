
import { Nidza } from "../node_modules/nidza/index";
// import { Nidza, Utility } from "nidza";

var nidza = new Nidza();

let myStar = {
  id: "myStar",
  size: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  parentDom: document.getElementById('testHolder')
};

document.getElementById('loader').style.display = 'none';
nidza.createNidzaIndentity(myStar);
nidza.access.myStar.setBackground('orangered');

var j = 1;
let myStarElement = nidza.access.myStar.addCustom2dComponent({
    id: "CUSTOM",
    // radius: 10 + j,
    // inset: 0.1 + j,
    // n: 6 + j,
    draw: (e) => {
      console.log("CUSTOM DRAW", e)
    },
    position: {
      x: 50,
      y: 50
    },
    dimension: {
      width: 180 + j,
      height: 180+ j
    }
  });

  let rotationOption = new nidza.Osc(0, 90, 0.5, "oscMax");
  // myStarElement.rotation.setRotation(rotationOption)
  window.myStarElement = myStarElement