
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

testNidza.access.welcomeText.addTextComponent({ text: "nikola" })

window.textNidza = testNidza;