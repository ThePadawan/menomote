import { getRandomNotes } from "./rand";
import { pdf } from "./pdf";
import { render } from "./render";

const run = (): Promise<string> => {
  const reducer = (acc: any, curr: (x: any) => any) => (acc = curr(acc));

  return [getRandomNotes, render, pdf].reduce(reducer, 4 * 8 * 3);

  // TODO: Add "seed"
  // TODO: Add "preview"
  // console.log(data2);
  // const img = document.createElement("img");
  // img.src = data2;
  // document.body.appendChild(img);
};

export { run };
