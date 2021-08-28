
import { Nidza } from "./src/nidza";

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

testNidza.access.welcomeText.addTextComponent({
  id: "Title1",
  text: "Generate images from code",
  position: {
    x: 50,
    y: 50
  },
  dimension: {
    width: 80,
    height: 10
  }
});

textNidza.access.welcomeText.elements[0].setBorder();

window.textNidza = testNidza;