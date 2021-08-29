
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

myScene.addTextComponent({
  id: "TitleWithBorder",
  text: "Generate images from code",
  position: {
    x: 50,
    y: 25
  },
  dimension: {
    width: 80,
    height: 10
  },
  font: {
    fontSize: "30px",
    fontStyle: "bold",
    fontName: "serif"
  }
});

myScene.getElementById("TitleWithBorder").setBorder();

myScene.addTextComponent({
  id: "TitleBig",
  text: "NidzA",
  position: {
    x: 50,
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

myScene.getElementById("TitleBig").setBorder();

myScene.addTextComponent({
  id: "TitleWithAngle",
  text: "Generate images from code",
  position: {
    x: 5,
    y: 40
  },
  dimension: {
    width: 80,
    height: 10
  }
});

myScene.getElementById("TitleWithAngle").setAngle(90);

myScene.addTextComponent({
  id: "JS",
  text: "JS",
  color: "yellow",
  position: {
    x: 25,
    y: 50
  },
  dimension: {
    width: 80,
    height: 10
  },
  font: {
    fontSize: "140px",
    fontStyle: "",
    fontName: "Georgia"
  }
});


window.testNidza = testNidza;
