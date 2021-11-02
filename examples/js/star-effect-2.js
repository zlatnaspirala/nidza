
import { Nidza, Utility } from "nidza";
// import { Nidza, Utility } from "../node_modules/nidza/index";

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

  let x = Utility.convert.PIX_TO_PER(e.clientX);
  let y = Utility.convert.PIY_TO_PER(e.clientY);
  starEffect.elements.forEach(element => {
    element.position.translate(x, y)
  });
  // createMyStars(x,y);


});

starEffect.attachMoveEvent((e)=> {
  // console.log("Move on indentity.", e.clientX);
  // console.log("Move on indentity in perc.", Utility.convert.PIX_TO_PER(e.clientX) )

});

// screenX: 401, screenY: 671, clientX: 401, clientY:

window.starEffect = starEffect;

createMyStars(50,50);

function createMyStars(x, y) {

  let colorR = new nidza.Osc(0, 255, 4);
  let colorG = new nidza.Osc(0, 255, 16);
  let colorB = new nidza.Osc(0, 255, 5);
  colorR.setDelay(0);
  colorB.setDelay(0);
  colorG.setDelay(0);

  let j = 2;
  let i = 5;
  let sceneGroup = setInterval(() => {
    let myStarElement = starEffect.addStarComponent({
      id: "star",
      radius: 55,
      inset: j,
      n: i,
      color:  "rgb("+ colorR.getValue() +"," + colorG.getValue() + "," + colorB.getValue() + ")",
      position: {
        x: x,
        y: y
      },
      dimension: {
        width: 180,
        height: 180
      }
    });

    let rotationOption = new nidza.Osc(0, 360, 1);
    myStarElement.rotation.setRotation(rotationOption);

    j-=0.1;
    //i++;
    if (j < 0) clearInterval(sceneGroup);
  }, 1)

}

// window.myStarElement = myStarElement;
