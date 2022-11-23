import _ from 'lodash';

import { Table, Input, Dropdown } from 'semantic-ui-react'

import { HyperFormula } from 'hyperformula';
import ExpParser from '../../utils/ExpParser';


import { valueError, emVar, tableVar, indexHolder, employeeTableName, tableTableName, getDataColumn } from "../../utils/Constant";

const optionsTypeInput = [
    { key: 'formular', text: 'F', value: 'formular' },
    { key: 'digit', text: 'D', value: 'digit' },
]

export default function Thead3({ dataUser, formularArr, setFormularArr, dataTableArr, setDataTableArr, descriptionArr, setDescriptionArr }) {
    let _dataTableArr = _.cloneDeep(dataTableArr);
    let _formularArr = _.cloneDeep(formularArr);


    const dataUserField = Object.keys(dataUser[0]);

    const UserFieldToChar = (userField) => {
        let j = dataUserField.indexOf(userField)
        return String.fromCharCode(j + 65)
    }

    const DataUserObjectToDataUserArr = () => {
        return dataUser.map((e) => {
            return dataUserField.map((field) => e[field])
        })
    };
    const dataUserArr = DataUserObjectToDataUserArr();

    // initiate the engine with no data
    const hfInstance = HyperFormula.buildEmpty({ licenseKey: 'gpl-v3' });

    const employeeSheetId = hfInstance.getSheetId(hfInstance.addSheet(employeeTableName));
    hfInstance.setSheetContent(employeeSheetId, dataUserArr);

    const tableSheetId = hfInstance.getSheetId(hfInstance.addSheet(tableTableName));
    hfInstance.setSheetContent(tableSheetId, dataTableArr);

    const HyperFormulaVersion = (e, index) => {
        let value = e.target.value;
        _formularArr = _.cloneDeep(formularArr)
        _formularArr[index] = value;
        setFormularArr(_formularArr);

        var formularExtract = _formularArr.map(e => ExpParser(e))
        // console.log({ formularExtract })

        _dataTableArr = _.cloneDeep(dataTableArr)

        var parserString = _formularArr.map((e, i) => {
            let parseElement = formularExtract[i]?.map((e) => {
                const element = e.split('.');
                // console.log({element})
                if (e[0] === emVar) return employeeTableName + '!' + UserFieldToChar(element[1]) + indexHolder;
                else if (e[0] === tableVar) return tableTableName + '!' + element[1] + indexHolder;
            })
            let f = e;

            for (let index = 0; formularExtract[i] !== null && index < formularExtract[i].length; index++) {
                f = f.replace(formularExtract[i][index], parseElement[index])
            }
            return f;
        })


        for (let i = 0; i < _dataTableArr.length; i++) {
            for (let j = 0; j < _dataTableArr[i].length; j++) {
                let x = parserString[j].replaceAll(indexHolder, i + 1)
                _dataTableArr[i][j] = x;
            }
        }
        hfInstance.setSheetContent(tableSheetId, _dataTableArr);
        const sheetValue = hfInstance.getSheetValues(tableSheetId)

        console.log({ _dataTableArr, sheetValue })

        let checkError = sheetValue.map((e) => {
            return e.map((value) => {
                if (typeof value === 'object' &&
                    value !== null &&
                    !Array.isArray(value))
                    return value.value;
                return value;
            })
        })
        console.log({ _formularArr, checkError })

        setDataTableArr(checkError);
    }

    // function getDataColumn(dataTableArr, index) {
    //     return dataTableArr.map((e) => e[index])
    // }

    return <Table.Header>
        <Table.Row>
            <Table.HeaderCell colSpan={2}>
                Description
            </Table.HeaderCell>
            {descriptionArr?.map((value, index) => {
                return (
                    <Table.HeaderCell key={index}>
                        <Input
                            // label={<Dropdown defaultValue='formular' options={optionsTypeInput} />}
                            // labelPosition='left'
                            fluid
                            type="text"
                            defaultValue={value}
                            placeholder="Description..."
                            onChange={(e) => {
                                let value = e.target.value;
                                let _descriptionArr = _.cloneDeep(descriptionArr)
                                _descriptionArr[index] = value;
                                setDescriptionArr(_descriptionArr);
                            }}
                        />
                    </Table.HeaderCell>
                )
            })}
        </Table.Row>
        <Table.Row>
            <Table.HeaderCell colSpan={2}>
                <div>
                    Formular
                </div>
            </Table.HeaderCell>
            {formularArr?.map((value, index) => {
                return (
                    <Table.HeaderCell key={index}>
                        <Input
                            fluid
                            type="text"
                            defaultValue={value}
                            placeholder="Formular..."
                            error={valueError.reduce((previousValue, currentValue) => previousValue || getDataColumn(dataTableArr, index).includes(currentValue), false)}
                            // onChange={(e) => HotFormularParserVersion(e, index)}
                            onChange={(e) => HyperFormulaVersion(e, index)}
                        />
                    </Table.HeaderCell>
                )
            })}
        </Table.Row>
    </Table.Header>;
}