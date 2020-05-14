import Vex from "vexflow";

const foo = () => {
  var canvas = document.createElement("canvas");
  canvas.id = "boo";
  document.body.appendChild(canvas);
  canvas.setAttribute("style", "display: none");

  const VF = Vex.Flow;

  // Create an SVG renderer and attach it to the DIV element named "vf".
  const renderer = new VF.Renderer(canvas, VF.Renderer.Backends.CANVAS);

  // Configure the rendering context.
  renderer.resize(500, 500);
  const context = renderer.getContext();
  context.setFont("Arial", 10).setBackgroundFillStyle("#eed");

  // Create a stave of width 400 at position 10, 40 on the canvas.
  const stave = new VF.Stave(10, 40, 400);

  // Add a clef and time signature.
  stave.addClef("treble").addTimeSignature("4/4");

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();

  // TODO Convert this to PNG. Scale it to A4.
  const data = (canvas as HTMLCanvasElement).toDataURL("image/png");
  console.log(data);

  // Debug show
  var img = document.createElement("img");
  img.src = data;
  document.body.appendChild(img);
};

export { foo };
