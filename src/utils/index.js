function* iterator(elements, index) {
  while(index < elements.length) {
    yield elements[index];
    index++;
  }
}

export function fancyJoin(elements, joiner) {
  const generator = iterator(elements, 0);
  let result = generator.next();
  let array = [result.value];
  result = generator.next();

  while(result.done === false) {
    array.push(joiner);
    array.push(result.value);
    result = generator.next();
  }

  return array;
}

export async function loadWords() {
  const content = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt')
    .then(res => res.text());
  
  const words = content
    .split('\n')
    .filter(word => word.length > 3);

  let dictionary = new Set();
  words.forEach(word => dictionary.add(word.trim().toUpperCase()));
  window.__dict = dictionary;

  return dictionary;
}