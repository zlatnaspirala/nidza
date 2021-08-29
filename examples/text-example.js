
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
  }
});

myScene.getElementById("TitleWithBorder").setBorder();

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

window.testNidza = testNidza;
