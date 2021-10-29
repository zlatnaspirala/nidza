
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

    // Create new osc to make background color floating
    myShaderElement.bgColorR = new nidza.Osc(0, 1, 0.01, 'oscMin');
    myShaderElement.bgColorG = new nidza.Osc(0, 1, 0.01, 'oscMin');
    myShaderElement.bgColorB = new nidza.Osc(0, 1, 0.01, 'oscMin');
    myShaderElement.bgColorR.setDelay(5);
    myShaderElement.bgColorG.setDelay(12);
    myShaderElement.bgColorB.setDelay(1);

    // You are free to inject any vars direct on shader component
    myShaderElement.colorR = new nidza.Osc(0, 1, 0.01, 'oscMin');
    myShaderElement.colorG = new nidza.Osc(0, 1, 0.01, 'oscMin');
    myShaderElement.colorB = new nidza.Osc(0, 1, 0.01, 'oscMin');
    myShaderElement.colorR.setDelay(5);
    myShaderElement.colorB.setDelay(12);
    myShaderElement.colorG.setDelay(1);

    // Override
    setInterval(() => {
      for (var j=0; j < myShaderElement.colors.length; j+=3) {
        // Buildin variable
        myShaderElement.colors[j] =  myShaderElement.colorR.getValue();
        myShaderElement.colors[j+1] =  myShaderElement.colorG.getValue();
        myShaderElement.colors[j+2] =  myShaderElement.colorR.getValue();
      }
      // Buildin variable
      myShaderElement.background[0] = myShaderElement.bgColorR.getValue();
      myShaderElement.background[1] = myShaderElement.bgColorG.getValue();
      myShaderElement.background[2] = myShaderElement.bgColorB.getValue();
    }, 30);

    window.myShaderElement = myShaderElement;
    window.indentityMyShader = indentityMyShader;
  }
);
