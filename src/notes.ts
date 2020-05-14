import Vex from "vexflow";
import pdfkit from "pdfkit";
import blobStream from "blob-stream";
import { saveAs } from "file-saver";
import SVGtoPDF from "svg-to-pdfkit";
import chunk from "lodash/chunk";

import fs from "fs";
// @ts-ignore
// eslint-disable-next-line
import Helvetica from "!!raw-loader!pdfkit/js/data/Helvetica.afm";
import { getRandomNotes } from "./rand";

const DPI = 300;
const MM_PER_INCH = 25.4;

const A4_WIDTH = 210;
const A4_HEIGHT = 297;

const dimensions = () => {
  const pixelPerMm = DPI / MM_PER_INCH;
  return [A4_WIDTH * pixelPerMm, A4_HEIGHT * pixelPerMm];
};

const run = () => {
  // notes |> render |> pdf
};

const pdf = (svgData: any) => {
  // TODO Only do once at setup
  // TODO Import the correct virtual fs in the first place instead of cross-loading it weirdly
  fs.writeFileSync("data/Helvetica.afm", Helvetica);

  let doc = new pdfkit({ size: "A4" });
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

  const dims = dimensions();

  // @ts-ignore
  const vf = new Vex.Flow.Factory({
    renderer: {
      backend: VF.Renderer.Backends.SVG,
      elementId: "boo",
      width: dims[0],
      height: dims[1],
    },
  });

  renderPage(vf);

  vf.draw();
  document.body.removeChild(svg);

  return svg.innerHTML;
};

const renderPage = (vf: any) => {
  const score = vf.EasyScore();

  const leftBorder = 20;

  let x = leftBorder;
  let y = 20;

  const notes = getRandomNotes(4 * 8 * 3);

  // TODO Check if tree shaking works
  const chunks = chunk(notes, 4);

  const makeSystem = (width: number) => {
    const system = vf.System({
      x: x,
      y: y,
      width: width,
      spaceBetweenStaves: 20,
    });
    x += width;
    return system;
  };

  const lineBreak = () => {
    x = leftBorder;
    y += 130;
  };

  const renderMeasure = (measureIndex: number) => {
    const chunk = chunks.shift()!;
    const easyScore = `${chunk[0]}/q, ${chunk[1]}, ${chunk[2]}, ${chunk[3]}`;

    const voices = [score.voice(score.notes(easyScore, { clef: "bass" }))];

    const doIncludeAnswers = true;
    if (doIncludeAnswers) {
      const answers = chunk.map((n) => {
        const r = new Vex.Flow.TextNote({ text: n, duration: "q" });
        r.setJustification(Vex.Flow.TextNote.Justification.CENTER);
        r.setLine(11);

        return r;
      });

      voices.push(score.voice(answers));
    }

    const stave = makeSystem(240).addStave({
      voices,
    });

    if (measureIndex === 0) {
      stave.addClef("bass");
    }
  };

  for (let lineIndex = 0; lineIndex < 8; lineIndex++) {
    for (let measureIndex = 0; measureIndex < 3; measureIndex++) {
      renderMeasure(measureIndex);
    }
    lineBreak();
  }
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
