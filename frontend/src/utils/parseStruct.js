const parseStruct = (arr) => {
    // console.log(arr)
    const rootRule = 1;

    let result = arr.filter(e => e.id === rootRule)[0];
    result.children = getChildrenRule(arr, rootRule);
    return result;
}

const getChildrenRule = (arr, id) => {
    let result = arr.filter(e => e.groupBelongId === id);
    result.forEach(element => {
        element.children = getChildrenRule(arr, element.id)
    });

    return result;
}

export default parseStruct;