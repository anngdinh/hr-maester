import axios from 'axios';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Tab, Icon, Label, Menu, Table, Input, Button, Dropdown, Header, Container } from 'semantic-ui-react';
import { DefineRoutes } from '../../routes';
// import { __AllPayroll } from '../data/PayrollData';

export default function AllPayroll() {
    const [allPayroll, setAllPayroll] = useState([])

    const navigate = useNavigate()
    const [menu, setMenu] = useState('table')
    const handleMenuClick = (e, { name }) => {
        setMenu(name)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                {
                    const { data: response } = await axios.get(process.env.REACT_APP_BACKEND + '/api/payroll/payroll/read');
                    // match data
                    let payroll = response.payroll;
                    payroll.forEach((e) => {
                        let rule = response.allRule.filter(element => element.export_payroll_monthly_id == e.id)
                        e["rule"] = rule.map(e => e.salary_rule_id)
                    });
                    
                    setAllPayroll(payroll)
                }
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
                    New Payroll
                </Button>
            </Menu.Menu>
        </Menu>


        <Container fluid>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Month</Table.HeaderCell>
                        {/* <Table.HeaderCell>Create</Table.HeaderCell> */}
                        {/* .......................... */}
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
        </Container>
    </>;
}