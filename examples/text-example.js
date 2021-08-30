
import { Nidza } from "../src/nidza";

var testNidza = new Nidza();

let myFirstNidzaObjectOptions = {
  id: "welcomeText",
  size: {
    width: 250,
    height: 250
  },
  parentDom: document.getElementById('testHolder')
};

testNidza.createNidzaIndentity(myFirstNidzaObjectOptions);

// Make shortcut object
let myScene = testNidza.access.welcomeText;

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
  TitleWithBorder.setAngle(0);
};
TitleWithBorder.position.translateX(50);
TitleWithBorder.setAngle(2);

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
TitleBig.setBorder();

let TitleWithAngle = myScene.addTextComponent({
  id: "TitleWithAngle",
  text: "Generate images from code",
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
TitleWithAngle.setAngle(90);

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

JS.setBorder();
JS.setAngle(90);

let zlatnaspiralaTxt = myScene.addTextComponent({
  id: "zlatna",
  text: "@zlatnaspirala",
  color: "yellow",
  position: {
    x: 40,
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
};
zlatnaspiralaTxt.position.translateY(70);

let angle = 0;
setInterval(() => {
  // myScene.getElementById("JS").setAngle(angle++);
}, 20)


window.testNidza = testNidza;
