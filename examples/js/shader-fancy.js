import {Nidza, Utility} from "nidza";

// Originally from
// https://www.shadertoy.com/view/lcfXD8

Utility.loadAsync("https://webgl2fundamentals.org/webgl/resources/webgl-utils.js", () => {

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
  precision highp float;

  in vec2 v_uv;
  out vec4 fragColor;

  uniform float u_time;
  uniform float u_tapValue;
  uniform vec2 u_resolution;
  uniform float u_aspectRatio;
  uniform float u_verticalOffset;
  uniform float u_patternZoom; // NEW: Pattern Zoom uniform

  // Helper functions
  float hash(float n) {
    return fract(sin(n) * 753.5453123);
  }

  float noise(vec2 x) {
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);

    float n = p.x + p.y * 157.0;
    return mix(
      mix(hash(n + 0.0), hash(n + 1.0), f.x),
      mix(hash(n + 157.0), hash(n + 158.0), f.x),
      f.y
    );
  }

  float fbm(vec2 p, vec3 a) {
    float v = 0.0;
    v += noise(p * a.x) * 0.50 ;
    v += noise(p * a.y) * 1.50 ;
    v += noise(p * a.z) * 0.125 * 0.1; // variable
    return v;
  }

  vec3 drawLines(
    vec2 uv,
    vec3 fbmOffset,
    vec3 color1,
    vec3 colorSet[4], // GLSL requires size for arrays in parameters
    float secs
  ) {
    float timeVal = secs * 0.1;
    vec3 finalColor = vec3(0.0);

    for (int i = 0; i < 4; ++i) {
      float indexAsFloat = float(i);
      float amp = 80.0 + (indexAsFloat * 0.0);
      float period = 2.0 + (indexAsFloat + 2.0);
      float thickness = mix(0.4, 0.2, noise(uv * 2.0));

      float t = abs(1.0 / (sin(uv.y + fbm(uv + timeVal * period, fbmOffset)) * amp) * thickness);

      finalColor += t * colorSet[i];
    }

    for (int i = 0; i < 4; ++i) {
      float indexAsFloat = float(i);
      float amp = 40.0 + (indexAsFloat * 5.0);
      float period = 9.0 + (indexAsFloat + 2.0);
      float thickness = mix(0.1, 0.1, noise(uv * 12.0));

      float t = abs(1.0 / (sin(uv.y + fbm(uv + timeVal * period, fbmOffset)) * amp) * thickness);

      finalColor += t * colorSet[i] * color1;
    }

    return finalColor;
  }

  void main() {
    // 1. Get UV coordinates in clip space [-1, 1], with (0,0) at the center.
    vec2 uv = (v_uv * 2.0 - 1.0);

    // 2. Correct for aspect ratio to ensure uniform scaling (pattern looks natural).
    // This makes the coordinate system itself non-stretched.
    uv.x *= u_aspectRatio;

    // 3. Apply pattern zoom: Divide by u_patternZoom to make the pattern larger/smaller.
    // A smaller u_patternZoom value (e.g., 0.5) will make the pattern appear larger, filling more.
    // A larger u_patternZoom value (e.g., 1.5) will make the pattern appear smaller/denser.
    uv /= u_patternZoom;

    // 4. Apply vertical offset to translate the entire pattern up/down.
    uv.y -= u_verticalOffset;

    vec3 lineColor1 = vec3(1.0, 0.0, 0.5);
    vec3 lineColor2 = vec3(0.3, 0.5, 1.5);

    float spread = abs(u_tapValue);
    vec3 finalColor = vec3(0.0);
    vec3 colorSets[4]; // Initialize array for passing to function
    colorSets[0] = vec3(0.7, 0.05, 1.0);
    colorSets[1] = vec3(1.0, 0.19, 0.0);
    colorSets[2] = vec3(0.0, 1.0, 0.3);
    colorSets[3] = vec3(0.0, 0.38, 1.0);

    float t = sin(u_time) * 0.5 + 0.5;
    float pulse = mix(0.05, 0.20, t);

    finalColor = drawLines(uv, vec3(65.2, 40.0, 4.0), lineColor1, colorSets, u_time * 0.1) * pulse;
    finalColor += drawLines(uv, vec3(5.0 * spread / 2.0, 2.1 * spread, 1.0), lineColor2, colorSets, u_time);

    fragColor = vec4(finalColor, 1.0);
  }
  `;
  }

  myShaderElement.initDefaultVSShader = () => {
    return `#version 300 es
            in vec4 a_position;
            out vec2 v_uv;

            void main() {
              gl_Position = a_position;
              // Map clip space (-1 to 1) to UV space (0 to 1)
              v_uv = (a_position.xy * 0.5) + 0.5;
            }
  `;
  }

  let startTime = performance.now();
  let tapCount = 0.45; // Simulate tapValue
  let animationSpeed = 2.0; // Default animation speed
  let verticalOffset = 1.0; // Default vertical offset
  let patternZoom = 1.2;  // NEW: Default pattern zoom

  // setup GLSL program
  const program = webglUtils.createProgramFromSources(
    gl, [myShaderElement.initDefaultVSShader(), myShaderElement.initDefaultFSShader()]);
  // look up where the vertex data needs to go.
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // look up uniform locations
  const resolutionLocation = gl.getUniformLocation(program, "iResolution");
  const mouseLocation = gl.getUniformLocation(program, "iMouse");
  const timeLocation = gl.getUniformLocation(program, "u_time");

  const tapValueUniformLocation = gl.getUniformLocation(program, 'u_tapValue');
  // const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
  const aspectRatioUniformLocation = gl.getUniformLocation(program, 'u_aspectRatio');
  const verticalOffsetUniformLocation = gl.getUniformLocation(program, 'u_verticalOffset');
  const patternZoomUniformLocation = gl.getUniformLocation(program, 'u_patternZoom'); // NEW

  // uniform vec3      iResolution;           // viewport resolution (in pixels)
  // uniform float     iTime;                 // shader playback time (in seconds)
  // uniform float     iTimeDelta;            // render time (in seconds)
  // uniform float     iFrameRate;            // shader frame rate
  // uniform int       iFrame;                // shader playback frame
  // uniform float     iChannelTime[4];       // channel playback time (in seconds)
  // uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
  // uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
  // uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
  // uniform vec4      iDate;                 // (year, month, day, time in seconds)
  // const TimeDelta = gl.getUniformLocation(program, "iTimeDelta");
  // const FrameRate = gl.getUniformLocation(program, "iFrameRate");
  // const ChannelTime = gl.getUniformLocation(program, "iChannelTime");
  // const ChannelResolution = gl.getUniformLocation(program, "iChannelResolution");
  // const Mouselocation = gl.getUniformLocation(program, "iMouse");
  // const DateLocation = gl.getUniformLocation(program, "iDate");
  // Create a vertex array object (attribute state)
  const vao = gl.createVertexArray();
  // and make it the one we're currently working with
  gl.bindVertexArray(vao);
  // Create a buffer to put three 2d clip space points in
  const positionBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // fill it with a 2 triangles that cover clip space
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
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
  const inputElem = document.querySelector('#myShader');
  inputElem.addEventListener('mouseover', requestFrame);
  // inputElem.addEventListener('mouseout', cancelFrame);
  let mouseX = 0;
  let mouseY = 0;
  function setMousePosition(e) {
    const rect = inputElem.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = rect.height - (e.clientY - rect.top) - 1;  // bottom is 0 in WebGL
  }
  inputElem.addEventListener('mousemove', setMousePosition);
  inputElem.addEventListener('touchstart', (e) => {
    e.preventDefault();
    playpauseElem.classList.add('playpausehide');
    requestFrame();
  }, {passive: false});
  inputElem.addEventListener('touchmove', (e) => {
    e.preventDefault();
    setMousePosition(e.touches[0]);
  }, {passive: false});
  inputElem.addEventListener('touchend', (e) => {
    e.preventDefault();
    playpauseElem.classList.remove('playpausehide');
    cancelFrame();
  }, {passive: false});

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
    // gl.uniform1f(TimeDelta, mouseY);
    gl.uniform1f(timeLocation, time);

    gl.uniform1f(tapValueUniformLocation, tapCount);
    gl.uniform1f(verticalOffsetUniformLocation, verticalOffset);
    gl.uniform1f(patternZoomUniformLocation, patternZoom); // NEW: Pass pattern zoom


    gl.drawArrays(gl.TRIANGLES, 0, 6,);
    requestFrame();
  }
  requestFrame();
  requestAnimationFrame(cancelFrame);
})