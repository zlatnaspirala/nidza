
import { Nidza } from "./src/nidza";

var testNidza = new Nidza();

let myFirstNidzaObjectOptions = {
  id: "welcomeText",
  size: {
    width: 250,
    height: 250
  }
};

testNidza.createNidzaIndentity(myFirstNidzaObjectOptions);

testNidza.access.welcomeText.addTextComponent({
  id: "Title",
  text: "Generate images from code",
  position: {
    x: 20,
    y: 40
  },
  dimension: {
    width: 100,
    height: 100
  }
});


window.textNidza = testNidza;