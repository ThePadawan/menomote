const LETTERS = ["A", "B", "C", "D", "E", "F", "G"];

const OCTAVES = [2, 3];

const DO_NOT_SHARP = ["B", "E"];
const DO_NOT_FLAT = ["C", "F"];

const validModifiers = (n: string) => {
  const result = [];
  if (!DO_NOT_SHARP.includes(n)) {
    result.push("#");
  }
  if (!DO_NOT_FLAT.includes(n)) {
    result.push("b");
  }

  result.push("");

  return result;
};

const randomNote = () => {
  const letterIndex = Math.floor(Math.random() * 7);
  const letter = LETTERS[letterIndex];

  const possibleModifiers = validModifiers(letter);
  const modifierIndex = Math.floor(Math.random() * possibleModifiers.length);
  const modifier = possibleModifiers[modifierIndex];

  const octaveIndex = Math.floor(Math.random() * OCTAVES.length);
  const octave = OCTAVES[octaveIndex];

  return `${letter}${modifier}${octave}`;
};

const getRandomNotes = (n: number): string[] => {
  return new Array(n).fill(0).map((_) => randomNote());
};

export { getRandomNotes };
