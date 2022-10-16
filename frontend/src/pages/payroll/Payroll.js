// import styled from "styled-components";
import { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import _ from 'lodash';

import { Parser as FormulaParser } from "hot-formula-parser";
import ExpParser from './utils/ExpParser';


const emVar = "e";
const tableVar = "t";
const indexHolder = "rwyywtyyyu";

function Thead({ formularArr, setFormularArr, dataArr, setDataArr, formulaParser }) {
    return <thead>
        <tr>
            {formularArr?.map((value, index) => {
                return (
                    <th key={index}>
                        <Form.Control
                            type="text"
                            // name={props.name}
                            defaultValue={value}
                            placeholder="Formular..."
                            onChange={(e) => {
                                let value = e.target.value;
                                let _formularArr = _.cloneDeep(formularArr)
                                _formularArr[index] = value;
                                setFormularArr(_formularArr);

                                var formularExtract = _formularArr.map(e => ExpParser(e))
                                // console.log({ formularExtract })

                                let _dataArr = _.cloneDeep(dataArr)
                                _dataArr[index] = _dataArr[index].map(e => value)

                                var parserString = _formularArr.map((e, i) => {
                                    let parseElement = formularExtract[i].map((e) => {
                                        const element = e.split('.');
                                        // console.log({element})
                                        if (e[0] === emVar) return 'GET_EMPLOYEE("' + element[1] + '", ' + indexHolder + ")";
                                        else if (e[0] === tableVar) return 'GET_TABLE("' + element[1] + '", ' + indexHolder + ")";
                                    })
                                    let f = e;

                                    for (let index = 0; index < formularExtract[i].length; index++) {
                                        f = f.replace(formularExtract[i][index], parseElement[index])
                                    }
                                    return f;
                                })

                                console.log({ parserString })

                                for (let i = 0; i < _dataArr.length; i++) {
                                    for (let j = 0; j < _dataArr[i].length; j++) {
                                        let x = parserString[i].replaceAll(indexHolder, j)
                                        _dataArr[i][j] = formulaParser.parse(x).result;
                                    }
                                }

                                setDataArr(_dataArr);
                            }}
                        />
                    </th>
                )
            })}
        </tr>
    </thead>;
}

const Tbody = ({ dataArr }) => {
    return <tbody>
        {dataArr[0]?.map((_, i) => {
            return (
                <tr key={i}>
                    {dataArr?.map((_, j) => {
                        return (
                            <td key={j}>
                                {dataArr[j][i]}
                            </td>
                        )
                    })}
                </tr>
            )
        })}
    </tbody>;
}

const NewPayroll = () => {
    const dataUserField = ["id", "name", "age", "born"];

    const dataUser = [
        ["E1", "Annn", 21, 2001],
        ["E2", "Quan", 22, 2000]
    ];
    const [formularArr, setFormularArr] = useState(['e.age', 'e.born', 't.A', 't.A / t.B + e.age'])

    const numUser = dataUser.length;
    const numFormular = 4;


    const dataRender = new Array(numFormular).fill(0).map(() => new Array(numUser).fill(0));
    const [dataArr, setDataArr] = useState(dataRender)

    const formulaParser = new FormulaParser();
    formulaParser.setFunction('GET_EMPLOYEE', function (params) { // index i, j
        let x = dataUserField.indexOf(params[0]);
        // console.log(x)
        return dataUser[params[1]][x];
    });
    formulaParser.setFunction('GET_TABLE', function (params) { // index i, j
        let x = ColumnIndex(params[0]);
        // console.log(x);
        return dataArr[x][params[1]];
    });
    const ColumnIndex = (col) => {
        let x = col.charCodeAt(0)
        // console.log(x);
        return x - 65;
    }


    return (
        <>
            <Table striped bordered hover>
                <Thead
                    formularArr={formularArr}
                    setFormularArr={setFormularArr}
                    dataArr={dataArr}
                    setDataArr={setDataArr}
                    formulaParser={formulaParser}
                >
                </Thead>
                <Tbody dataArr={dataArr}></Tbody>
            </Table>
        </>
    );
};





export default NewPayroll;