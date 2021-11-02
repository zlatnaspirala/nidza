
// import { Nidza, Utility } from "../node_modules/nidza/index";
import { Nidza, Utility } from "nidza";

let loader = document.getElementById("loader");

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function (e) {
    // navigator.serviceWorker.register('worker.js');
    loader.innerText = 'NIDZA READY';
    setTimeout(function() {
      loader.style.display = 'none';
    },
    200);
  });
}

var nidza = new Nidza();

let myFirstNidzaObjectOptions = {
  id: "welcomeText",
  size: {
    width: 300,
    height: 300
  },
  parentDom: document.getElementById('testHolder')
};

nidza.createNidzaIndentity(myFirstNidzaObjectOptions);

// Make shortcut object
let myScene = nidza.access.welcomeText;

window.myScene = myScene;

myScene.addTextComponent({
  id: "SimpleText",
  text: "Use simple text labels on canvas surface.",
  position: {
    x: 50,
    y: 5
  },
  dimension: {
    width: 80,
    height: 15
  }
});

let TitleWithBorder = myScene.addTextComponent({
  id: "TitleWithBorder",
  text: "Generate images from code",
  position: {
    x: 150,
    y: 25
  },
  dimension: {
    width: 80,
    height: 10
  },
  font: {
    fontSize: "20px",
    fontStyle: "bold",
    fontName: "serif"
  }
});

TitleWithBorder.position.thrust = 0.15
TitleWithBorder.position.onTargetReached = function () {
  // TitleWithBorder.rotation.setAngle(0);
};
TitleWithBorder.position.translateX(50);

let rotationOption = new nidza.Osc(0, 90, 0.5);
rotationOption.regimeType = "oscMin";

rotationOption.onReachMin = function(osc) {
  console.info("Values reached onReachMin targets osc: ", osc)
  TitleWithBorder.rotation.clearUpdate();
  dispatchEvent(new CustomEvent("deactivate-updater",
    { detail: { id: osc.elementIdentity } }));
}

TitleWithBorder.rotation.setRotation(rotationOption);

myScene.getElementById("TitleWithBorder").setBorder();

let TitleBig = myScene.addTextComponent({
  id: "TitleBig",
  text: "NidzA",
  position: {
    x: 150,
    y: 45
  },
  dimension: {
    width: 60,
    height: 20
  },
  font: {
    fontSize: "40px",
    fontStyle: "italic",
    fontName: "helvetica"
  }
});
TitleBig.position.translateX(50);
// Set default border
// TitleBig.setBorder();

let TitleWithAngle = myScene.addTextComponent({
  id: "TitleWithAngle",
  text: "nidza rotated text",
  position: {
    x: 5,
    y: -50
  },
  dimension: {
    width: 80,
    height: 10
  }
});

TitleWithAngle.position.thrust = 0.15
TitleWithAngle.position.translateY(50);
// TitleWithAngle.rotation.setAngle(90);

let JS = myScene.addTextComponent({
  id: "JS",
  text: "js",
  color: "yellow",
  position: {
    x: 85,
    y: 45
  },
  dimension: {
    width: 18,
    height: 18
  },
  border: {
    typeOfDraw: 'fill-stroke',
    isActive: true,
    fillColor: 'black',
    strokeColor: 'red',
    radius: 10
  },
  font: {
    fontSize: "50px",
    fontStyle: "",
    fontName: "helvetica"
  }
});


let rotationOptionJS = new nidza.Osc(0, 90, 2);
rotationOptionJS.regimeType = "oscMin";

rotationOptionJS.onReachMin = function(osc) {
  console.info("Values reached onrepeat targets osc: ", osc)
  // if (osc.ciklus > 3) {
    JS.rotation.clearUpdate();
    dispatchEvent(new CustomEvent("deactivate-updater",
      { detail: { id: osc.elementIdentity } }));
  // }

}


JS.setBorder();
JS.rotation.setRotation(rotationOptionJS);
JS.rotation.osc.setDelay(0)

let zlatnaspiralaTxt = myScene.addTextComponent({
  id: "zlatna",
  text: "@zlatnaspirala",
  color: "yellow",
  position: {
    x: 50,
    y: 165
  },
  dimension: {
    width: 18,
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

zlatnaspiralaTxt.position.onTargetReached = function() {
  zlatnaspiralaTxt.dimension.smoothWidth(70)
  myScene.setBackground('#127612')
};
zlatnaspiralaTxt.position.translateY(70);

let rotationOption2 = new nidza.Osc(0, 90, 0.5);
rotationOption2.regimeType = "oscMin";

rotationOption2.onReachMin = function(osc) {
  console.info("Values reached onrepeat targets osc: ", osc)
  zlatnaspiralaTxt.rotation.clearUpdate();
  dispatchEvent(new CustomEvent("deactivate-updater",
    { detail: { id: osc.elementIdentity } }));
}

zlatnaspiralaTxt.rotation.setRotation(rotationOption2)
zlatnaspiralaTxt.rotation.osc.setDelay(1)

window.nidza = nidza;
