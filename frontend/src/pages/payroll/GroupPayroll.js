import _, { set } from 'lodash';
import { useState, useEffect } from 'react';

import { Icon, Label, Menu, Table, Input, Button, Dropdown, Header, Container } from 'semantic-ui-react';
import { __GroupPayroll } from '../data/PayrollData';

export default function GroupPayroll() {
    const [groupPayroll, setGroupPayroll] = useState({})

    useEffect(() => {
        setGroupPayroll(__GroupPayroll)
    }, [])

    return <>
        <Header as='h2'>
            <Icon name='tags' />
            <Header.Content>
                Group Payroll
                <Header.Subheader>Payroll with similar role</Header.Subheader>
            </Header.Content>
        </Header>

        <Container>
            <Button positive floated="right" onClick={() => { }}>
                <Icon name='add' />
                New Group
            </Button>
        </Container>

        <Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>Group ID</Table.HeaderCell>
                        <Table.HeaderCell>Group Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Payrolls</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        Object.keys(groupPayroll).map((key, i) => {
                            return <Table.Row key={i}>
                                <Table.Cell>{i + 1}</Table.Cell>
                                <Table.Cell>GRP_{i + 1}</Table.Cell>
                                <Table.Cell>{key}</Table.Cell>
                                <Table.Cell>...</Table.Cell>
                                <Table.Cell>
                                    {groupPayroll[key].map((e, j) => {
                                        return <Label key={j}>{e}</Label>
                                    })}
                                </Table.Cell>

                                <Table.Cell>
                                    <Button
                                        basic
                                        icon='edit'
                                        onClick={() => { }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        }
                        )
                    }

                </Table.Body>

            </Table>
        </Container>
    </>;
}