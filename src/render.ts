import Vex from "vexflow";
import chunk from "lodash/chunk";

const DPI = 300;
const MM_PER_INCH = 25.4;

const A4_WIDTH = 210;
const A4_HEIGHT = 297;

const dimensions = () => {
  const pixelPerMm = DPI / MM_PER_INCH;
  return [A4_WIDTH * pixelPerMm, A4_HEIGHT * pixelPerMm];
};

const render = (notes: string[]): string[] => {
  return [renderPage(notes, false), renderPage(notes, true)];
};

const renderPage = (notes: string[], doIncludeAnswers: boolean) => {
  const svg = document.createElement("svg");
  svg.id = "boo";
  document.body.appendChild(svg);
  svg.setAttribute("style", "display: none");

  const dims = dimensions();

  // @ts-ignore
  const vf = new Vex.Flow.Factory({
    renderer: {
      backend: Vex.Flow.Renderer.Backends.SVG,
      elementId: "boo",
      width: dims[0],
      height: dims[1],
    },
  });
  const score = vf.EasyScore();

  const leftBorder = 20;

  let x = leftBorder;
  let y = 20;

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

  vf.draw();
  document.body.removeChild(svg);

  return svg.innerHTML;
};

export { render };
