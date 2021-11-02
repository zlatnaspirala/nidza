
import { Nidza, Utility } from "../node_modules/nidza/index";

var nidza = new Nidza();

let myStar = {
  id: "myStar",
  size: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  parentDom: document.getElementById('testHolder')
};

nidza.createNidzaIndentity(myStar);

nidza.access.myStar.setBackground('lime')
for (var j=0; j< 10;j++) {
  let myStarElement = nidza.access.myStar.addStarComponent({
    id: "Title1",
    radius: 10 + j,
    inset: 0.1 + j,
    n: 6 + j,
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
  myStarElement.rotation.setRotation(rotationOption)
  // nidza.access.welcomeText.elements[0].setBorder();
}
