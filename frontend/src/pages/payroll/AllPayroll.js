import axios from 'axios';
import _, { set } from 'lodash';
import { useState, useEffect } from 'react';

import { Icon, Label, Menu, Table, Input, Button, Dropdown, Header, Container } from 'semantic-ui-react';
import { __AllPayroll } from '../data/PayrollData';

export default function AllPayroll() {
    const [allRule, setAllRule] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                {
                    const { data: response } = await axios.get(process.env.REACT_APP_BACKEND + '/api/payroll/rule/read');
                    setAllRule(response)
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
                All Rule
                <Header.Subheader>Manage all rule</Header.Subheader>
            </Header.Content>
        </Header>


        <Container fluid>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Group</Table.HeaderCell>
                        <Table.HeaderCell>Rule dependency</Table.HeaderCell>
                        <Table.HeaderCell>Variable</Table.HeaderCell>
                        <Table.HeaderCell>Effect</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        allRule.map((e, index) => {
                            return <Table.Row key={index}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{e.id}</Table.Cell>
                                <Table.Cell>{e.name}</Table.Cell>
                                <Table.Cell>{e.description}</Table.Cell>
                                <Table.Cell>{e.groupBelongId}</Table.Cell>
                                <Table.Cell>999</Table.Cell>
                                <Table.Cell>999</Table.Cell>
                                <Table.Cell>999</Table.Cell>
                                <Table.Cell>
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