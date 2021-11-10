
// import { Nidza, Utility } from "../node_modules/nidza/index";
import {Nidza, Utility} from "../../index";
// import {Nidza, Utility} from "nidza";

window.addEventListener("load", function(e) {
  loader.innerText = "NIDZA READY";
  setTimeout(function() {
    loader.style.display = "none";
  }, 200);
});

var nidza = new Nidza();

// This component depens on glmatrix engine
Utility.loadAsync(
  "https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js",
  () => {

    let myShader = {
      id: "myShader1",
      size: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      parentDom: document.getElementById("testHolder"),
    };

    var indentityMyShader = nidza.createNidza3dIndentity(myShader);
    indentityMyShader.canvasDom.style.position = 'absolute';
    indentityMyShader.canvasDom.style.top = '30%';
    indentityMyShader.canvasDom.style.left = '0'

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

    myShaderElement.draw(); //  Manually call once.
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

    loadInlineShader();
    // loadSecondPart();

  }
);

// Second part
function loadSecondPart() {

  let myShader = {
    id: "myShader2",
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    parentDom: document.getElementById("testHolder")
  };

  var indentityMyShader = nidza.createNidza3dIndentity(myShader);
  let myShaderElement2 = indentityMyShader.addShaderComponent({
    id: "vertex-color-comp2",
  });

  indentityMyShader.canvasDom.style.position = 'absolute';
  indentityMyShader.canvasDom.style.left = 0;

  dispatchEvent(
    new CustomEvent(indentityMyShader.getKey("activate-updater"), {
      detail: {
        id: "vertex-color-comp2",
      },
    })
  );

  // Create new osc to make background color floating
  myShaderElement2.bgColorR = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.bgColorG = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.bgColorB = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.bgColorR.setDelay(5);
  myShaderElement2.bgColorG.setDelay(12);
  myShaderElement2.bgColorB.setDelay(1);

  // You are free to inject any vars direct on shader component
  myShaderElement2.colorR = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.colorG = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.colorB = new nidza.Osc(0, 1, 0.01, 'oscMin');
  myShaderElement2.colorR.setDelay(5);
  myShaderElement2.colorB.setDelay(12);
  myShaderElement2.colorG.setDelay(1);

  // Override
  setInterval(() => {
    for(var j = 0;j < myShaderElement2.colors.length;j += 3) {
      // Buildin variable
      myShaderElement2.colors[j] = myShaderElement2.colorR.getValue();
      myShaderElement2.colors[j + 1] = myShaderElement2.colorG.getValue();
      myShaderElement2.colors[j + 2] = myShaderElement2.colorR.getValue();
    }
    // Buildin variable
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
      height: window.innerHeight / 2,
    },
    parentDom: document.getElementById("testHolder"),
  };

  var indentityMyShader = nidza.createNidza3dIndentity(myShader);

  indentityMyShader.canvasDom.style.position = 'absolute';
  indentityMyShader.canvasDom.style.left = 0;

  let myShaderElement = indentityMyShader.addShaderComponentCustom({
    id: "vertex-color-comp3",
  });

  myShaderElement.initDefaultFSShader = () => {
    return `
  precision mediump float;
  uniform vec4 I;
  Q Z(Q p,float a) {
    return Q(cos(a)*p.y+sin(a)*p.x,cos(a)*p.x-sin(a)*p.y,p.z);
  }
  float F(Q P) {
    float R=`+ r + `, S=` + s + `;
    vec4 p=vec4(P,1), o=p, s=vec4(S,S,S,abs(S))/R;
    for (int i = 0;i < 10;i++) {
      if(i==3||i==7)R=`+ r2 + `,S=` + s2 + `;
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
    p=Z(p,p.z*3.1415/10.*(length(p.xy)-3.)*`+ spin + `);
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
    float occ=`+ occ + `;
    occ=clamp(occ,0.,1.);
    float br=`+ br + `;
    float fog=`+ fog + `;
    return mix(Q(`+ color + `),Q(0.,0.,0.),1.-fog);
  }
  void main(void) {
    `+ vec_f + ` ` + q_d + ` ` + q_c + ` ` + gl_FragColor +
      `}`;
  }

  myShaderElement.initDefaultVSShader = () => {
    return `
  attribute vec2 P;
  void main(void) {
    gl_Position=vec4(P,0.,1.);
  }`
  }

  myShaderElement.initDefaultBuffers = function() {
    var gl = this.gl;
  };

  // Start
  var sp = myShaderElement.gl.createProgram();
  var g = myShaderElement.gl;

  var c = indentityMyShader.canvasDom;

  // move it intro lib
  function gs(t, s) {
    g.shaderSource(t = g.createShader(t), s);
    g.compileShader(t); g.attachShader(sp, t);
  }

  // Params
  var camera_ori_y = "120.";
  var camera_ori_x = "120.";
  var direction_x = "5.";
  var direction_y = "5.";
  var direction_z = "I.x*30.2434216";

  var spin = "(I.x / p.z)";
  // default: sin(I.x*.01)*.2

  var r = "(tan((I.x*1.15*sin(I.x))*3.176)*P.z)*0.007"// "((((I.x*1.15*sin(I.x))*3.276))*0.007)+0.0001432";
  // (tan((I.x*1.15*sin(I.x))*3.176)*P.z)*0.007

  var s = " 3.4312-cos(I.x*2.1)+0.05"// "(3.4312-tan(I.x*((I.x)/.41))+1.05)-0.0001234";
  // 3.4312-cos(I.x*2.1)+0.05

  var r2 = "sin((I.x+float(i)*0.0001*sin(I.x*.01))*3.176)*(0.3)+0.5" //  "((((tan(I.x)*1.05*tan(I.x))*2.176))*0.007)-0.00001";
  // sin((I.x+float(i)*0.0001*sin(I.x*.01))*3.176)*(0.3)+0.5

  var s2 = "9.14312-cos(I.x+(tan(I.x)/.4))+0.105";
  // 3.4312-sin(I.x*200.1)+(I.x)*sin(float(i))+0.5

  var occ = "1.+(D(p+n*.02+Q(-e,0,0))+D(p+n*.02+Q(+e,0,0))+D(p+n*.02+Q(0,-e,0))+D(p+n*.02+Q(0,e,0))+D(p+n*.02+Q(0,0,-e))+D(p+n*.02+Q(0,0,e))-.03)*20.";
  var br = "(pow(clamp(dot(n,-normalize(d+Q(.3,.3,.3)))*.6+.4, 0.,1.),1.7)*.8+.2)*occ/(td*.5+1.)";
  var fog = "clamp(3./(td*td*1.8+.4),0.,1.)";
  var color = "br/(td+1.),br/(td+1.),br/(td+1.)";

  // Main

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

  (u = function(t) {
    W = innerWidth;
    H = innerHeight;
    s = (H / 240) | 0;
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

  loadSecondPart();

  // Make it global
  //window.myShaderElement = myShaderElement;
  //window.indentityMyShader = indentityMyShader;
}
