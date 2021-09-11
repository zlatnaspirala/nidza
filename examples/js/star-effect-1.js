
import { Nidza, Utility } from "../node_modules/nidza/index";

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

starEffect.attachClickEvent((e)=> {
  console.log("Click on indentity.", e);
});

starEffect.attachMoveEvent((e)=> {
  // console.log("Move on indentity.", e);
});

// screenX: 401, screenY: 671, clientX: 401, clientY:

window.starEffect = starEffect;

createMyStars();

function createMyStars() {

  let colorR = new nidza.Osc(0, 255, 15);
  let colorG = new nidza.Osc(0, 255, 16);
  let colorB = new nidza.Osc(0, 255, 17);
  colorR.setDelay(0);
  colorB.setDelay(0);
  colorG.setDelay(0);

  let j = 3;
  let sceneGroup = setInterval(() => {
    let myStarElement = starEffect.addStarComponent({
      id: "star",
      radius: 55,
      inset: j,
      n: 6,
      color:  "rgb("+ colorR.getValue() +"," + colorG.getValue() + "," + colorB.getValue() + ")",
      position: {
        x: 50,
        y: 50
      },
      dimension: {
        width: 180,
        height: 180
      }
    });

    let rotationOption = new nidza.Osc(0, 360, 1);
    myStarElement.rotation.setRotation(rotationOption);

    j-=0.1;
    if (j < 0) clearInterval(sceneGroup);
  }, 20)

}

// window.myStarElement = myStarElement;
