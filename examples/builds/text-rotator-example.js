(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _index = require("../node_modules/nidza/index");

/**
 * @description Create nidza object.
 */
let nidza = new _index.Nidza();
let myFirstNidzaObjectOptions = {
  id: "RotationProgram",
  size: {
    width: 300,
    height: 600
  },
  parentDom: document.getElementById('testHolder')
};
nidza.createNidzaIndentity(myFirstNidzaObjectOptions); // Make shortcut object

let myScene = nidza.access.RotationProgram; // Make it global for debug acces from console in chrome.

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
    y: 15
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
}); // Create one simple oscillator

let rotationOption = new nidza.Osc(0, 360, 2);

rotationOption.onRepeat = function (osc) {
  console.info("Values reached onrepeat targets osc: ", osc);
  zlatnaspiralaTxt.rotation.clearUpdate();
  dispatchEvent(new CustomEvent("deactivate-updater", {
    detail: {
      id: osc.elementIdentity
    }
  }));
};

zlatnaspiralaTxt.rotation.setRotation(rotationOption);
zlatnaspiralaTxt.rotation.osc.setDelay(0);
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
    fontName: ""
  }
});
let rotationOption2 = new nidza.Osc(0, 90, 1, "oscMax");

rotationOption2.onReachMin = osc => {
  console.info("Values reached min targets osc: ", osc);
  zlatnaspiralaTxt2.rotation.clearUpdate();
  dispatchEvent(new CustomEvent("deactivate-updater", {
    detail: {
      id: osc.elementIdentity
    }
  }));
};

rotationOption2.onReachMax = osc => {
  console.info("Values reached max targets osc: ", osc);
};

zlatnaspiralaTxt2.rotation.setRotation(rotationOption2);
/**
 * @description Middle text component
 * Rotate to target angle then rotate back.
 * Use osc.ciklus to determinate who much
 * how many cycles do you want.
 */

let zlatnaspiralaTxt3 = myScene.addTextComponent({
  id: "zlatna3",
  text: "Two cycles",
  color: "black",
  position: {
    x: 50,
    y: 80
  },
  dimension: {
    width: 45,
    height: 18
  },
  border: {
    fillColor: "yellow",
    strokeColor: "black"
  },
  font: {
    fontSize: "20px",
    fontStyle: "",
    fontName: ""
  }
});
let rotationOption3 = new nidza.Osc(0, 90, 1, "oscMax");

rotationOption3.onReachMin = osc => {
  console.info("Values reached min targets osc: ", osc);

  if (osc.ciklus == 2) {
    zlatnaspiralaTxt3.rotation.clearUpdate();
    dispatchEvent(new CustomEvent("deactivate-updater", {
      detail: {
        id: osc.elementIdentity
      }
    }));
  }
};

rotationOption3.onReachMax = osc => {
  console.info("Values reached max targets osc: ", osc);
};

zlatnaspiralaTxt3.rotation.setRotation(rotationOption3);

},{"../node_modules/nidza/index":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Nidza", {
  enumerable: true,
  get: function () {
    return _nidza.Nidza;
  }
});
exports.Utility = void 0;

var _nidza = require("./src/nidza");

var Utility = _interopRequireWildcard(require("./src/lib/utility"));

exports.Utility = Utility;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

},{"./src/lib/utility":16,"./src/nidza":17}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NidzaElement = void 0;

var _position = require("./position");

var _dimension = require("./dimension");

class NidzaElement {
  constructor(arg) {
    this.position = new _position.Position(arg.position.x, arg.position.y);
    this.dimension = new _dimension.Dimension(100, 100);
    this.position.setReferent(arg.canvasDom);
    this.position.elementIdentity = arg.id;
  }

}

exports.NidzaElement = NidzaElement;

},{"./dimension":6,"./position":11}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setReferent = setReferent;

/**
 * @description No need class for this.
 * Use bind is easy in ECMA6.
 */
function setReferent(canvasDom) {
  this.canvasDom = canvasDom; // this.pIdentity = canvasDom.id;

  this.referentCanvasWidth = () => {
    return this.canvasDom.width;
  };

  this.referentCanvasHeight = () => {
    return this.canvasDom.height;
  };
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseShader = void 0;

class BaseShader {
  constructor() {
    console.log("SHADER BASE CLASS");
  }
  /**
   * Creates and compiles a shader.
   *
   * @param {!WebGLRenderingContext} gl The WebGL Context.
   * @param {string} shaderSource The GLSL source code for the shader.
   * @param {number} shaderType The type of shader, VERTEX_SHADER or
   *     FRAGMENT_SHADER.
   * @return {!WebGLShader} The shader.
   */


  compileShader(gl, shaderType, shaderSource) {
    // Create the shader object
    var shader = gl.createShader(shaderType); // Set the shader source code.

    gl.shaderSource(shader, shaderSource); // Compile the shader

    gl.compileShader(shader); // Check if it compiled

    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (!success) {
      // Something went wrong during compilation; get the error
      throw "could not compile shader:" + gl.getShaderInfoLog(shader);
    }

    return shader;
  }
  /**
   * Creates a program from 2 shaders.
   *
   * @param {!WebGLRenderingContext) gl The WebGL context.
   * @param {!WebGLShader} vertexShader A vertex shader.
   * @param {!WebGLShader} fragmentShader A fragment shader.
   * @return {!WebGLProgram} A program.
   */


  createProgram(gl, vertexShader, fragmentShader) {
    // create a program.
    var program = gl.createProgram(); // attach the shaders.

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader); // link the program.

    gl.linkProgram(program); // Check if it linked.

    var success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (!success) {
      // something went wrong with the link
      throw "program failed to link:" + gl.getProgramInfoLog(program);
    }

    return program;
  }
  /**
   * Creates a shader from the content of a script tag.
   *
   * @param {!WebGLRenderingContext} gl The WebGL Context.
   * @param {string} scriptId The id of the script tag.
   * @param {string} opt_shaderType. The type of shader to create.
   *     If not passed in will use the type attribute from the
   *     script tag.
   * @return {!WebGLShader} A shader.
   */


  createShaderFromScript(gl, scriptId, opt_shaderType) {
    // look up the script tag by id.
    var shaderScript = document.getElementById(scriptId);

    if (!shaderScript) {
      throw "*** Error: unknown script element" + scriptId;
    } // extract the contents of the script tag.


    var shaderSource = shaderScript.text; // If we didn't pass in a type, use the 'type' from
    // the script tag.

    if (!opt_shaderType) {
      if (shaderScript.type == "x-shader/x-vertex") {
        opt_shaderType = gl.VERTEX_SHADER;
      } else if (shaderScript.type == "x-shader/x-fragment") {
        opt_shaderType = gl.FRAGMENT_SHADER;
      } else if (!opt_shaderType) {
        throw "*** Error: shader type not set";
      }
    }

    return compileShader(gl, shaderSource, opt_shaderType);
  } // init Shader PRogram from inline 


  initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, fsSource); // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram); // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }
  /**
   * Creates a program from 2 script tags.
   * @param {!WebGLRenderingContext} gl The WebGL Context.
   * @param {string[]} shaderScriptIds Array of ids of the script
   *        tags for the shaders. The first is assumed to be the
   *        vertex shader, the second the fragment shader.
   * @return {!WebGLProgram} A program
   */


  createProgramFromScripts(gl, shaderScriptIds) {
    var vertexShader = createShaderFromScript(gl, shaderScriptIds[0], gl.VERTEX_SHADER);
    var fragmentShader = createShaderFromScript(gl, shaderScriptIds[1], gl.FRAGMENT_SHADER);
    return createProgram(gl, vertexShader, fragmentShader);
  }

}

exports.BaseShader = BaseShader;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dimension = void 0;

var _baseReferent = require("./base-referent");

class Dimension {
  constructor(curentWidth, curentHeight) {
    this.width = curentWidth;
    this.height = curentHeight;
    this.targetX = curentWidth;
    this.targetY = curentHeight;
    this.velX = 0;
    this.velY = 0;
    this.thrust = 0.1;
    this.IN_MOVE = false;

    this.onTargetReached = function () {};

    this.referentCanvasWidth = () => 250;

    this.referentCanvasHeight = () => 250;

    this.setReferent = _baseReferent.setReferent;
    this.elementIdentity = null;
  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  setSpeed(num_) {
    if (typeof num_ === "number") {
      this.thrust = num_;
    } else {
      console.warn("nidza raport : warning for method 'Position.setSpeed'  Desciption : arguments (w , h ) must be type of number.");
    }
  }

  smoothWidth(x) {
    dispatchEvent(new CustomEvent("activate-updater", {
      detail: {
        id: this.elementIdentity
      }
    }));
    this.IN_MOVE = true;
    this.targetX = x;
  }

  smoothHeight(y) {
    dispatchEvent(new CustomEvent("activate-updater", {
      detail: {
        id: this.elementIdentity
      }
    }));
    this.IN_MOVE = true;
    this.targetY = y;
  }

  smooth(x_, y_) {
    dispatchEvent(new CustomEvent("activate-updater", {
      detail: {
        id: this.elementIdentity
      }
    }));
    this.IN_MOVE = true;
    this.targetX = x_;
    this.targetY = y_;
  }

  setDimension(x_, y_, type_) {
    this.targetX = x_;
    this.targetY = y_;
    this.width = x_;
    this.height = y_;
    this.IN_MOVE = false;
    dispatchEvent(new CustomEvent("activate-updater", {
      detail: {
        id: this.elementIdentity,
        oneDraw: true
      }
    }));
  }

  onDone() {
    dispatchEvent(new CustomEvent("deactivate-updater", {
      detail: {
        id: this.elementIdentity
      }
    }));
  }

  update() {
    var tx = this.targetX - this.width,
        ty = this.targetY - this.height,
        dist = Math.sqrt(tx * tx + ty * ty),
        rad = Math.atan2(ty, tx),
        angle = rad / Math.PI * 180;
    this.velX = tx / dist * this.thrust;
    this.velY = ty / dist * this.thrust;

    if (this.IN_MOVE == true) {
      if (dist > this.thrust) {
        this.width += this.velX;
        this.height += this.velY;
      } else {
        this.width = this.targetX;
        this.height = this.targetY;
        this.IN_MOVE = false;
        this.onDone();
        this.onTargetReached();
      }
    }
  }

  getWidth() {
    return this.referentCanvasWidth() / 100 * this.width;
  }

  getHeight() {
    return this.referentCanvasHeight() / 100 * this.height;
  }

}

exports.Dimension = Dimension;

},{"./base-referent":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nidza3dIdentity = void 0;

var _utility = require("./utility");

var _shaderComponent = require("./shader-component");

class Nidza3dIdentity {
  constructor(arg) {
    this.canvasDom = arg.canvasDom;
    this.gl = arg.ctx;
    this.elements = [];
    this.updater = null;
    this.updaterInterval = 1;
    this.uRegister = [];
    console.info("Construct uniq acess key for nidza instance.");
    addEventListener(this.getKey("activate-updater"), this.activateUpdater, {
      passive: true
    });
    addEventListener(this.getKey("deactivate-updater"), this.deactivateUpdater, {
      passive: true
    });
    console.info("Construct 3d webgl access key for nidza instance.");
  }

  attachClickEvent(callback) {
    if ((0, _utility.isMobile)()) {
      this.canvasDom.addEventListener("touchstart", callback, {
        passive: true
      });
    } else {
      this.canvasDom.addEventListener("click", callback, {
        passive: true
      });
    }
  }

  attachMoveEvent(callback) {
    if ((0, _utility.isMobile)()) {
      this.canvasDom.addEventListener("touchmove", callback, {
        passive: true
      });
    } else {
      this.canvasDom.addEventListener("mousemove", callback, {
        passive: true
      });
    }
  }

  onClick() {
    console.info("default indentity-3d click event call.");
  }

  setBackground(arg) {
    this.canvasDom.style.background = arg;
  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  setCanvasBgColor(color) {
    arg.canvasDom.style.background = color;
  }

  addShaderComponent(arg) {
    arg.gl = this.gl;
    arg.canvasDom = this.canvasDom;
    let shaderComponent = new _shaderComponent.ShaderComponent(arg);
    this.elements.push(starComponent);
    shaderComponent.draw();
    return shaderComponent;
  }

  activateUpdater = e => {
    var data = e.detail;

    if (data) {
      if (this.uRegister.indexOf(data.id) == -1) {
        if (data.oneDraw) {
          this.updateScene();
          return;
        } else {
          // resister
          this.uRegister.push(data.id);
        }
      }
    }

    if (!this.isUpdaterActive()) {
      this.updater = setInterval(() => {
        this.updateScene();
      }, this.updaterInterval);
    }
  };
  deactivateUpdater = e => {
    var data = e.detail;

    if (data) {
      var loc = this.uRegister.indexOf(data.id);

      if (loc == -1) {
        console.warn("remove event but not exist", data.id);
      } else {
        this.uRegister.splice(loc, 1);

        if (this.uRegister.length == 0) {
          clearInterval(this.updater);
          this.updater = null;
          console.info("There is no registred active elements -> deactivate updater.");
        }
      }
    }
  };

  isUpdaterActive() {
    if (this.updater == null) {
      return false;
    } else {
      return true;
    }
  }

  updateScene() {
    this.elements.forEach(e => {
      e.reload();
    });
  }

}

exports.Nidza3dIdentity = Nidza3dIdentity;

},{"./shader-component":13,"./utility":16}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NidzaIdentity = void 0;

var _textComponent = require("./text-component");

var _starComponent = require("./star-component");

var _matrixComponent = require("./matrix-component");

var _utility = require("./utility");

class NidzaIdentity {
  constructor(arg) {
    this.canvasDom = arg.canvasDom;
    this.ctx = arg.ctx;
    this.elements = arg.elements;
    this.clearOnUpdate = true;
    this.updaterIsLive = false;
    this.updater = null;
    this.updaterInterval = 1;
    this.uRegister = [];
    console.info("Construct uniq acess key for nidza instance.");
    addEventListener(this.getKey('activate-updater'), this.activateUpdater, {
      passive: true
    });
    addEventListener(this.getKey('deactivate-updater'), this.deactivateUpdater, {
      passive: true
    });
    this.setupGlobalCtx();
  }

  attachClickEvent(callback) {
    if ((0, _utility.isMobile)()) {
      this.canvasDom.addEventListener("touchstart", callback, {
        passive: true
      });
    } else {
      this.canvasDom.addEventListener("click", callback, {
        passive: true
      });
    }
  }

  attachMoveEvent(callback) {
    if ((0, _utility.isMobile)()) {
      this.canvasDom.addEventListener("touchmove", callback, {
        passive: true
      });
    } else {
      this.canvasDom.addEventListener("mousemove", callback, {
        passive: true
      });
    }
  }

  onClick() {
    console.info('default indentity click event call.');
  }

  setBackground(arg) {
    this.canvasDom.style.background = arg;
  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  setupGlobalCtx() {
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
  }

  setCanvasBgColor(color) {
    arg.canvasDom.style.background = color;
  }

  addTextComponent(arg) {
    arg.ctx = this.ctx;
    arg.canvasDom = this.canvasDom;
    let textComponent = new _textComponent.NidzaTextComponent(arg);
    textComponent.draw();
    this.elements.push(textComponent);
    return textComponent;
  }

  addStarComponent(arg) {
    arg.ctx = this.ctx;
    arg.canvasDom = this.canvasDom;
    let starComponent = new _starComponent.NidzaStarComponent(arg);
    starComponent.draw();
    this.elements.push(starComponent);
    return starComponent;
  }

  addMatrixComponent(arg) {
    arg.ctx = this.ctx;
    arg.canvasDom = this.canvasDom;
    let starComponent = new _matrixComponent.NidzaMatrixComponent(arg);
    starComponent.draw();
    this.elements.push(starComponent);
    return starComponent;
  }

  activateUpdater = e => {
    var data = e.detail;

    if (data) {
      if (this.uRegister.indexOf(data.id) == -1) {
        if (data.oneDraw) {
          this.updateScene();
          return;
        } else {
          // resister
          this.uRegister.push(data.id);
        }
      }
    }

    if (!this.isUpdaterActive()) {
      this.updater = setInterval(() => {
        this.updateScene();
      }, this.updaterInterval);
    }
  };
  deactivateUpdater = e => {
    var data = e.detail;

    if (data) {
      var loc = this.uRegister.indexOf(data.id);

      if (loc == -1) {
        console.warn("remove event but not exist", data.id);
      } else {
        this.uRegister.splice(loc, 1);

        if (this.uRegister.length == 0) {
          clearInterval(this.updater);
          this.updater = null;
          console.info("There is no registred active elements -> deactivate updater.");
        }
      }
    }
  };

  isUpdaterActive() {
    if (this.updater == null) {
      return false;
    } else {
      return true;
    }
  }

  updateScene() {
    if (this.clearOnUpdate) {
      this.ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
    }

    this.elements.forEach(e => {
      e.position.update();
      e.dimension.update();
      e.rotation.update();
      e.draw();
    });
  }

  print() {
    console.log('I am big holder nothing else.');
  }

  getElementById(id) {
    return this.elements.filter(element => element.id == id)[0];
  }

  setupMatrix1() {
    this.canvasDom.style.background = "";
    this.canvasDom.className = "matrix1";
  }

}

exports.NidzaIdentity = NidzaIdentity;

},{"./matrix-component":9,"./star-component":14,"./text-component":15,"./utility":16}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NidzaMatrixComponent = void 0;

var _baseComponent = require("./base-component");

var _operations = require("./operations");

var _utility = require("./utility");

var _rotation = require("./rotation");

class NidzaMatrixComponent extends _baseComponent.NidzaElement {
  constructor(arg) {
    const eArg = {
      position: arg.position,
      id: arg.id,
      canvasDom: arg.canvasDom
    };
    super(eArg);
    this.id = arg.id;
    this.text = arg.text;
    this.color = arg.color || 'black';
    this.centralObjectS = new _operations.Osc(0, 360, 1);
    this.centralObjectS.setDelay(110);
    this.centralObjectE = new _operations.Osc(0, 360, 1.2);
    this.centralObjectE.setDelay(110);
    this.centralObjectRadius = new _operations.Osc(0, 22, 1);
    this.centralObjectRadius.regimeType = "oscMin";
    this.centralObjectRadius.setDelay(330);
    this.centralObjectRadiusLocal = new _operations.Osc(10, 15, 1);
    this.centralObjectRadiusLocal.regimeType = "oscMin";
    this.centralObjectRadiusLocal.setDelay(22);
    this.centralObjectLineW = new _operations.Osc(1, 44, 1);
    this.centralObjectLineW.regimeType = "oscMin";
    this.centralObjectLineW.setDelay(11);
    this.objectLineW = new _operations.Osc(2, 4, 1);
    this.objectLineW.setDelay(22);
    this.objectGlobalAlpha = new _operations.Osc(0, 1, 0.01);
    this.objectGlobalAlpha.regimeType = "oscMin";
    this.objectGlobalAlpha.setDelay(11);
    this.colorR = new _operations.Osc(0, 11, 1);
    this.colorR.regimeType = "oscMin";
    this.colorG = new _operations.Osc(77, 222, 1);
    this.colorG.regimeType = "oscMin";
    this.colorB = new _operations.Osc(0, 11, 1);
    this.colorB.regimeType = "oscMin";
    this.colorR.setDelay(0);
    this.colorB.setDelay(0);
    this.colorG.setDelay(0);
    this.fontSizeInternal = 28;
    this.columns = Math.floor(this.dimension.getWidth() / 2);
    this.drops = [];

    for (var i = 0; i < this.columns / 1.77; i++) {
      this.drops.push(0);
    } // Must be optimized with new override draws who setup font
    // for now i use flag `isActive`.


    this.font = {
      isActive: false,
      fontSize: "30px",
      fontStyle: "bold",
      fontName: "serif"
    };

    if (arg.font) {
      this.font = {
        isActive: true,
        fontSize: arg.font.fontSize,
        fontStyle: arg.font.fontStyle,
        fontName: arg.font.fontName
      };
    }

    this.ctx = arg.ctx;
    this.canvasDom = arg.canvasDom;
    this.draw = this.drawSimpleMatrix;
    this.drawRotatedText = this.drawRotatedMatrix; // this.drawRotatedBorderText = drawRotatedBorderText;
    // this.drawBorder = drawBorder;
    // this.drawWithBorder = drawWithBorder;

    this.border = {
      typeOfDraw: 'fill-stroke',
      isActive: true,
      fillColor: 'gold',
      strokeColor: 'red',
      radius: 10
    };

    if (arg.border) {
      this.border = {
        typeOfDraw: arg.border.typeOfDraw || 'fill-stroke',
        isActive: true,
        fillColor: arg.border.fillColor || 'gold',
        strokeColor: arg.border.strokeColor || 'red',
        radius: arg.border.radius || 10
      };
      this.setBorder(this.border);
    }

    this.rotation = new _rotation.Rotator(this.id, this.canvasDom.id);
    this.rotation.setId(this.id);
    addEventListener(this.getKey("activate-rotator"), this.activateRotator, false);
    var newW = 20,
        newH = 20;

    if (arg.dimension) {
      newW = arg.dimension.width || 20;
      newH = arg.dimension.height || 20;
    }

    this.dimension.setReferent(this.canvasDom);
    this.dimension.elementIdentity = this.id;
    this.dimension.setDimension(newW, newH);
  }

  getColor() {
    return "rgb(" + this.colorR.getValue() + ", " + this.colorG.getValue() + ", " + this.colorB.getValue() + ")";
  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  getFont() {
    return this.font.fontStyle + " " + this.font.fontSize + " " + this.font.fontName;
  }

  setBorder(arg) {
    if (arg) {
      this.border = {
        typeOfDraw: arg.typeOfDraw || 'fill-stroke',
        isActive: true,
        fillColor: arg.fillColor || 'gold',
        strokeColor: arg.strokeColor || 'red',
        radius: arg.radius || 10
      };
    }

    this.border.isActive = true;

    if (this.rotation && this.rotation.isActive) {// this.draw = this.drawRotatedBorderText;
    } else {// this.draw = this.drawWithBorder;
    }
  } // Important - overriding is here
  // flag rotation.isActive indicate


  activateRotator = () => {
    if (this.rotation.isActive == false) {
      this.rotation.isActive = true;
      this.draw = this.drawRotatedText;
    }

    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), {
      detail: {
        id: this.elementIdentity // oneDraw: true

      }
    }));
  };
  /**
   * @description Draw Matrix effect component:
   *  - Simple
   */

  drawSimpleMatrix() {
    this.ctx.save();
    if (this.font.isActive) this.ctx.font = this.getFont();
    this.ctx.fillStyle = this.getColor(); // this.ctx.fillRect(0, 0, this.canvasDom.width, this.canvasDom.height);

    this.ctx.fontSize = "700 " + this.fontSizeInternal + "px"; // this.ctx.fillStyle = "#00cc33";

    for (var i = 0; i < this.columns; i++) {
      var index = Math.floor(Math.random() * this.text.length);
      var x = i * this.fontSizeInternal;
      var y = this.drops[i] * this.fontSizeInternal;
      this.ctx.shadowBlur = 122;
      this.ctx.fillText(this.text[index], x, y - 35, this.dimension.getWidth() * 10);
      this.ctx.shadowBlur = 22;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText(this.text[index], x, y - 15, this.dimension.getWidth() * 10);
      this.ctx.fillText(this.text[index], x, y + 10, this.dimension.getWidth());
      this.ctx.shadowBlur = 15;
      this.ctx.fillText(this.text[index], x, y + 30, this.dimension.getWidth());
      this.ctx.fillStyle = this.getColor();
      this.ctx.font = "bold " + (0, _utility.getRandomIntFromTo)(9, 30) + "px " + this.font.fontName;
      this.ctx.strokeStyle = this.getColor();
      this.ctx.shadowBlur = 25;
      this.ctx.shadowColor = 'black';
      this.ctx.fillText(this.text[index], y, x, this.dimension.getWidth());
      this.ctx.strokeText(this.text[index], y + 5, x + 5, this.dimension.getWidth());
      this.ctx.strokeText(this.text[index], y + 25, x + 25, this.dimension.getWidth());
      this.ctx.beginPath();
      this.ctx.arc(x, y, (0, _utility.getRandomArbitrary)(1, 50), 0, (0, _utility.getRandomArbitrary)(1, 2) * Math.PI);
      this.ctx.stroke();
      this.ctx.shadowBlur = 1;
      this.ctx.globalAlpha = this.objectGlobalAlpha.getValue();
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.centralObjectRadiusLocal.getValue(), this.centralObjectS.getValue() * Math.PI / 180, this.centralObjectE.getValue() * Math.PI / 180);
      this.ctx.arc(x, y, this.centralObjectRadiusLocal.getValue(), this.centralObjectS.getValue() * Math.PI / 180, this.centralObjectE.getValue() * Math.PI / 180, true);
      this.ctx.closePath();
      this.ctx.lineWidth = this.centralObjectLineW.getValue();
      this.ctx.stroke();
      this.ctx.fillStyle = this.getColor();
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = this.getColor();
      this.ctx.beginPath();
      this.ctx.arc(this.position.getX(), this.position.getY(), this.centralObjectRadius.getValue(), this.centralObjectS.getValue() * Math.PI / 180, this.centralObjectE.getValue() * Math.PI / 180);
      this.ctx.arc(this.position.getX(), this.position.getY(), this.centralObjectRadius.getValue(), this.centralObjectS.getValue() * Math.PI / 180, this.centralObjectE.getValue() * Math.PI / 180, true);
      this.ctx.closePath();
      this.ctx.lineWidth = this.centralObjectLineW.getValue();
      this.ctx.stroke();
      this.ctx.fillStyle = this.getColor();
      this.ctx.fill();
      this.ctx.lineWidth = this.objectLineW.getValue();
      ;

      if (y >= this.canvasDom.height && Math.random() > 0.99) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    } // this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());


    this.ctx.restore();
  }

  drawRotatedMatrix() {
    this.ctx.save();
    this.ctx.translate(this.position.getX(), this.position.getY());
    this.ctx.rotate(toRad(this.rotation.angle));
    if (this.font.isActive) this.ctx.font = this.getFont(); // this.ctx.fillRect(0, 0, this.canvasDom.width, this.canvasDom.height);

    this.ctx.fontSize = "700 " + this.fontSizeInternal + "px";
    this.ctx.fillStyle = "#00cc33";

    for (var i = 0; i < this.columns; i++) {
      var index = Math.floor(Math.random() * this.text.length);
      var x = i * this.fontSizeInternal;
      var y = this.drops[i] * this.fontSizeInternal;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = '#fff';
      this.ctx.fillText(this.text[index], x, y, this.dimension.getWidth() * 10);
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = 'lime';
      this.ctx.fillText(this.text[index], x + 2, y + 2, this.dimension.getWidth() * 10);

      if (y >= this.canvasDom.height && Math.random() > 0.99) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    }

    this.ctx.restore();
  }

}

exports.NidzaMatrixComponent = NidzaMatrixComponent;

},{"./base-component":3,"./operations":10,"./rotation":12,"./utility":16}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRad = toRad;
exports.drawRotatedText = drawRotatedText;
exports.drawRotatedBorderText = drawRotatedBorderText;
exports.drawBorder = drawBorder;
exports.drawWithBorder = drawWithBorder;
exports.drawSimpleText = drawSimpleText;
exports.drawStar = drawStar;
exports.drawStarRotation = drawStarRotation;
exports.Osc = void 0;

var _utility = require("./utility");

/**
 * @description Diffrent variant of math and
 * draws calculation data.
 */

/**
 * @description
 * Osc is math Value Oscilator.
 * Argument regimeType is optimal
 */
class Osc {
  constructor(start, finish, step, regimeType) {
    this.elementIdentity = null;
    this.step = 1;
    this.start = 0;
    this.finish = 10;
    this.value = 0;
    this.delay = 2;
    this.delayInitial = 2;
    this.regimeType = "REPEAT";
    this.value = start;
    this.start = start;
    this.finish = finish;
    this.step = step;

    if (regimeType) {
      this.regimeType = regimeType;
    }

    this.ciklus = 0;
  }

  resetCiklus() {
    this.ciklus = 0;
  }

  setNewSeqFrameRegimeType(newSeqType) {
    this.regimeType = newSeqType;
  }

  setNewValue(newValue) {
    this.value = newValue;
  }

  setDelay(newDelay) {
    this.delay = newDelay;
    this.delayInitial = newDelay;
  }

  getRawValue() {
    return this.value;
  }

  getValue() {
    if (this.regimeType === "CONST") {
      return this.value;
    }

    if (this.delay > 0) {
      this.delay--;
      return this.value;
    }

    this.delay = this.delayInitial;

    if (this.regimeType !== "oscMin" && this.regimeType !== "oscMax") {
      if (this.value + this.step <= this.finish) {
        this.value = this.value + this.step;
        return this.value;
      } else {
        switch (this.regimeType) {
          case "STOP":
            {
              this.ciklus++;
              this.onStop(this);
              return this.value;
            }

          case "REPEAT":
            {
              this.ciklus++;
              this.value = this.start;
              this.onRepeat(this);
              return this.value;
            }

          default:
            console.warn("NO CASE");
        }
      }
    } else {
      if (this.regimeType === "oscMin") {
        if (this.value - this.step >= this.start) {
          this.value = this.value - this.step;
          return this.value;
        } else {
          this.regimeType = "oscMax";
          if (this.ciklus > 0) this.onReachMin(this);
          return this.value;
        }
      } else if (this.regimeType === "oscMax") {
        if (this.value + this.step <= this.finish) {
          this.value = this.value + this.step;
          return this.value;
        } else {
          this.onReachMax(this);
          this.regimeType = "oscMin";
          this.ciklus++;
          return this.value;
        }
      }
    }

    return 0;
  }

  onReachMax() {// console.info( 'on reach max default log' )
  }

  onReachMin() {// console.info( 'on reach min default log' )
  }

  onStop() {
    console.info('on stop default log');
  }

  onRepeat() {// console.info('on repeat default log');
  }

}
/**
 * @description Convert angle to radians
 */


exports.Osc = Osc;

function toRad(angle) {
  if (typeof angle === "string" || typeof angle === "number") {
    return angle * (Math.PI / 180);
  } else {
    console.warn("toRad, Input arg angle " + typeof angle + " << must be string or number.");
  }
}
/**
 * @description Draw Text with:
 *  - rotation procedure
 */


function drawRotatedText() {
  this.ctx.save();
  this.ctx.translate(this.position.getX(), this.position.getY());
  this.ctx.rotate(toRad(this.rotation.angle));
  if (this.font.isActive) this.ctx.font = this.getFont();
  this.ctx.fillText(this.text, 0, 0, this.dimension.getWidth(), this.dimension.getHeight());
  this.ctx.restore();
}
/**
 * @description Draw Text with:
 *  - rotation procedure
 *  - Border procedure
 */


function drawRotatedBorderText() {
  this.ctx.save();
  this.ctx.translate(this.position.getX(), this.position.getY());
  this.ctx.rotate(toRad(this.rotation.angle));
  if (this.font.isActive) this.ctx.font = this.getFont();
  this.drawBorder(0, 0, this.dimension.getWidth(), this.dimension.getHeight(), 10, this.border.fillColor, this.border.strokeColor, this.border.typeOfDraw);
  this.ctx.fillStyle = this.color;
  this.ctx.fillText(this.text, 0, 0, this.dimension.getWidth(), this.dimension.getHeight());
  this.ctx.restore();
}
/**
 * @description Draw Text vs Border with
 * radius option for rounded corners
 */


function drawBorder(x, y, width, height, radius, fillColor, strokeColor, type) {
  this.ctx.save();
  this.ctx.strokeStyle = strokeColor;
  this.ctx.fillStyle = fillColor;
  x -= width / 2;
  y -= height / 2;
  this.ctx.beginPath();
  this.ctx.moveTo(x, y + radius);
  this.ctx.lineTo(x, y + height - radius);
  this.ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  this.ctx.lineTo(x + width - radius, y + height);
  this.ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  this.ctx.lineTo(x + width, y + radius);
  this.ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  this.ctx.lineTo(x + radius, y);
  this.ctx.quadraticCurveTo(x, y, x, y + radius);

  if (type == "fill-stroke") {
    this.ctx.fill();
    this.ctx.stroke();
  } else if (type == "stroke") {
    this.ctx.stroke();
  } else if (type == "fill") {
    this.ctx.fill();
  }

  this.ctx.restore();
}
/**
 * @description Draw Text:
 *  - Border procedure
 */


function drawWithBorder() {
  this.ctx.save();
  if (this.font.isActive) this.ctx.font = this.getFont();
  this.drawBorder(this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight(), 10, this.border.fillColor, this.border.strokeColor, this.border.typeOfDraw);
  this.ctx.fillStyle = this.color;
  this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());
  this.ctx.restore();
}
/**
 * @description Draw Text:
 *  - Simple
 */


function drawSimpleText() {
  this.ctx.save();
  if (this.font.isActive) this.ctx.font = this.getFont();
  this.ctx.fillStyle = this.color;
  this.ctx.fillText(this.text, this.position.getX(), this.position.getY(), this.dimension.getWidth(), this.dimension.getHeight());
  this.ctx.restore();
}

function drawStar() {
  this.ctx.beginPath();
  this.ctx.save();
  this.fillStyle = this.color;
  this.ctx.translate(this.position.getX(), this.position.getY());
  this.ctx.moveTo(0, 0 - this.radius);

  for (let i = 0; i < this.n; i++) {
    this.ctx.rotate(Math.PI / this.n);
    this.ctx.lineTo(0, 0 - this.radius * this.inset);
    this.ctx.rotate(Math.PI / this.n);
    this.ctx.lineTo(0, 0 - this.radius);
  }

  this.ctx.closePath();
  this.ctx.stroke();
  this.ctx.fill();
  this.ctx.restore();
}

function drawStarRotation() {
  this.ctx.beginPath();
  this.ctx.save();
  this.ctx.fillStyle = this.color;
  this.ctx.translate(0, 0);
  this.ctx.moveTo(0, 0 - this.radius);

  for (let i = 0; i < this.n; i++) {
    this.ctx.rotate(Math.PI / this.n);
    this.ctx.lineTo(0, 0 - this.radius * this.inset);
    this.ctx.rotate(Math.PI / this.n);
    this.ctx.lineTo(0, 0 - this.radius);
  }

  this.ctx.closePath();
  this.ctx.stroke();
  this.ctx.fill();
  this.ctx.restore();
}

},{"./utility":16}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Position = void 0;

var _baseReferent = require("./base-referent");

class Position {
  constructor(curentX, curentY) {
    this.x = curentX;
    this.y = curentY;
    this.targetX = curentX;
    this.targetY = curentY;
    this.velX = 0;
    this.velY = 0;
    this.thrust = 0.1;
    this.IN_MOVE = false;

    this.onTargetReached = function () {};

    this.setReferent = _baseReferent.setReferent;

    this.referentCanvasWidth = () => 250;

    this.referentCanvasHeight = () => 250;

    this.elementIdentity = null;
    this.pIdentity = null;
  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  onDone() {
    dispatchEvent(new CustomEvent(this.getKey("deactivate-updater"), {
      detail: {
        id: this.elementIdentity
      }
    }));
  }

  setSpeed(num_) {
    if (typeof num_ === "number") {
      this.thrust = num_;
    } else {
      console.warn("Warning for method 'Position.setSpeed' : args (w, h) must be type of number.");
    }
  }

  translateX(x) {
    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), {
      detail: {
        id: this.elementIdentity
      }
    }));
    this.IN_MOVE = true;
    this.targetX = x;
  }

  translateY(y) {
    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), {
      detail: {
        id: this.elementIdentity
      }
    }));
    this.IN_MOVE = true;
    this.targetY = y;
  }

  translate(x_, y_) {
    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), {
      detail: {
        id: this.elementIdentity
      }
    }));
    this.IN_MOVE = true;
    this.targetX = x_;
    this.targetY = y_;
  }

  setPosition(x_, y_, type_) {
    this.targetX = x_;
    this.targetY = y_;
    this.x = x_;
    this.y = y_;
    this.IN_MOVE = false;
    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), {
      detail: {
        id: this.elementIdentity,
        oneDraw: true
      }
    }));
  }

  update() {
    var tx = this.targetX - this.x,
        ty = this.targetY - this.y,
        dist = Math.sqrt(tx * tx + ty * ty),
        rad = Math.atan2(ty, tx),
        angle = rad / Math.PI * 180;
    this.velX = tx / dist * this.thrust;
    this.velY = ty / dist * this.thrust;

    if (this.IN_MOVE == true) {
      if (dist > this.thrust) {
        this.x += this.velX;
        this.y += this.velY;
      } else {
        this.x = this.targetX;
        this.y = this.targetY;
        this.IN_MOVE = false;
        this.onDone();
        this.onTargetReached();
      }
    }
  }

  getX() {
    return this.referentCanvasWidth() / 100 * this.x;
  }

  getY() {
    return this.referentCanvasHeight() / 100 * this.y;
  }

}

exports.Position = Position;

},{"./base-referent":4}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rotator = void 0;

var _operations = require("./operations");

class Rotator {
  constructor(eleId, identityId) {
    this.isActive = false;
    this.angle = 0;
    this.osc = null;
    this.elementIdentity = null;

    this.updateOrigin = () => {};

    this.update = () => {};

    this.elementIdentity = eleId;
    this.nIndentity = identityId;
  }

  getKey(action) {
    return action + this.nIndentity;
  }

  clearUpdate() {
    this.update = this.updateOrigin;
  }

  setId(id) {
    if (this.osc != null) this.osc.elementIdentity = id;
  }

  setAngle(angle) {
    this.clearUpdate();

    if (!this.isActive) {
      dispatchEvent(new CustomEvent(this.getKey("activate-rotator"), {
        detail: {
          id: this.elementIdentity
        }
      }));
    }

    this.angle = angle;
    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), {
      detail: {
        id: this.elementIdentity,
        oneDraw: true
      }
    }));
  }

  setRotation(osc) {
    if (osc instanceof _operations.Osc) {
      this.osc = osc;
      this.osc.elementIdentity = this.elementIdentity;
    } else {
      console.warn("Rotator use default rotation setup.");
      this.osc = new _operations.Osc(0, 360, 0.5);
    } // can be handled more...
    // no need always 


    this.update = this.updateOsc;

    if (!this.isActive) {
      dispatchEvent(new CustomEvent(this.getKey("activate-rotator"), {
        detail: {
          id: this.elementIdentity
        }
      }));
    }

    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), {
      detail: {
        id: this.elementIdentity
      }
    }));
  }

  updateOsc() {
    this.angle = this.osc.getValue();
  }

}

exports.Rotator = Rotator;

},{"./operations":10}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShaderComponent = void 0;

var _baseShaderComponent = require("./base-shader-component");

var _operations = require("./operations");

class ShaderComponent extends _baseShaderComponent.BaseShader {
  constructor(arg) {
    super();
    this.gl = arg.gl;
    console.log('Arg -> ', arg); // Just alias

    this.reloadBuffers = this.initBuffers; // params

    this.rotationX = new _operations.Osc(0, 360, 0.1, 'oscMin');
    this.rotationX.setDelay(5);
    this.rotationY = new _operations.Osc(0, 360, 0.1, 'oscMin');
    this.rotationY.setDelay(5);
    this.rotationZ = new _operations.Osc(0, 360, 0.1, 'oscMin');
    this.rotationZ.setDelay(5);
    this.rotationX.regimeType = "CONST";
    this.rotationZ.regimeType = "CONST";
    this.rotationY.regimeType = "CONST";
    this.rotator = {
      x: () => this.rotationX.getValue(),
      y: () => this.rotationY.getValue(),
      z: () => this.rotationZ.getValue()
    };
    this.background = [0.5, 0.0, 0.0, 1.0];
    this.vertexCount = 4; // cube default

    this.position = [-0.0, 0.0, -2.0];
    this.geometry = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
    this.colors = [1.0, 1.0, 1.0, 1.0, // white
    1.0, 0.0, 0.0, 1.0, // red
    0.0, 1.0, 0.0, 1.0, // green
    0.0, 0.0, 1.0, 1.0 // blue
    ];
    const shaderProgram = this.initShaderProgram(this.gl, this.initDefaultVSShader(), this.initDefaultFSShader());
    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: this.gl.getAttribLocation(shaderProgram, 'aVertexColor')
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
      }
    };
    this.buffers = this.initBuffers(this.gl);
    this.draw();
    console.log('ShaderComponent init default shader with single call draw.');
  } // move it to common latter


  degToRad(degrees) {
    return degrees * Math.PI / 180;
  }

  reload() {
    this.buffers = this.reloadBuffers(this.gl);
    this.draw();
  }

  initDefaultFSShader() {
    const fsSource = `
      varying lowp vec4 vColor;

      void main(void) {
        gl_FragColor = vColor;
      }
    `;
    return fsSource;
  }

  initDefaultVSShader() {
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec4 aVertexColor;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      varying lowp vec4 vColor;

      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;
      }
    `;
    return vsSource;
  }

  initBuffers(gl) {
    const positionBuffer = gl.createBuffer(); // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Now create an array of positions/geometry for the square.
    // geometry

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.geometry), gl.STATIC_DRAW); // Colors

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
    return {
      position: positionBuffer,
      color: colorBuffer
    };
  }

  draw() {
    this.gl.clearColor(this.background[0], this.background[1], this.background[2], this.background[3]); // Clear to black, fully opaque

    this.gl.clearDepth(1.0); // Clear everything

    this.gl.enable(this.gl.DEPTH_TEST); // Enable depth testing

    this.gl.depthFunc(this.gl.LEQUAL); // Near things obscure far things
    // Clear the canvas before we start drawing on it.

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT); // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180; // in radians

    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create(); // note: glmatrix.js always has the first argument
    // as the destination to receive the result.

    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar); // Set the drawing position to the "identity" point, which is
    // the center of the scene.

    const modelViewMatrix = mat4.create(); // Now move the drawing position a bit to where we want to
    // start drawing the square.

    mat4.translate(modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    this.position); // amount to translate

    mat4.rotate(modelViewMatrix, modelViewMatrix, this.degToRad(this.rotator.x()), [1, 0, 0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, this.degToRad(this.rotator.y()), [0, 1, 0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, this.degToRad(this.rotator.z()), [0, 0, 1]); // Tell WebGL how to pull out the positions/geometry from the position
    // buffer into the vertexPosition attribute.

    {
      const numComponents = 2;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
      this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
    } // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.

    {
      const numComponents = 4;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);
      this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexColor, numComponents, type, normalize, stride, offset);
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexColor);
    } // Tell WebGL to use our program when drawing

    this.gl.useProgram(this.programInfo.program); // Set the shader uniforms

    this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
    {
      const offset = 0;
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, this.geometry.length / 2);
    }
  }

}

exports.ShaderComponent = ShaderComponent;

},{"./base-shader-component":5,"./operations":10}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NidzaStarComponent = void 0;

var _baseComponent = require("./base-component");

var _operations = require("./operations");

var _rotation = require("./rotation");

class NidzaStarComponent extends _baseComponent.NidzaElement {
  constructor(arg) {
    const eArg = {
      position: arg.position,
      id: arg.id,
      canvasDom: arg.canvasDom
    };
    super(eArg);
    this.id = arg.id;
    this.radius = arg.radius;
    this.n = arg.n;
    this.inset = arg.inset;
    this.ctx = arg.ctx;
    this.canvasDom = arg.canvasDom;
    this.color = arg.color;
    this.rotation = new _rotation.Rotator(this.id, this.canvasDom.id);
    this.rotation.setId(this.id);
    addEventListener(this.getKey("activate-rotator"), this.activateRotator, false);
    this.draw = _operations.drawStar;
    this.drawStarRotation = _operations.drawStarRotation;
  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  activateRotator = angle => {
    if (!this.rotation.isActive) {
      this.draw = this.drawRotatedStar;
      this.rotation.isActive = true;
    }

    this.rotation.angle = angle;
    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), {
      detail: {
        id: this.elementIdentity,
        oneDraw: true
      }
    }));
  };

  drawRotatedStar() {
    this.ctx.save();
    this.ctx.translate(this.position.getX(), this.position.getY());
    this.ctx.rotate((0, _operations.toRad)(this.rotation.angle));
    this.drawStarRotation();
    this.ctx.restore();
  }

}

exports.NidzaStarComponent = NidzaStarComponent;

},{"./base-component":3,"./operations":10,"./rotation":12}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NidzaTextComponent = void 0;

var _baseComponent = require("./base-component");

var _operations = require("./operations");

var _rotation = require("./rotation");

class NidzaTextComponent extends _baseComponent.NidzaElement {
  constructor(arg) {
    const eArg = {
      position: arg.position,
      id: arg.id,
      canvasDom: arg.canvasDom
    };
    super(eArg);
    this.id = arg.id;
    this.text = arg.text;
    this.color = arg.color || 'black'; // Must be optimized with new override draws who setup font
    // for now i use flag `isActive`.

    this.font = {
      isActive: false,
      fontSize: "30px",
      fontStyle: "bold",
      fontName: "serif"
    };

    if (arg.font) {
      this.font = {
        isActive: true,
        fontSize: arg.font.fontSize,
        fontStyle: arg.font.fontStyle,
        fontName: arg.font.fontName
      };
    }

    this.ctx = arg.ctx;
    this.canvasDom = arg.canvasDom;
    this.draw = _operations.drawSimpleText;
    this.drawRotatedText = _operations.drawRotatedText;
    this.drawRotatedBorderText = _operations.drawRotatedBorderText;
    this.drawBorder = _operations.drawBorder;
    this.drawWithBorder = _operations.drawWithBorder;
    this.border = {
      typeOfDraw: 'fill-stroke',
      isActive: false,
      fillColor: 'gold',
      strokeColor: 'red',
      radius: 10
    };

    if (arg.border) {
      this.border = {
        typeOfDraw: arg.border.typeOfDraw || 'fill-stroke',
        isActive: true,
        fillColor: arg.border.fillColor || 'gold',
        strokeColor: arg.border.strokeColor || 'red',
        radius: arg.border.radius || 10
      };
      this.setBorder(this.border);
    }

    this.rotation = new _rotation.Rotator(this.id, this.canvasDom.id);
    this.rotation.setId(this.id);
    addEventListener(this.getKey("activate-rotator"), this.activateRotator, false);
    var newW = 20,
        newH = 20;

    if (arg.dimension) {
      newW = arg.dimension.width || 20;
      newH = arg.dimension.height || 20;
    }

    this.dimension.setReferent(this.canvasDom);
    this.dimension.elementIdentity = this.id;
    this.dimension.setDimension(newW, newH);
  }

  getKey(action) {
    return action + this.canvasDom.id;
  }

  getFont() {
    return this.font.fontStyle + " " + this.font.fontSize + " " + this.font.fontName;
  }

  setBorder(arg) {
    if (arg) {
      this.border = {
        typeOfDraw: arg.typeOfDraw || 'fill-stroke',
        isActive: true,
        fillColor: arg.fillColor || 'gold',
        strokeColor: arg.strokeColor || 'red',
        radius: arg.radius || 10
      };
    }

    this.border.isActive = true;

    if (this.rotation && this.rotation.isActive) {
      this.draw = this.drawRotatedBorderText;
    } else {
      this.draw = this.drawWithBorder;
    }
  } // Important - overriding is here
  // flag rotation.isActive indicate


  activateRotator = () => {
    if (this.rotation.isActive == false) {
      this.rotation.isActive = true;

      if (this.border.isActive) {
        this.draw = this.drawRotatedBorderText;
      } else {
        this.draw = this.drawRotatedText;
      }
    }

    dispatchEvent(new CustomEvent(this.getKey("activate-updater"), {
      detail: {
        id: this.elementIdentity,
        oneDraw: true
      }
    }));
  };
}

exports.NidzaTextComponent = NidzaTextComponent;

},{"./base-component":3,"./operations":10,"./rotation":12}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importAsync = importAsync;
exports.loadAsync = loadAsync;
exports.loadSync = loadSync;
exports.isMobile = isMobile;
exports.getRandomIntFromTo = getRandomIntFromTo;
exports.getRandomArbitrary = getRandomArbitrary;
exports.convert = exports.QueryUrl = void 0;

function importAsync(src, callback) {
  var s, r, t;
  r = false;
  s = document.createElement('script'); // s.type = 'text/javascript';

  s.type = 'module';
  s.src = src;

  s.onload = s.onreadystatechange = function () {
    if (!r && (!this.readyState || this.readyState == 'complete')) {
      r = true;
      callback();
    }
  };

  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}

function loadAsync(src, callback) {
  var s, r, t;
  r = false;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;

  s.onload = s.onreadystatechange = function () {
    if (!r && (!this.readyState || this.readyState == 'complete')) {
      r = true;
      callback();
    }
  };

  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}

function loadSync(src, callback) {
  var s, r, t;
  r = false;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = false;
  s.src = src;

  s.onload = s.onreadystatechange = function () {
    if (!r && (!this.readyState || this.readyState == 'complete')) {
      r = true;
      callback();
    }
  };

  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}

var QueryUrl = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (typeof query_string[pair[0]] === 'undefined') {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof query_string[pair[0]] === 'string') {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }

  return query_string;
};

exports.QueryUrl = QueryUrl;

function isMobile() {
  const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
  return toMatch.some(toMatchItem => {
    return navigator.userAgent.match(toMatchItem);
  });
}

let convert = {
  PER_TO_PIX: function (v) {
    var o = window.innerWidth / 100;
    return v * o;
  },
  PIX_TO_PER: function (v) {
    var o = window.innerWidth / 100;
    return v / o;
  },
  PER_TO_PIY: function (v) {
    var o = window.innerHeight / 100;
    return v * o;
  },
  PIY_TO_PER: function (v) {
    var o = window.innerHeight / 100;
    return v / o;
  }
};
exports.convert = convert;

function getRandomIntFromTo(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nidza = void 0;

var _identity = require("./lib/identity");

var _identity3d = require("./lib/identity-3d");

var _operations = require("./lib/operations");

class Nidza {
  constructor() {
    this.access = {}; // Reference

    this.Osc = _operations.Osc;
    console.info("Nidza engine constructed.");
  }

  prepareCanvas(arg) {
    let c = document.createElement('canvas');
    let cStyle = "background: black";
    c.id = arg.id;
    c.setAttribute("style", cStyle);
    c.width = arg.size.width;
    c.height = arg.size.height;
    return c;
  }

  createNidzaIndentity(arg) {
    let c = this.prepareCanvas(arg);
    var ctx = c.getContext("2d");
    this.canvasDom = c;

    if (arg.parentDom) {
      arg.parentDom.append(c);
    } else {
      document.body.append(c);
    }

    let nidzaIntentityInstance = new _identity.NidzaIdentity({
      canvasDom: c,
      ctx: ctx,
      elements: [],
      parentDom: arg.parentDom
    });
    this.access[arg.id] = nidzaIntentityInstance;
    return nidzaIntentityInstance;
  }

  createNidza3dIndentity(arg) {
    this.canvasDom = this.prepareCanvas(arg);
    const gl = this.canvasDom.getContext("webgl");

    if (!gl) {
      console.warn("No support for webGL.");
      return;
    }

    if (arg.parentDom) {
      arg.parentDom.append(this.canvasDom);
    } else {
      document.body.append(this.canvasDom);
    }

    let nidza3dIntentityInstance = new _identity3d.Nidza3dIdentity({
      canvasDom: this.canvasDom,
      ctx: gl,
      parentDom: arg.parentDom
    });
    this.access[arg.id] = nidza3dIntentityInstance;
    return nidza3dIntentityInstance;
  }

}

exports.Nidza = Nidza;

},{"./lib/identity":8,"./lib/identity-3d":7,"./lib/operations":10}]},{},[1]);
