import axios from 'axios';
import _, { set } from 'lodash';
import { useState, useEffect } from 'react';

import { Icon, Label, Menu, Table, Input, Button, Dropdown, Header, Container, Form } from 'semantic-ui-react';
import EditGroupModal from './components/EditGroupModal';
import NewGroupModal from "./components/NewGroupModal";

export default function GroupPayroll() {
    const [groupPayroll, setGroupPayroll] = useState({ "rule": {}, "belong": {}, "g_rule": {} })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(process.env.REACT_APP_BACKEND + '/api/payroll/groupRule/getBelongGroupRule');
                setGroupPayroll(response);
            } catch (error) {
                console.error(error)
            }
        };

        fetchData();
    }, [])

    return <>
        <Header as='h2'>
            <Icon name='tags' />
            <Header.Content>
                Group Payroll
                <Header.Subheader>Payroll with similar role</Header.Subheader>
            </Header.Content>
        </Header>

        <Container textAlign='right' style={{ marginBottom: '10px' }}>
            <NewGroupModal
                rule={groupPayroll.rule}
                setGroupPayroll={setGroupPayroll}
            ></NewGroupModal>
        </Container>

        <Container>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>Group ID</Table.HeaderCell>
                        <Table.HeaderCell>Group Name</Table.HeaderCell>
                        {/* <Table.HeaderCell>Alias</Table.HeaderCell> */}
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Payrolls</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        Object.keys(groupPayroll.g_rule).map((key, i) => {
                            return <Table.Row key={i}>
                                <Table.Cell>{i + 1}</Table.Cell>
                                <Table.Cell>GRP_{parseInt(key) + 1}</Table.Cell>
                                <Table.Cell>{groupPayroll.g_rule[key].name}</Table.Cell>
                                <Table.Cell>{groupPayroll.g_rule[key].description}</Table.Cell>
                                <Table.Cell>
                                    {groupPayroll.belong[key]?.map((e, j) => {
                                        return <Label key={j}>{groupPayroll.rule[e].name}</Label>
                                    })}
                                </Table.Cell>

                                <Table.Cell>
                                    <Form.Group inline>
                                        <EditGroupModal
                                            g_rule_id={parseInt(key)}
                                            groupPayroll={groupPayroll}
                                            setGroupPayroll={setGroupPayroll}
                                        ></EditGroupModal>
                                        <Button
                                            basic
                                            negative
                                            icon='trash'
                                            onClick={() => { }}
                                        />
                                    </Form.Group>
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