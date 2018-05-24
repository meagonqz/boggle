// Credit to https://github.com/jeresig/trie-js for this optimized trie and findTrieWord method
import { trie } from "./suffix";

var dict = trie;

export const findTrieWord = (word, cur) => {
  if (cur === 0) {
    return false;
  }

  cur = cur || dict;

  for (var node in cur) {
    if (word.indexOf(node) === 0) {
      var val =
        typeof cur[node] === "number" && cur[node]
          ? dict.$[cur[node]]
          : cur[node];

      if (node.length === word.length) {
        return val === 0 || val.$ === 0;
      } else {
        return findTrieWord(word.slice(node.length), val);
      }
    }
  }

  return false;
};
