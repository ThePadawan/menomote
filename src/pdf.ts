import pdfkit from "pdfkit";
import blobStream from "blob-stream";
import { saveAs } from "file-saver";
import SVGtoPDF from "svg-to-pdfkit";

import fs from "fs";
// @ts-ignore
// eslint-disable-next-line
import Helvetica from "!!raw-loader!pdfkit/js/data/Helvetica.afm";

const setup = () => {
  fs.writeFileSync("data/Helvetica.afm", Helvetica);
};

const pdf = (svgs: string[]): Promise<string> => {
  setup();

  // "bufferPages" allows us to only flush pages exactly once on doc.end()
  // instead of every time a page is added.
  let doc = new pdfkit({ size: "A4", autoFirstPage: false, bufferPages: true });

  const stream = doc.pipe(blobStream());

  svgs.forEach((svg: string) => {
    doc.addPage();
    SVGtoPDF(doc, svg, 0, 0);
  });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", function () {
      const blob = stream.toBlob("application/pdf");
      saveAs(blob, "svg.pdf");
      resolve(stream.toBlobURL());
    });
  });
};

export { pdf };
