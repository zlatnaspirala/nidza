# nidza

2d canvas engine - Scene Object oriented engine without classic auto update/requestAnimationFrame.
There is no events system for rayhits. `Nidza` is exclusively for draws staff.
Objective is CPU low price of usage. You can move object do any animation but on finish there is no any draw calls. This is main objective task to make autoupdater with releasing 
on target/object reach.
Project object is also adding all of kind composition video/webcam/images/text in same tiem and place.

Nidza will be `texture generator` for `matrix-engine` but still this project is indipendent
because can be used for any other project.

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

```js
/**
 *  If you using npm i nidza
 * import { Nidza } from "nidza";
 * If you use nidza from source for dev stage use this
 * there is no build just run http protocol
 */

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
```




