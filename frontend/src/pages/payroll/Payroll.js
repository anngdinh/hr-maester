import styled from "styled-components";
import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Thead from "./components/Thead";
import Tbody from "./components/Tbody";

import _ from 'lodash';



const NewPayroll = () => {

    const dataUser = [
        { id: "E1", name: "Annn", age: 21, born: 2001 },
        { id: "E2", name: "Quan", age: 22, born: 2000 }
    ];
    const [formularArr, setFormularArr] = useState(['e.age', 'e.born', 't.A', 't.A * t.B '])

    const numUser = dataUser.length;
    const numFormular = 4;


    // const dataRender = new Array(numFormular).fill(0).map(() => new Array(numUser).fill(0));
    const [dataArr, setDataArr] = useState(new Array(numFormular).fill(0).map(() => new Array(numUser).fill(0)))


    const ExtractUserRow = () => {
        const extractUserRow = dataUser.map(e => {
            return { id: e.id, name: e.name };
        });
        // console.log({ extractUserRow })
        return extractUserRow;
    }
    const NewColumn = () => {
        let _formularArr = _.cloneDeep(formularArr);
        _formularArr.push("")

        let _dataArr = _.cloneDeep(dataArr);
        _dataArr.push(new Array(numUser).fill(0))

        setFormularArr(_formularArr);
        setDataArr(_dataArr);
    }


    return (
        <>
            <Table striped bordered hover>
                <Thead
                    dataUser={dataUser}
                    formularArr={formularArr}
                    setFormularArr={setFormularArr}
                    dataArr={dataArr}
                    setDataArr={setDataArr}
                >
                </Thead>
                <Tbody extractUserRow={ExtractUserRow()} dataArr={dataArr}></Tbody>
            </Table>
            <Button variant="primary" onClick={() => NewColumn()}>+ New column</Button>{' '}
        </>
    );
};





export default NewPayroll;

