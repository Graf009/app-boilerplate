/**
 * Created by Oleg Orlov on 04.09.15.
 */

export default function prepareData() {
  // convert all string arguments into field accessors
  let functions = arguments;
  let i = 0;
  const l = functions.length;

  while (i < l) {
    if (typeof functions[i] === 'string') functions[i] = (str => d => d[str])(functions[i]);
    i++;
  }

  // return composition of functions
  return d => {
    let i = 0;
    while (i++ < l) d = functions[i - 1].call(this, d);
    return d;
  };
}
