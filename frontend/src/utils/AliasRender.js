export default function AliasRender(exp) {
    let x = exp.split(' ')
    x.forEach((e, i) => x[i] = x[i].toLowerCase());
    let y = x.filter(word => word.length > 0);
    let z = y.reduce((previousValue, currentValue) => previousValue + "_" + currentValue, "")

    return z.slice(1);
}