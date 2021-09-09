
import { Nidza, Utility } from "nidza";

/**
 * @description Create nidza object.
 */
let nidza = new Nidza();

let myFirstNidzaObjectOptions = {
  id: "RotationProgram",
  size: {
    width: 300,
    height: 600
  },
  parentDom: document.getElementById('testHolder')
};

nidza.createNidzaIndentity(myFirstNidzaObjectOptions);

// Make shortcut object
let myScene = nidza.access.RotationProgram;
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
    y: 15
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
let rotationOption = new nidza.Osc(0, 360, 2);

rotationOption.onRepeat = function(osc) {
  console.info("Values reached onrepeat targets osc: ", osc)
  zlatnaspiralaTxt.rotation.clearUpdate();
  dispatchEvent(new CustomEvent("deactivate-updater",
    { detail: { id: osc.elementIdentity } }));
}

zlatnaspiralaTxt.rotation.setRotation(rotationOption)
zlatnaspiralaTxt.rotation.osc.setDelay(0)

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
    fontName: ""
  }
});


let rotationOption2 = new nidza.Osc(0, 90, 1, "oscMax");
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

/**
 * @description Middle text component
 * Rotate to target angle then rotate back.
 * Use osc.ciklus to determinate who much
 * how many cycles do you want.
 */
 let zlatnaspiralaTxt3 = myScene.addTextComponent({
  id: "zlatna3",
  text: "Two cycles",
  color: "black",
  position: {
    x: 50,
    y: 80
  },
  dimension: {
    width: 45,
    height: 18
  },
  border: {
    fillColor: "yellow",
    strokeColor: "black"
  },
  font: {
    fontSize: "20px",
    fontStyle: "",
    fontName: ""
  }
});


let rotationOption3 = new nidza.Osc(0, 90, 1, "oscMax");
rotationOption3.onReachMin = (osc) => {
  console.info("Values reached min targets osc: ", osc)
  if (osc.ciklus == 2) {
    zlatnaspiralaTxt3.rotation.clearUpdate();
    dispatchEvent(new CustomEvent("deactivate-updater",
      { detail: { id: osc.elementIdentity } }));
  }
};
rotationOption3.onReachMax = (osc) => {
  console.info("Values reached max targets osc: ", osc)
};
zlatnaspiralaTxt3.rotation.setRotation(rotationOption3)