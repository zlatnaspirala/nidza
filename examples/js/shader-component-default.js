
import { Nidza, Utility } from "../node_modules/nidza/index";


window.addEventListener("load", function (e) {
  loader.innerText = "NIDZA READY";
  setTimeout(function () {
    loader.style.display = "none";
  }, 200);
});

// This component depens on glmatrix engine
Utility.loadSync(
  "https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js",
  () => {
    var nidza = new Nidza();

    let myShader = {
      id: "myShader",
      size: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      parentDom: document.getElementById("testHolder"),
    };

    var indentityMyShader = nidza.createNidza3dIndentity(myShader);
    let myShaderElement = indentityMyShader.addShaderComponent({
      id: "vertex-color-comp",
    });

    dispatchEvent(
      new CustomEvent(indentityMyShader.getKey("activate-updater"), {
        detail: {
          id: "vertex-color-comp",
        },
      })
    );

    let colorR = new nidza.Osc(0, 1, 0.01);
    let colorG = new nidza.Osc(0, 1, 0.01);
    let colorB = new nidza.Osc(0, 1, 0.01);
    colorR.setDelay(0);
    colorB.setDelay(0);
    colorG.setDelay(0);

    // Override
    setInterval(() => {
      //
      myShaderElement.colors.forEach((comp, index, array) => {
        if (comp % 4 != 0) {
          myShaderElement.colors[index] =  colorR.getValue();
        }
      });
    }, 22);
    // initBuffers

    window.myShaderElement = myShaderElement;
    window.indentityMyShader = indentityMyShader;
  }
);
