
import { Nidza, Utility } from "nidza";
// import { Nidza, Utility } from "../node_modules/nidza/index";

let loader;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function (e) {
    // navigator.serviceWorker.register('worker.js');
    loader = document.getElementById("loader");
    loader.innerText = 'NIDZA READY';
    setTimeout(function() {
      createMyStars(50,50)

      loader.style.display = 'none';
    },
    200);
  });
}

var nidza = new Nidza();

let myStar = {
  id: "myStar",
  size: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  parentDom: document.getElementById('testHolder')
};

let starEffect = nidza.createNidzaIndentity(myStar);

/*
starEffect.attachClickEvent((e)=> {
  console.log("Click on indentity.", e);

  let x = Utility.convert.PIX_TO_PER(e.clientX);
  let y = Utility.convert.PIY_TO_PER(e.clientY);
  starEffect.elements.forEach(element => {
    element.position.translate(x, y)
  });
  // createMyStars(x,y);


});*/

// starEffect.attachMoveEvent((e)=> {
  // console.log("Move on indentity.", e.clientX);
  // console.log("Move on indentity in perc.", Utility.convert.PIX_TO_PER(e.clientX) )
// });

window.starEffect = starEffect;

function createMyStars(x, y) {

  let colorR = new nidza.Osc(0, 255, 22);
  let colorG = new nidza.Osc(0, 255, 16);
  let colorB = new nidza.Osc(0, 255, 5);
  colorR.setDelay(0);
  colorB.setDelay(0);
  colorG.setDelay(0);
 
    let myStarElement = starEffect.addMatrixComponent({
      id: "star",
      text: "xy?><}{[]",
      color:  "rgb("+ colorR.getValue() +"," + colorG.getValue() + "," + colorB.getValue() + ")",
      position: {
        x: x,
        y: y
      },
      dimension: {
        width: 100,
        height: 100
      }
    });

    dispatchEvent(new CustomEvent(myStarElement.getKey("activate-updater"), { 
      detail: {
       id: 'star',
      }
    }));

    starEffect.setupMatrix1()
    starEffect.clearOnUpdate = false
    // let rotationOption = new nidza.Osc(0, 5, 1);
    // myStarElement.rotation.setRotation(rotationOption);

}
