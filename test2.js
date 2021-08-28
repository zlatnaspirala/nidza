
import { Nidza } from "./src/nidza";

var testNidza = new Nidza();

let myStar = {
  id: "myStar",
  size: {
    width: 150,
    height: 150
  },
  parentDom: document.getElementById('testHolder')
};

testNidza.createNidzaIndentity(myStar);

testNidza.access.myStar.addStarComponent({
  id: "Title1",
  radius: 33,
  inset: 0.2,
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

// textNidza.access.welcomeText.elements[0].setBorder();

window.textNidza = testNidza;