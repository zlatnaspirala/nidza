(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _index = require("../../index");

// import { Nidza, Utility } from "../node_modules/nidza/index";
// import {Nidza, Utility} from "nidza";
window.addEventListener("load", function (e) {
  loader.innerText = "NIDZA READY";
  setTimeout(function () {
    loader.style.display = "none";
  }, 200);
});
var nidza = new _index.Nidza(); // This component depens on glmatrix engine

_index.Utility.loadAsync("https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js", () => {
  let myShader = {
    id: "myShader1",
    size: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    parentDom: document.getElementById("testHolder")
  };
  var indentityMyShader = nidza.createNidza3dIndentity(myShader);
  indentityMyShader.canvasDom.style.position = 'absolute';
  indentityMyShader.canvasDom.style.top = '30%';
  indentityMyShader.canvasDom.style.left = '0';
  let myShaderElement = indentityMyShader.addShaderComponentCustom({
    id: "vertex-color-comp"
  });

  myShaderElement.initDefaultFSShader = () => {
    return `
        varying lowp vec4 vColor;

        void main(void) {
          gl_FragColor = vColor;
        }
      `;
  };

  myShaderElement.initDefaultVSShader = () => {
    return `
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
  };

  myShaderElement.positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
  myShaderElement.colors = [1.0, 1.0, 1.0, 1.0, // white
  1.0, 0.0, 0.0, 1.0, // red
  0.0, 1.0, 0.0, 1.0, // green
  0.0, 0.0, 1.0, 1.0 // blue
  ];

  myShaderElement.initDefaultBuffers = function () {
    var gl = this.gl;
    const positionBuffer = gl.createBuffer(); // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Now create an array of positions for the square.

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
    return {
      position: positionBuffer,
      color: colorBuffer
    };
  };

  const shaderProgram = myShaderElement.initShaderProgram(myShaderElement.gl, myShaderElement.initDefaultVSShader(), myShaderElement.initDefaultFSShader());
  myShaderElement.programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: myShaderElement.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: myShaderElement.gl.getAttribLocation(shaderProgram, 'aVertexColor')
    },
    uniformLocations: {
      projectionMatrix: myShaderElement.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: myShaderElement.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
    }
  };
  myShaderElement.buffers = myShaderElement.initDefaultBuffers(myShaderElement.gl);
  myShaderElement.draw(); //  Manually call once.

  dispatchEvent(new CustomEvent(indentityMyShader.getKey("activate-updater"), {
    detail: {
      id: "vertex-color-comp"
    }
  })); // Make it global

  window.myShaderElement = myShaderElement;
  window.indentityMyShader = indentityMyShader;
  loadInlineShader(); // loadSecondPart();
}); // Second part


function loadSecondPart() {
  let myShader = {
    id: "myShader2",
    size: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    parentDom: document.getElementById("testHolder")
  };
  var indentityMyShader = nidza.createNidza3dIndentity(myShader);
  let myShaderElement2 = indentityMyShader.addShaderComponent({
    id: "vertex-color-comp2"
  });
  indentityMyShader.canvasDom.style.position = 'absolute';
  indentityMyShader.canvasDom.style.left = 0;
  dispatchEvent(new CustomEvent(indentityMyShader.getKey("activate-updater"), {
    detail: {
      id: "vertex-color-comp2"
    }
  })); // Create new osc to make background color floating

  myShaderElement2.bgColorR = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.bgColorG = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.bgColorB = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.bgColorR.setDelay(5);
  myShaderElement2.bgColorG.setDelay(12);
  myShaderElement2.bgColorB.setDelay(1); // You are free to inject any vars direct on shader component

  myShaderElement2.colorR = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.colorG = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.colorB = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.colorR.setDelay(5);
  myShaderElement2.colorB.setDelay(12);
  myShaderElement2.colorG.setDelay(1); // Override

  setInterval(() => {
    for (var j = 0; j < myShaderElement2.colors.length; j += 3) {
      // Buildin variable
      myShaderElement2.colors[j] = myShaderElement2.colorR.getValue();
      myShaderElement2.colors[j + 1] = myShaderElement2.colorG.getValue();
      myShaderElement2.colors[j + 2] = myShaderElement2.colorR.getValue();
    } // Buildin variable


    myShaderElement2.background[0] = myShaderElement2.bgColorR.getValue();
    myShaderElement2.background[1] = myShaderElement2.bgColorG.getValue();
    myShaderElement2.background[2] = myShaderElement2.bgColorB.getValue();
  }, 10);
}

function loadInlineShader() {
  let myShader = {
    id: "myShader3",
    size: {
      width: window.innerWidth,
      height: window.innerHeight / 2
    },
    parentDom: document.getElementById("testHolder")
  };
  var indentityMyShader = nidza.createNidza3dIndentity(myShader);
  indentityMyShader.canvasDom.style.position = 'absolute';
  indentityMyShader.canvasDom.style.left = 0;
  let myShaderElement = indentityMyShader.addShaderComponentCustom({
    id: "vertex-color-comp3"
  });

  myShaderElement.initDefaultFSShader = () => {
    return `
  precision mediump float;
  uniform vec4 I;
  Q Z(Q p,float a) {
    return Q(cos(a)*p.y+sin(a)*p.x,cos(a)*p.x-sin(a)*p.y,p.z);
  }
  float F(Q P) {
    float R=` + r + `, S=` + s + `;
    vec4 p=vec4(P,1), o=p, s=vec4(S,S,S,abs(S))/R;
    for (int i = 0;i < 10;i++) {
      if(i==3||i==7)R=` + r2 + `,S=` + s2 + `;
      p.xyz=clamp(p.xyz,-.5,2.)*2.-p.xyz;
      float r2=dot(p.xyz,p.xyz);
      if (r2 > 10000.)break;p=p*clamp(max(R/r2,R)*cos(I.x),0.,1.)*s+o;
    } return ((length(p.xyz)-abs(S-1.))/p.w-pow(abs(S),float(1-24)));
  }
  float D(Q p) {
    Q c=Q(10.,10.,8.);
    p=mod(p,c)-.5*c;
    Q q=abs(Z(p,p.z*3.1415/20.*4.));
    float d2=max(q.z-10.,max((q.x*0.866025+q.y*0.5),q.y)-.01);
    p=Z(p,p.z*3.1415/10.*(length(p.xy)-3.)*` + spin + `);
    return max(F(p),-d2);
  }
  Q R(Q p,Q d) {
    float td=0.,rd=0.;
    for(int i=0;i<80;i++) {
      if((rd=D(p))<pow(td,1.5)*.004) break;td+=rd;p+=d*rd;
    }
    float md=D(p),e=.0025;
    Q n=normalize(Q(D(p+Q(e,0,0))-D(p-Q(e,0,0)),D(p+Q(0,e,0))-D(p-Q(0,e,0)),D(p+Q(0,0,e))-D(p-Q(0,0,e))));
    e*=.5;
    float occ=` + occ + `;
    occ=clamp(occ,0.,1.);
    float br=` + br + `;
    float fog=` + fog + `;
    return mix(Q(` + color + `),Q(0.,0.,0.),1.-fog);
  }
  void main(void) {
    ` + vec_f + ` ` + q_d + ` ` + q_c + ` ` + gl_FragColor + `}`;
  };

  myShaderElement.initDefaultVSShader = () => {
    return `
  attribute vec2 P;
  void main(void) {
    gl_Position=vec4(P,0.,1.);
  }`;
  };

  myShaderElement.initDefaultBuffers = function () {
    var gl = this.gl;
  }; // Start


  var sp = myShaderElement.gl.createProgram();
  var g = myShaderElement.gl;
  var c = indentityMyShader.canvasDom; // move it intro lib

  function gs(t, s) {
    g.shaderSource(t = g.createShader(t), s);
    g.compileShader(t);
    g.attachShader(sp, t);
  } // Params


  var camera_ori_y = "120.";
  var camera_ori_x = "120.";
  var direction_x = "5.";
  var direction_y = "5.";
  var direction_z = "I.x*30.2434216";
  var spin = "(I.x / p.z)"; // default: sin(I.x*.01)*.2

  var r = "(tan((I.x*1.15*sin(I.x))*3.176)*P.z)*0.007"; // "((((I.x*1.15*sin(I.x))*3.276))*0.007)+0.0001432";
  // (tan((I.x*1.15*sin(I.x))*3.176)*P.z)*0.007

  var s = " 3.4312-cos(I.x*2.1)+0.05"; // "(3.4312-tan(I.x*((I.x)/.41))+1.05)-0.0001234";
  // 3.4312-cos(I.x*2.1)+0.05

  var r2 = "sin((I.x+float(i)*0.0001*sin(I.x*.01))*3.176)*(0.3)+0.5"; //  "((((tan(I.x)*1.05*tan(I.x))*2.176))*0.007)-0.00001";
  // sin((I.x+float(i)*0.0001*sin(I.x*.01))*3.176)*(0.3)+0.5

  var s2 = "9.14312-cos(I.x+(tan(I.x)/.4))+0.105"; // 3.4312-sin(I.x*200.1)+(I.x)*sin(float(i))+0.5

  var occ = "1.+(D(p+n*.02+Q(-e,0,0))+D(p+n*.02+Q(+e,0,0))+D(p+n*.02+Q(0,-e,0))+D(p+n*.02+Q(0,e,0))+D(p+n*.02+Q(0,0,-e))+D(p+n*.02+Q(0,0,e))-.03)*20.";
  var br = "(pow(clamp(dot(n,-normalize(d+Q(.3,.3,.3)))*.6+.4, 0.,1.),1.7)*.8+.2)*occ/(td*.5+1.)";
  var fog = "clamp(3./(td*td*1.8+.4),0.,1.)";
  var color = "br/(td+1.),br/(td+1.),br/(td+1.)"; // Main

  var vec_f = "vec2 f = gl_FragCoord.xy;";
  var q_d = "Q d = Q((f - vec2(" + camera_ori_y + "," + camera_ori_x + ") ) / " + camera_ori_x + ", 1.);";
  var q_c = "Q c = pow(R(Q(" + direction_x + "," + direction_y + "," + direction_z + "),normalize(d*Q(1.,1.,1.-(length(d.xy)*.54)))),Q(.5,.5,.5));";
  var gl_FragColor = "gl_FragColor=vec4(pow(floor(c*Q(8.,8.,8.)+fract(f.x/4.+f.y/2.)/2.)/(Q(7.,7.,7.)),Q(1.5,1.5,1.5)),1.);";
  var fcShader = myShaderElement.initDefaultFSShader();
  gs(35633, myShaderElement.initDefaultVSShader());
  gs(35632, fcShader.split("Q").join("vec3"));
  g.linkProgram(sp);
  g.useProgram(sp);
  var i, u, W, H;
  g.bindBuffer(34962, g.createBuffer());
  g.bufferData(34962, new Float32Array([i = -1, i, i, 1, 1, i, 1, 1]), 35044);
  g.vertexAttribPointer(0, 2, 5126, 0, 0, 0);
  g.enableVertexAttribArray(0);
  console.log('aaaaaaaaa');
  (u = function (t) {
    W = innerWidth;
    H = innerHeight;
    s = H / 240 | 0;
    g.viewport(0, 0, c.width, c.height);
    g.uniform4f(g.getUniformLocation(sp, "I"), (t - 30000) * .00002, 0, 0, 0);
    g.drawArrays(5, 0, 4);
    requestAnimationFrame(u);
  })(0);
  /*
  dispatchEvent(
    new CustomEvent(indentityMyShader.getKey("activate-updater"), {
      detail: {
        id: "vertex-color-comp",
      },
    })
  ); */

  loadSecondPart(); // Make it global
  //window.myShaderElement = myShaderElement;
  //window.indentityMyShader = indentityMyShader;
}

},{"../../index":2}],2:[function(require,module,exports){
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

},{"./src/lib/utility":18,"./src/nidza":19}],3:[function(require,module,exports){
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

},{"./dimension":7,"./position":12}],4:[function(require,module,exports){
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
exports.NidzaCustom2dComponent = void 0;

var _baseComponent = require("./base-component");

var _operations = require("./operations");

var _rotation = require("./rotation");

class NidzaCustom2dComponent extends _baseComponent.NidzaElement {
  constructor(arg) {
    const eArg = {
      position: arg.position,
      id: arg.id,
      canvasDom: arg.canvasDom // draw: arg.draw

    };
    super(eArg);
    this.id = arg.id;
    this.draw = arg.draw;
    this.ctx = arg.ctx;
    this.canvasDom = arg.canvasDom;
    this.draw = _operations.drawSimpleText;
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

}

exports.NidzaCustom2dComponent = NidzaCustom2dComponent;

},{"./base-component":3,"./operations":11,"./rotation":13}],7:[function(require,module,exports){
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

},{"./base-referent":4}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nidza3dIdentity = void 0;

var _utility = require("./utility");

var _shaderComponent = require("./shader-component");

var _shaderComponentCustom = require("./shader-component-custom");

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
    this.elements.push(shaderComponent);
    shaderComponent.draw();
    return shaderComponent;
  }

  addShaderComponentCustom(arg) {
    arg.gl = this.gl;
    arg.canvasDom = this.canvasDom;
    let shaderComponent = new _shaderComponentCustom.ShaderComponentCustom(arg);
    this.elements.push(shaderComponent);
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

},{"./shader-component":15,"./shader-component-custom":14,"./utility":18}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NidzaIdentity = void 0;

var _textComponent = require("./text-component");

var _starComponent = require("./star-component");

var _matrixComponent = require("./matrix-component");

var _custom2dComponent = require("./custom2d-component");

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

  addCustom2dComponent(arg) {
    arg.ctx = this.ctx;
    arg.canvasDom = this.canvasDom;
    let cComponent = new _custom2dComponent.NidzaCustom2dComponent(arg);
    cComponent.draw();
    this.elements.push(cComponent);
    return cComponent;
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

},{"./custom2d-component":6,"./matrix-component":10,"./star-component":16,"./text-component":17,"./utility":18}],10:[function(require,module,exports){
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

},{"./base-component":3,"./operations":11,"./rotation":13,"./utility":18}],11:[function(require,module,exports){
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

},{"./utility":18}],12:[function(require,module,exports){
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

},{"./base-referent":4}],13:[function(require,module,exports){
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

},{"./operations":11}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShaderComponentCustom = void 0;

var _baseShaderComponent = require("./base-shader-component");

class ShaderComponentCustom extends _baseShaderComponent.BaseShader {
  constructor(arg) {
    super();
    this.gl = arg.gl;
    this.background = [0.0, 0.0, 0.0, 0.0];
    this.position = [-0.0, 0.0, -2.0];
    this.geometry = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
    console.log('ShaderComponentCustom init', arg);
  }

  initDefaultFSShader() {
    return `
      varying lowp vec4 vColor;

      void main(void) {
        gl_FragColor = vColor;
      }
    `;
  }

  initDefaultVSShader() {
    return `
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
  }

  initDefaultBuffers(gl) {
    const positionBuffer = gl.createBuffer(); // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Now create an array of positions for the square.

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.geometry), gl.STATIC_DRAW);
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
    return {
      position: positionBuffer,
      color: colorBuffer
    };
  }

  reload() {
    this.buffers = this.initDefaultBuffers(this.gl);
    this.draw();
  }

  draw() {
    if (!this.buffers) return;
    this.gl.clearColor(this.background[0], this.background[1], this.background[2], this.background[3]);
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
    // Tell WebGL how to pull out the positions from the position
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
      const vertexCount = 4; // this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);

      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, this.geometry.length / 2);
    }
  }

}

exports.ShaderComponentCustom = ShaderComponentCustom;

},{"./base-shader-component":5}],15:[function(require,module,exports){
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

},{"./base-shader-component":5,"./operations":11}],16:[function(require,module,exports){
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

},{"./base-component":3,"./operations":11,"./rotation":13}],17:[function(require,module,exports){
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

},{"./base-component":3,"./operations":11,"./rotation":13}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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
    let cStyle = "background: transparent";
    c.id = arg.id;
    c.setAttribute("style", cStyle);
    c.width = arg.size.width;
    c.height = arg.size.height;
    return c;
  }

  createNidzaIndentity(arg) {
    let cStyle = "background: transparent";
    let c;

    if (arg.injectCanvas) {
      c = arg.injectCanvas;
      c.setAttribute('style', cStyle);
    } else {
      c = this.prepareCanvas(arg);
    }

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
    let cStyle = "background: transparent";
    let c;

    if (arg.injectCanvas) {
      c = arg.injectCanvas;
      c.setAttribute('style', cStyle);
    } else {
      c = this.prepareCanvas(arg);
    }

    this.canvasDom = c;
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

},{"./lib/identity":9,"./lib/identity-3d":8,"./lib/operations":11}]},{},[1]);
