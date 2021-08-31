# nidza

2d canvas engine - Scene Object oriented engine without classic auto update like calling requestAnimationFrame or timers. There is no events for drawen elements. `Nidza` is exclusively for draws staff. Objective is CPU low price of usage. You can move object or start any animation but on finish there is no any draw calls. This is main objective task to make autoupdater with releasing on target/object reach. Project object is also adding all of kind composition video/webcam/images/text in same time and place.


Nidza will be `texture generator` for `matrix-engine` but still this project is indipendent
because can be used for any other project.

 - You can generate images
 - Use like texture in 3d space
 - Use it like web site features
 - Draw logo animation


## How it works

Create object of instance Nidza.
`var testNidza = new Nidza();`
This object containe all necessary staff, everything related to the nidza engine.

Now we create generic new objects with:
```js
let myFirstNidzaObjectOptions = {
  id: "welcomeText",
  size: {
    width: 250,
    height: 250
  }
};
testNidza.createNidzaIndentity(myFirstNidzaObjectOptions);
```

This func `createNidzaIndentity` created one new canvas element (with width and height from options) in base.
I called `NidzaIndentity`. Every indentity use own canvas element and represent independent app part.

Now to draw really something we use:
```js
testNidza.access.welcomeText.addTextComponent({
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
```

## Example `text-example.js` => TextComponent

![text-example](https://github.com/zlatnaspirala/nidza/blob/main/non-project/text-example.gif)
```js
/**
 *  If you using npm i nidza
 * import { Nidza } from "nidza";
 * If you use nidza from source for dev stage use this
 * there is no build just run http protocol
 */

import { Nidza } from "../src/nidza";

/**
 * @description Create nidza object.
 */
let nidza = new Nidza();

let myFirstNidzaObjectOptions = {
  id: "RottationProgram",
  size: {
    width: 300,
    height: 600
  },
  parentDom: document.getElementById('testHolder')
};

nidza.createNidzaIndentity(myFirstNidzaObjectOptions);

// Make shortcut object
let myScene = nidza.access.RottationProgram;
// Make it global for debug acces from console in chrome.
window.myScene = myScene;

/**
 * @description Top text component
 */
let zlatnaspiralaTxt = myScene.addTextComponent({
  id: "zlatna",
  text: "Simple rotate 360*",
  color: "yellow",
  position: {
    x: 50,
    y: 10
  },
  dimension: {
    width: 45,
    height: 10
  },
  border: {
    fillColor: "black",
    strokeColor: "yellow"
  },
  font: {
    fontSize: "20px",
    fontStyle: "underline",
    fontName: "helvetica"
  }
});

// Create one simple oscillator
let rotationOption = new nidza.Osc(0, 360, 0.5);

rotationOption.onRepeat = function(osc) {
  dispatchEvent(new CustomEvent("deactivate-updater",
    { detail: { id: osc.elementIdentity } }));
}

zlatnaspiralaTxt.rotation.setRotation(rotationOption)

/**
 * @description Middle text component
 */
let zlatnaspiralaTxt2 = myScene.addTextComponent({
  id: "zlatna2",
  text: "cik cak",
  color: "yellow",
  position: {
    x: 50,
    y: 50
  },
  dimension: {
    width: 45,
    height: 18
  },
  border: {
    fillColor: "black",
    strokeColor: "yellow"
  },
  font: {
    fontSize: "20px",
    fontStyle: "",
    fontName: "helvetica"
  }
});

let rotationOption2 = new nidza.Osc(0, 90, 0.5, "oscMax");

rotationOption2.onReachMin = (osc) => {

  zlatnaspiralaTxt2.rotation.clearUpdate();
  dispatchEvent(new CustomEvent("deactivate-updater",
    { detail: { id: osc.elementIdentity } }));
};

rotationOption2.onReachMax = (osc) => {
  console.info("Values reached max targets osc: ", osc)
};

zlatnaspiralaTxt2.rotation.setRotation(rotationOption2)

```




