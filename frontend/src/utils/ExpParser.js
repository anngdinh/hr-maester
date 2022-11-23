const pattern = /[_A-Za-z^]+\.[_A-Za-z^]+/g;

export default function ExpParser(exp) {
    let result = exp.match(pattern);
    // console.log(result);
    return result;
}