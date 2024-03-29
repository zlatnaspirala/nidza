
import {BaseShader} from './base-shader-component.js';

export class ShaderComponentCustom extends BaseShader {

  constructor( arg ) {
    super();
    this.gl = arg.gl;
    this.background = [0.0, 0.0, 0.0, 0.0];
    this.position = [-0.0, 0.0, -2.0];
    this.geometry = [
      1.0,  1.0,
     -1.0,  1.0,
      1.0, -1.0,
     -1.0, -1.0,
    ];
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
    const positionBuffer = gl.createBuffer();
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the square.

    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array(this.geometry),
      gl.STATIC_DRAW);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);

    return {
      position: positionBuffer,
      color: colorBuffer,
    }

  }

  reload() {
    this.buffers = this.initDefaultBuffers(this.gl);
    this.draw();
  }

  draw() {

    if (!this.buffers) return;

    this.gl.clearColor(this.background[0], this.background[1], this.background[2], this.background[3]);
    this.gl.clearDepth(1.0);                 // Clear everything
    this.gl.enable( this.gl.DEPTH_TEST );    // Enable depth testing
    this.gl.depthFunc( this.gl.LEQUAL );     // Near things obscure far things

    // Clear the canvas before we start drawing on it.
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
    const fieldOfView = 45 * Math.PI / 180; // in radians
    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
      fieldOfView,
      aspect,
      zNear,
      zFar);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    mat4.translate( modelViewMatrix,     // destination matrix
      modelViewMatrix,     // matrix to translate
      this.position);  // amount to translate

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 2;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position );
      this.gl.vertexAttribPointer(
        this.programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset );
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    {
      const numComponents = 4;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);
      this.gl.vertexAttribPointer(
          this.programInfo.attribLocations.vertexColor,
          numComponents,
          type,
          normalize,
          stride,
          offset);
        this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexColor);
    }

    // Tell WebGL to use our program when drawing
    this.gl.useProgram(this.programInfo.program);

    // Set the shader uniforms
    this.gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
    this.gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

    {
      const offset = 0;
      const vertexCount = 4;
      // this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, this.geometry.length / 2);
    }
  }

}