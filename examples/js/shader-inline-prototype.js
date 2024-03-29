import {Nidza, Utility} from "nidza";

Utility.loadAsync("https://webgl2fundamentals.org/webgl/resources/webgl-utils.js", () => { // DEV
  console.info('Application runned.')
  window.addEventListener("load", function(e) {
    loader.style.display = "none";
  });

  var nidza = new Nidza();
  let myShader = {
    id: "myShader",
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    parentDom: document.getElementById("testHolder"),
  };
  var indentityMyShader = nidza.createNidza3dIndentity2(myShader);
  let myShaderElement = indentityMyShader.addShaderComponentCustom({
    id: "vertex-color-comp",
  });

  // Make it global
  window.myShaderElement = myShaderElement;
  window.indentityMyShader = indentityMyShader;
  console.info('Application runned 2.')

  // Get A WebGL context Inline style
  /** @type {HTMLCanvasElement} */
  var gl = indentityMyShader.canvasDom.getContext("webgl2");
  if(!gl) return;

  myShaderElement.initDefaultFSShader = () => {
    return `#version 300 es
    void main() {
      // mainImage(outColor, gl_FragCoord.xy);
    }
  `;
  }

  myShaderElement.initDefaultVSShader = () => {
    return `#version 300 es
    in vec4 a_position;
    void main() {
      gl_Position = a_position;
    }
  `;
  }

  // setup GLSL program
  const program = webglUtils.createProgramFromSources(gl, [vs, fs]);
  // look up where the vertex data needs to go.
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // look up uniform locations
  const resolutionLocation = gl.getUniformLocation(program, "iResolution");
  const mouseLocation = gl.getUniformLocation(program, "iMouse");
  const timeLocation = gl.getUniformLocation(program, "iTime");

  // Create a vertex array object (attribute state)
  const vao = gl.createVertexArray();
  // and make it the one we're currently working with
  gl.bindVertexArray(vao);
  // Create a buffer to put three 2d clip space points in
  const positionBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // fill it with a 2 triangles that cover clip space
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,  // first triangle
    1, -1,
    -1, 1,
    -1, 1,  // second triangle
    1, -1,
    1, 1,
  ]), gl.STATIC_DRAW);
  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);
  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  gl.vertexAttribPointer(
    positionAttributeLocation,
    2,          // 2 components per iteration
    gl.FLOAT,   // the data is 32bit floats
    false,      // don't normalize the data
    0,          // 0 = move forward size * sizeof(type) each iteration to get the next position
    0,          // start at the beginning of the buffer
  );

  // const playpauseElem = document.querySelector('.playpause');
  // const inputElem = document.querySelector('#myShader');
  // inputElem.addEventListener('mouseover', requestFrame);
  // inputElem.addEventListener('mouseout', cancelFrame);
  // let mouseX = 0;
  // let mouseY = 0;
  // function setMousePosition(e) {
  //   const rect = inputElem.getBoundingClientRect();
  //   mouseX = e.clientX - rect.left;
  //   mouseY = rect.height - (e.clientY - rect.top) - 1;  // bottom is 0 in WebGL
  // }
  // inputElem.addEventListener('mousemove', setMousePosition);
  // inputElem.addEventListener('touchstart', (e) => {
  //   e.preventDefault();
  //   playpauseElem.classList.add('playpausehide');
  //   requestFrame();
  // }, {passive: false});
  // inputElem.addEventListener('touchmove', (e) => {
  //   e.preventDefault();
  //   setMousePosition(e.touches[0]);
  // }, {passive: false});
  // inputElem.addEventListener('touchend', (e) => {
  //   e.preventDefault();
  //   playpauseElem.classList.remove('playpausehide');
  //   cancelFrame();
  // }, {passive: false});

  let requestId;
  function requestFrame() {
    if(!requestId) {
      requestId = requestAnimationFrame(render);
    }
  }
  function cancelFrame() {
    if(requestId) {
      cancelAnimationFrame(requestId);
      requestId = undefined;
    }
  }

  let then = 0;
  let time = 0;
  function render(now) {
    requestId = undefined;
    now *= 0.001;  // convert to seconds
    const elapsedTime = Math.min(now - then, 0.1);
    time += elapsedTime;
    then = now;
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);
    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(vao);
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    // gl.uniform2f(mouseLocation, mouseX, mouseY);
    gl.uniform1f(timeLocation, time);
    gl.drawArrays(
      gl.TRIANGLES,
      0,
      6,
    );
    requestFrame();
  }

  requestFrame();
  requestAnimationFrame(cancelFrame);
});