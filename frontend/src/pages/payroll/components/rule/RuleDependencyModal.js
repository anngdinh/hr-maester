import _ from 'lodash';
import { useState } from 'react';

import { Icon, Label, Menu, Table, Input, Button, Dropdown, Modal, Header } from 'semantic-ui-react';

export default function RuleDependencyModal({ groupBelongOptions, setGroupBelongOptions, groupBelong, groupFetchData, ruleFetchData, ruleDepend, setRuleDepend, groupDepend, setGroupDepend }) {
    const [open, setOpen] = useState(false)
    let groupOptions = groupFetchData.map((e, i) => {
        let x = {
            key: e.id,
            text: e.name,
            value: e.id,
            alias: e.alias,
            disabled: false
        }
        if (groupBelong.includes(e.id)) x.disabled = true;
        else x.disabled = false;
        return x;
    })
    const ruleOptions = ruleFetchData.map((e, i) => ({
        key: e.id,
        text: e.name,
        value: e.id,
        alias: e.alias
    }))

    return <>
        <Modal
            closeOnDimmerClick={false}
            closeOnEscape={false}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Add rule dependency</Button>}
        >
            <Header icon='archive' content='Add Dependency' />
            <Modal.Content>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Alias</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {ruleDepend?.map((e, i) => {
                            const found = ruleFetchData.find(element => element.id == e);
                            return (<Table.Row key={i}>
                                <Table.Cell>{'R_' + found.id}</Table.Cell>
                                <Table.Cell>{found.name}</Table.Cell>
                                <Table.Cell>{found.alias}</Table.Cell>
                            </Table.Row>)
                        })}
                        <Table.Row>
                            <Table.Cell colSpan='3'>
                                <Dropdown
                                    placeholder='Select Rule'
                                    multiple
                                    search
                                    selection
                                    options={ruleOptions}
                                    defaultValue={ruleDepend}
                                    onChange={(e, data) => setRuleDepend(data.value)}
                                />
                            </Table.Cell>
                        </Table.Row>


                        {groupDepend?.map((e, i) => {
                            const found = groupFetchData.find(element => element.id == e);
                            return (<Table.Row key={i}>
                                <Table.Cell>{'GRP_' + found.id}</Table.Cell>
                                <Table.Cell>{found.name}</Table.Cell>
                                <Table.Cell>{found.alias}</Table.Cell>
                            </Table.Row>)
                        })}
                        <Table.Row>
                            <Table.Cell colSpan='3'>
                                <Dropdown
                                    placeholder='Select Group Rule'
                                    multiple
                                    search
                                    selection
                                    options={groupOptions}
                                    defaultValue={groupDepend}
                                    onChange={(e, data) => setGroupDepend(data.value)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>

            </Modal.Content>
            <Modal.Actions>
                {/* <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                </Button> */}
                <Button color='green' onClick={() => {
                    let x = _.cloneDeep(groupBelongOptions);
                    x.forEach((e, i) => {
                        if (groupDepend.includes(e.key)) x[i].disabled = true;
                        else x[i].disabled = false;
                    });
                    setGroupBelongOptions(x)
                    setOpen(false)
                }}>
                    <Icon name='checkmark' /> Done
                </Button>
            </Modal.Actions>
        </Modal>
    </>;
}