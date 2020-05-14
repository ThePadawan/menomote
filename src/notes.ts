import Vex from "vexflow";
import pdfkit from "pdfkit";
import blobStream from "blob-stream";
import { saveAs } from "file-saver";
import SVGtoPDF from "svg-to-pdfkit";

import fs from "fs";
// @ts-ignore
// eslint-disable-next-line
import Helvetica from "!!raw-loader!pdfkit/js/data/Helvetica.afm";

const run = () => {
  // notes |> render |> pdf
};

const pdf = (svgData: any) => {
  // TODO Only do once at setup
  // TODO Import the correct virtual fs in the first place instead of cross-loading it weirdly
  fs.writeFileSync("data/Helvetica.afm", Helvetica);

  let doc = new pdfkit();
  const stream = doc.pipe(blobStream());

  // Embed a font, set the font size, and render some text
  // doc
  //   .font("fonts/PalatinoBold.ttf")
  //   .fontSize(25)
  //   .text("Some text with an embedded font!", 100, 100);

  // Add an image, constrain it to a given size, and center it vertically and horizontally
  // doc.image("path/to/image.png", {
  //   fit: [250, 300],
  //   align: "center",
  //   valign: "center",
  // });

  // Add another page
  // doc.addPage().fontSize(25).text("Here is some vector graphics...", 100, 100);

  SVGtoPDF(doc, svgData, 0, 0);

  // Finalize PDF file
  doc.end();

  stream.on("finish", function () {
    const blob = stream.toBlob("application/pdf");
    saveAs(blob, "svg.pdf");
  });
};

const render = (): string => {
  const svg = document.createElement("svg");
  svg.id = "boo";
  document.body.appendChild(svg);
  svg.setAttribute("style", "display: none");

  const VF = Vex.Flow;

  // @ts-ignore
  const vf = new Vex.Flow.Factory({
    renderer: {
      backend: VF.Renderer.Backends.SVG,
      elementId: "boo",
      width: 500,
      height: 200,
    },
  });

  const score = vf.EasyScore();
  const system = vf.System();

  system
    .addStave({
      voices: [
        score.voice(score.notes("C#3/q, B3, A3, G#3", { clef: "bass" })),
      ],
    })
    .addClef("bass")
    .addTimeSignature("4/4");

  vf.draw();
  // document.body.removeChild(svg);

  // TODO Scale it to A4.
  // Think about measures per line, lines per page.
  return svg.innerHTML;
};

const foo = () => {
  const data2 = render();
  pdf(data2);

  // TODO: Add "seed"
  // TODO: Add "preview"
  // console.log(data2);
  // const img = document.createElement("img");
  // img.src = data2;
  // document.body.appendChild(img);
};

export { foo };
