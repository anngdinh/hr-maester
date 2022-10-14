// const emVar = "_em";
// const tableVar = "_table"
// const usecase = "SUM(_em.name, _table.A, _em.haha)"

// let text = "SUM(_em.name, _table.A, _em.haha)";
let pattern = /[_A-Za-z^]+\.[_A-Za-z^]+/g;


export default function ExpParser(exp) {
    let result = exp.match(pattern);
    console.log(result);
    return result;
}