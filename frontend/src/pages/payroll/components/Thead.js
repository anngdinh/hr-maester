// // import { Form } from 'react-bootstrap';
// import _ from 'lodash';

// import { Parser as FormulaParser } from "hot-formula-parser";
// import ExpParser from '../utils/ExpParser';

// const emVar = "e";
// const tableVar = "t";
// const indexHolder = "random_string_for_replace";

// export default function Thead({ dataUser, formularArr, setFormularArr, dataArr, setDataArr }) {
//     let _dataArr = _.cloneDeep(dataArr);
//     let _formularArr = _.cloneDeep(formularArr);
//     const formulaParser = new FormulaParser();
//     formulaParser.setFunction('GET_EMPLOYEE', function (params) { // index i, j
//         let x = params[0];
//         // console.log(x)
//         return dataUser[params[1]][x];
//     });
//     formulaParser.setFunction('GET_TABLE', function (params) { // index i, j
//         let x = ColumnIndex(params[0]);
//         // console.log(x);
//         console.log({ _dataArr })
//         return _dataArr[x][params[1]];
//     });
//     // formulaParser.on('callFunction', function (name, params, done) {
//     //     if (name === 'GET_TABLE') {
//     //         let x = ColumnIndex(params[0]);
//     //         // console.log(x);
//     //         console.log({ _dataArr })
//     //         done(_dataArr[x][params[1]]);
//     //     }
//     // });

//     const ColumnIndex = (col) => {
//         let x = col.charCodeAt(0)
//         // console.log(x);
//         return x - 65;
//     }

//     return <thead>
//         <tr>
//             <th colSpan={2}>
//                 <div>
//                     Description
//                 </div>
//                 <div>
//                     Formular
//                 </div>
//             </th>
//             {formularArr?.map((value, index) => {
//                 return (
//                     <th key={index}>
//                         <Form.Control
//                             type="text"
//                             // name={props.name}
//                             // defaultValue={value}
//                             placeholder="Description..."
//                         />
//                         <br />
//                         <Form.Control
//                             type="text"
//                             // name={props.name}
//                             defaultValue={value}
//                             placeholder="Formular..."
//                             onChange={(e) => {
//                                 let value = e.target.value;
//                                 _formularArr = _.cloneDeep(formularArr)
//                                 _formularArr[index] = value;
//                                 setFormularArr(_formularArr);

//                                 var formularExtract = _formularArr.map(e => ExpParser(e))
//                                 // console.log({ formularExtract })

//                                 _dataArr = _.cloneDeep(dataArr)
//                                 // _dataArr[index] = _dataArr[index].map(e => value)

//                                 var parserString = _formularArr.map((e, i) => {
//                                     let parseElement = formularExtract[i]?.map((e) => {
//                                         const element = e.split('.');
//                                         // console.log({element})
//                                         if (e[0] === emVar) return 'GET_EMPLOYEE("' + element[1] + '", ' + indexHolder + ")";
//                                         else if (e[0] === tableVar) return 'GET_TABLE("' + element[1] + '", ' + indexHolder + ")";
//                                     })
//                                     let f = e;

//                                     for (let index = 0; formularExtract[i] !== null && index < formularExtract[i].length; index++) {
//                                         f = f.replace(formularExtract[i][index], parseElement[index])
//                                     }
//                                     return f;
//                                 })

//                                 console.log({ parserString })

//                                 for (let i = 0; i < _dataArr.length; i++) {
//                                     for (let j = 0; j < _dataArr[i].length; j++) {
//                                         let x = parserString[i].replaceAll(indexHolder, j)
//                                         let y = formulaParser.parse(x);
//                                         console.log(parserString[i])
//                                         console.log(parserString[i])
//                                         console.log({ x, y })
//                                         _dataArr[i][j] = y.result !== null ? y.result : y.error;
//                                         // setDataArr(_dataArr)
//                                     }
//                                 }

//                                 setDataArr(_dataArr);
//                             }}
//                         />
//                     </th>
//                 )
//             })}
//         </tr>
//     </thead>;
// }