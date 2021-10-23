
import { Nidza, Utility } from "../node_modules/nidza/index";

window.addEventListener("load", function (e) {
  loader.innerText = "NIDZA READY";
  setTimeout(function () {
    loader.style.display = "none";
  }, 200);
});

// This component depems on glmatrix engine
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

    window.myShaderElement = myShaderElement;
    window.indentityMyShader = indentityMyShader;
  }
);
