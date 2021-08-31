
import { Nidza } from "../src/nidza";

/**
 * @description Create nidza object.
 */
let nidza = new Nidza();

let myFirstNidzaObjectOptions = {
  id: "RottationProgram",
  size: {
    width: 300,
    height: 600
  },
  parentDom: document.getElementById('testHolder')
};

nidza.createNidzaIndentity(myFirstNidzaObjectOptions);

// Make shortcut object
let myScene = nidza.access.RottationProgram;
// Make it global for debug acces from console in chrome.
window.myScene = myScene;

/**
 * @description Top text component
 */
let zlatnaspiralaTxt = myScene.addTextComponent({
  id: "zlatna",
  text: "Simple rotate 360*",
  color: "yellow",
  position: {
    x: 50,
    y: 10
  },
  dimension: {
    width: 45,
    height: 10
  },
  border: {
    fillColor: "black",
    strokeColor: "yellow"
  },
  font: {
    fontSize: "20px",
    fontStyle: "underline",
    fontName: "helvetica"
  }
});

// Create one simple oscillator
let rotationOption = new nidza.Osc(0, 360, 0.5);

rotationOption.onRepeat = function(osc) {
  console.info("Values reached onrepeat targets osc: ", osc)
  dispatchEvent(new CustomEvent("deactivate-updater",
    { detail: { id: osc.elementIdentity } }));
}

zlatnaspiralaTxt.rotation.setRotation(rotationOption)

/**
 * @description Middle text component
 */
let zlatnaspiralaTxt2 = myScene.addTextComponent({
  id: "zlatna2",
  text: "cik cak",
  color: "yellow",
  position: {
    x: 50,
    y: 50
  },
  dimension: {
    width: 45,
    height: 18
  },
  border: {
    fillColor: "black",
    strokeColor: "yellow"
  },
  font: {
    fontSize: "20px",
    fontStyle: "",
    fontName: "helvetica"
  }
});


let rotationOption2 = new nidza.Osc(0, 90, 0.5, "oscMax");
rotationOption2.onReachMin = (osc) => {
  console.info("Values reached min targets osc: ", osc)
  zlatnaspiralaTxt2.rotation.clearUpdate();
  dispatchEvent(new CustomEvent("deactivate-updater",
  { detail: { id: osc.elementIdentity } }));
};
rotationOption2.onReachMax = (osc) => {
  console.info("Values reached max targets osc: ", osc)
};
zlatnaspiralaTxt2.rotation.setRotation(rotationOption2)
