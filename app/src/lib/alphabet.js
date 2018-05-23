const consonants = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z"
]; // 21
const vowels = ["a", "e", "i", "o", "u"]; // 5

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const generateOneOrZero = () => {
  return getRandomInt(2);
};

const generateRandomConsonant = () => {
  return consonants[getRandomInt(21)]; // 0 - 20
};

const generateRandomVowel = () => {
  return vowels[getRandomInt(5)]; // 0 - 4
};

const generateLetter = () => {
  const bool = generateOneOrZero();
  const vowel = generateRandomVowel();
  const con = generateRandomConsonant();
  const letter = bool ? vowel : con;
  if (!letter) debugger;
  return letter;
};

export const getLetters = size => {
  return [...new Array(size * size)].map(() => generateLetter());
};
