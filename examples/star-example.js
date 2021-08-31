
import { Nidza } from "../src/nidza";

var nidza = new Nidza();

let myStar = {
  id: "myStar",
  size: {
    width: 150,
    height: 150
  },
  parentDom: document.getElementById('testHolder')
};

nidza.createNidzaIndentity(myStar);

nidza.access.myStar.addStarComponent({
  id: "Title1",
  radius: 33,
  inset: 0.4,
  n: 6,
  position: {
    x: 50,
    y: 50
  },
  dimension: {
    width: 180,
    height: 180
  }
});

// nidza.access.welcomeText.elements[0].setBorder();

window.nidza = nidza;