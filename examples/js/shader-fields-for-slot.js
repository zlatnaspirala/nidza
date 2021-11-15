
//import { Nidza, Utility } from "nidza";
import {Nidza, Utility} from "../node_modules/nidza/index";

window.addEventListener("load", function(e) {
  loader.innerText = "NIDZA READY";
  setTimeout(function() {
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
    let myShaderElement = indentityMyShader.addShaderComponentCustom({
      id: "vertex-color-comp",
    });

    myShaderElement.initDefaultFSShader = () => {
      return `
        varying lowp vec4 vColor;

        void main(void) {
          gl_FragColor = vColor;
        }
      `;
    }

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
    }

    myShaderElement.positions = [
      1.0, 1.0,
     -1.0, 1.0,
      1.0, -1.0,
     -1.0, -1.0,
    ];
    myShaderElement.colors = [
      1.0, 1.0, 1.0, 1.0,    // white
      1.0, 0.0, 0.0, 1.0,    // red
      0.0, 1.0, 0.0, 1.0,    // green
      0.0, 0.0, 1.0, 1.0,    // blue
    ];

    myShaderElement.initDefaultBuffers = function() {
      var gl = this.gl;
      const positionBuffer = gl.createBuffer();
      // Select the positionBuffer as the one to apply buffer
      // operations to from here out.
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      // Now create an array of positions for the square.
      gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(this.positions),
        gl.STATIC_DRAW);

      const colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);

      return {
        position: positionBuffer,
        color: colorBuffer,
      }
    };

    const shaderProgram = myShaderElement.initShaderProgram(
      myShaderElement.gl,
      myShaderElement.initDefaultVSShader(),
      myShaderElement.initDefaultFSShader());

    myShaderElement.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: myShaderElement.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: myShaderElement.gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: myShaderElement.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: myShaderElement.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    };

    myShaderElement.buffers = myShaderElement.initDefaultBuffers(myShaderElement.gl);

    // myShaderElement.draw(); Manually call once.
    dispatchEvent(
      new CustomEvent(indentityMyShader.getKey("activate-updater"), {
        detail: {
          id: "vertex-color-comp",
        },
      })
    );

    // Make it global
    window.myShaderElement = myShaderElement;
    window.indentityMyShader = indentityMyShader;



    // 222222222222222222222222222222
  
    let myShaderElement2 = indentityMyShader.addShaderComponentCustom({
      id: "vertex-color-comp-2",
    });

    myShaderElement2.initDefaultFSShader = () => {
      return `
        varying lowp vec4 vColor;

        void main(void) {
          gl_FragColor = vColor;
        }
      `;
    }

    myShaderElement2.initDefaultVSShader = () => {
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

    myShaderElement2.positions = [
      1.0, 1.0,
     -1.0, 1.0,
      1.0, -1.0,
     -1.0, -1.0,
    ];
    myShaderElement2.colors = [
      1.0, 1.0, 1.0, 1.0,    // white
      1.0, 0.0, 0.0, 1.0,    // red
      0.0, 1.0, 0.0, 1.0,    // green
      0.0, 0.0, 1.0, 1.0,    // blue
    ];

    myShaderElement2.initDefaultBuffers = function() {
      var gl = this.gl;
      const positionBuffer = gl.createBuffer();
      // Select the positionBuffer as the one to apply buffer
      // operations to from here out.
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      // Now create an array of positions for the square.
      gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(this.positions),
        gl.STATIC_DRAW);

      const colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);

      return {
        position: positionBuffer,
        color: colorBuffer,
      }
    };

    const shaderProgram2 = myShaderElement.initShaderProgram(
      myShaderElement2.gl,
      myShaderElement2.initDefaultVSShader(),
      myShaderElement2.initDefaultFSShader());

      myShaderElement2.programInfo = {
      program: shaderProgram2,
      attribLocations: {
        vertexPosition: myShaderElement2.gl.getAttribLocation(shaderProgram2, 'aVertexPosition'),
        vertexColor: myShaderElement2.gl.getAttribLocation(shaderProgram2, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: myShaderElement2.gl.getUniformLocation(shaderProgram2, 'uProjectionMatrix'),
        modelViewMatrix: myShaderElement2.gl.getUniformLocation(shaderProgram2, 'uModelViewMatrix'),
      },
    };

    myShaderElement2.buffers = myShaderElement2.initDefaultBuffers(myShaderElement2.gl);

    // myShaderElement.draw(); Manually call once.
    dispatchEvent(
      new CustomEvent(indentityMyShader.getKey("activate-updater"), {
        detail: {
          id: "vertex-color-comp-2",
        },
      })
    );

    window.myShaderElement2 = myShaderElement2;

    //

  }
);
