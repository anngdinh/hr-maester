import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { Tab, Icon, Label, Menu, Table, Input, Button, Dropdown, Header, Container } from 'semantic-ui-react';
import { DefineRoutes } from '../../routes';

import parseStruct from "../../utils/parseStruct";
import InforPayrollComponent from "./InforPayrollComponent";

const randomKey = 'r';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// const rows = [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

// const columns = [
//     { field: 'col1', headerName: 'Column 1', width: 150, editable: true },
//     { field: 'col2', headerName: 'Column 2', width: 150 },
// ];

const PayrollDetail = () => {
    const { id } = useParams();
    const [editMode, setEditMode] = useState(false) // ..............................

    const [ruleCheckbox, setRuleCheckbox] = useState({})  //{1:{value:true, disable:false}}
    const [ruleStruct, setRuleStruct] = useState({})
    const [newDataInfor, setNewDataInfor] = useState({ name: 'Loadding...', month: -1, year: -1 })

    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(process.env.REACT_APP_BACKEND + '/api/payroll/rule/read');
                console.log({ response })
                let x = parseStruct(response)
                // console.log({x})
                setRuleStruct(x)

                const { data: response2 } = await axios.get(process.env.REACT_APP_BACKEND + `/api/payroll/payroll/readSingle/${id}`);
                console.log({ response2 })
                setRows(response2.rows)
                setColumns(response2.columns)
                setNewDataInfor({
                    name: response2.payroll[0].name,
                    month: parseInt(response2.payroll[0].month.slice(4)),
                    year: parseInt(response2.payroll[0].month.slice(0, 4))
                })
                setRuleCheckbox(() => {
                    let result = {}
                    response.forEach(element => {
                        result[randomKey + element.id] = { value: false, disable: false }
                    });

                    response2.rules.forEach(element => {
                        result[randomKey + element.id].value = true
                    });

                    result[randomKey + 1].disable = true; // rootRule
                    // console.log({ result })
                    return result;
                })


            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, [])

    return <>
        <Header as='h2'>
            <Icon name='list' />
            <Header.Content>
                All Payroll
                <Header.Subheader>Manage all payroll</Header.Subheader>
            </Header.Content>
        </Header>

        <Menu secondary>
            {/* <Menu.Item
                name='table'
                active={menu === 'table'}
                onClick={handleMenuClick}
            />
            <Menu.Item
                name='treeView'
                active={menu === 'treeView'}
                onClick={handleMenuClick}
            /> */}

            <Menu.Menu position='right'>
                <Button positive onClick={() => navigate(DefineRoutes.newPayroll.path)}>
                    <Icon name='add' />
                    Edit
                </Button>
            </Menu.Menu>
        </Menu>

        <InforPayrollComponent
            editMode={false}
            newDataInfor={newDataInfor}
            setNewDataInfor={setNewDataInfor}
            ruleCheckbox={ruleCheckbox}
            setRuleCheckbox={setRuleCheckbox}
            ruleStruct={ruleStruct}
            setRuleStruct={setRuleStruct}
        ></InforPayrollComponent>

        <Container>
            <div style={{ height: 600 }}>
                <DataGrid
                    // checkboxSelection
                    disableSelectionOnClick
                    editMode="row"
                    rows={rows}
                    columns={columns}
                />
            </div>
        </Container>

        {/* <Container fluid>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Month</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        allPayroll?.map((e, index) => {
                            return <Table.Row key={index}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{e.id}</Table.Cell>
                                <Table.Cell>{e.name}</Table.Cell>
                                <Table.Cell>{e.month}</Table.Cell>
                                <Table.Cell>{e.canModify == true ? "preview" : "finish"}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        basic
                                        icon='eye'
                                        onClick={() => navigate(DefineRoutes.payrollDetail.path.replace(':id', e.id))}
                                    />
                                    <Button
                                        basic
                                        icon='edit'
                                        onClick={() => { }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        })
                    }
                </Table.Body>

            </Table>
        </Container> */}
    </>;
};

export default PayrollDetail;