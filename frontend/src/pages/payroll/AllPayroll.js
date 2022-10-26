import _, { set } from 'lodash';
import { useState, useEffect } from 'react';

import { Icon, Label, Menu, Table, Input, Button, Dropdown, Header, Container } from 'semantic-ui-react';
import { __AllPayroll } from '../data/PayrollData';

export default function AllPayroll() {
    const [allPayroll, setAllPayroll] = useState([])

    useEffect(() => {
        setAllPayroll(__AllPayroll)
    }, [])

    return <>
        <Header as='h2'>
            <Icon name='list' />
            <Header.Content>
                All Payroll
                <Header.Subheader>Manage all payroll</Header.Subheader>
            </Header.Content>
        </Header>


        <Container fluid>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Payroll Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Group Payroll</Table.HeaderCell>
                        <Table.HeaderCell>Rule dependency</Table.HeaderCell>
                        <Table.HeaderCell>Variable</Table.HeaderCell>
                        <Table.HeaderCell>Effect</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        allPayroll.map((e, index) => {
                            return <Table.Row key={index}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{e.ID}</Table.Cell>
                                <Table.Cell>{e.name}</Table.Cell>
                                <Table.Cell>{e.description}</Table.Cell>
                                <Table.Cell>
                                    {e.groupPayroll.map((e, j) => {
                                        return <Label key={j}>{e}</Label>
                                    })}
                                </Table.Cell>
                                <Table.Cell>{e.ruleDependency}</Table.Cell>
                                <Table.Cell>{e.variable}</Table.Cell>
                                <Table.Cell>{e.effect}</Table.Cell>
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