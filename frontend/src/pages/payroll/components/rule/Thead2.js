// import _ from 'lodash';

// import { Icon, Label, Menu, Table, Input } from 'semantic-ui-react'

// import { Parser as FormulaParser } from "hot-formula-parser";
// import ExpParser from '../utils/ExpParser';


// import { valueError, emVar, tableVar, indexHolder, employeeTableName, tableTableName, getDataColumn } from "../utils/Constant";


// export default function Thead2({ dataUser, formularArr, setFormularArr, dataArr, setDataArr, descriptionArr, setDescriptionArr }) {
//     let _dataArr = _.cloneDeep(dataArr);
//     let _formularArr = _.cloneDeep(formularArr);

//     const formulaParser = new FormulaParser();
//     formulaParser.setFunction(employeeTableName, function (params) { // index i, j
//         let x = params[0];
//         // console.log(x)
//         return dataUser[params[1]][x];
//     });
//     formulaParser.setFunction(tableTableName, function (params) { // index i, j
//         let x = ColumnIndex(params[0]);
//         // console.log(x);
//         // console.log({ _dataArr })
//         return _dataArr[params[1]][x];
//     });

//     const ColumnIndex = (col) => {
//         let x = col.charCodeAt(0)
//         // console.log(x);
//         return x - 65;
//     }

//     const HotFormularParserVersion = (e, index) => {
//         let value = e.target.value;
//         _formularArr = _.cloneDeep(formularArr)
//         _formularArr[index] = value;
//         setFormularArr(_formularArr);

//         var formularExtract = _formularArr.map(e => ExpParser(e))
//         // console.log({ formularExtract })

//         _dataArr = _.cloneDeep(dataArr)
//         // _dataArr[index] = _dataArr[index].map(e => value)

//         var parserString = _formularArr.map((e, i) => {
//             let parseElement = formularExtract[i]?.map((e) => {
//                 const element = e.split('.');
//                 // console.log({element})
//                 if (e[0] === emVar) return employeeTableName + '("' + element[1] + '", ' + indexHolder + ")";
//                 else if (e[0] === tableVar) return tableTableName + '("' + element[1] + '", ' + indexHolder + ")";
//             })
//             let f = e;

//             for (let index = 0; formularExtract[i] !== null && index < formularExtract[i].length; index++) {
//                 f = f.replace(formularExtract[i][index], parseElement[index])
//             }
//             return f;
//         })

//         // console.log({ parserString })

//         for (let i = 0; i < _dataArr.length; i++) {
//             for (let j = 0; j < _dataArr[i].length; j++) {
//                 let x = parserString[j].replaceAll(indexHolder, i)
//                 let y = formulaParser.parse(x.slice(1)); // remove letter '='
//                 // console.log(parserString[i])
//                 // console.log({ x, y })
//                 _dataArr[i][j] = y.result !== null ? y.result : y.error;
//                 // setDataArr(_dataArr)
//             }
//         }

//         setDataArr(_dataArr);
//     }

//     return <Table.Header>
//         <Table.Row>
//             <Table.HeaderCell colSpan={2}>
//                 Description
//             </Table.HeaderCell>
//             {descriptionArr?.map((value, index) => {
//                 return (
//                     <Table.HeaderCell key={index}>
//                         <Input
//                             fluid
//                             type="text"
//                             defaultValue={value}
//                             placeholder="Description..."
//                             onChange={(e) => {
//                                 let value = e.target.value;
//                                 let _descriptionArr = _.cloneDeep(descriptionArr)
//                                 _descriptionArr[index] = value;
//                                 setDescriptionArr(_descriptionArr);
//                             }}
//                         />
//                     </Table.HeaderCell>
//                 )
//             })}
//         </Table.Row>
//         <Table.Row>
//             <Table.HeaderCell colSpan={2}>
//                 <div>
//                     Formular
//                 </div>
//             </Table.HeaderCell>
//             {formularArr?.map((value, index) => {
//                 return (
//                     <Table.HeaderCell key={index}>
//                         <Input
//                             fluid
//                             type="text"
//                             defaultValue={value}
//                             placeholder="Formular..."
//                             error={valueError.reduce((previousValue, currentValue) => previousValue || getDataColumn(dataArr, index).includes(currentValue), false)}
//                             onChange={(e) => HotFormularParserVersion(e, index)}
//                         />
//                     </Table.HeaderCell>
//                 )
//             })}
//         </Table.Row>
//     </Table.Header>;
// }