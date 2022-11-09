import _ from 'lodash';
import { useState } from 'react';

import { Icon, Label, Menu, Table, Input, Button, Dropdown, Modal } from 'semantic-ui-react';

export default function VariableModal() {
    const [open, setOpen] = useState(false)

    const [variable, setVariable] = useState([
        { name: 'Tax level 1', alias: 'tax_level_1', value: '0.1' },
        { name: 'Tax level 2', alias: 'tax_level_2', value: '0.35' }]);
    const [newVar, setNewVar] = useState({ name: '', alias: '', value: '' });

    const onChangeNewVar = (e) => {
        let _newVar = _.cloneDeep(newVar);
        _newVar[e.target.name] = e.target.value;
        setNewVar(_newVar);
    }
    const saveNewVar = () => {
        console.log("saveNewVar", newVar)
        let _variable = _.cloneDeep(variable)
        console.log({ _variable })
        _variable.push(newVar);
        setNewVar({ name: '', alias: '', value: '' })
        setVariable(_variable);
    }
    const removeVar = (index) => {
        let _variable = _.cloneDeep(variable);
        _variable.splice(index, 1);
        setVariable(_variable);
    }

    return <>
        <Modal
            closeOnDimmerClick={false}
            closeOnEscape={false}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Add Variable</Button>}
        >
            <Modal.Header>Add variable</Modal.Header>
            <Modal.Content>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Variable Name</Table.HeaderCell>
                            <Table.HeaderCell>Name alias</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {variable?.map((e, i) => {
                            return (<Table.Row key={i}>
                                <Table.Cell>{e.name}</Table.Cell>
                                <Table.Cell>{e.alias}</Table.Cell>
                                <Table.Cell>{e.value}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        basic
                                        icon='trash'
                                        onClick={() => removeVar(i)}
                                    />
                                </Table.Cell>
                            </Table.Row>)
                        })}

                        <Table.Row>
                            <Table.Cell>
                                <Input value={newVar['name']} placeholder='Name...' name='name' onChange={onChangeNewVar} />
                            </Table.Cell>
                            <Table.Cell>
                                <Input value={newVar['alias']} placeholder='Alias...' name='alias' onChange={onChangeNewVar} />
                            </Table.Cell>
                            <Table.Cell>
                                <Input value={newVar['value']} placeholder='Value...' name='value' onChange={onChangeNewVar} />
                            </Table.Cell>
                            <Table.Cell>
                                <Button primary onClick={saveNewVar}>Save</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>

            </Modal.Content>

            <Modal.Actions>
                {/* <Button color='red' onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                </Button> */}
                <Button color='green' onClick={() => setOpen(false)}>
                    <Icon name='checkmark' /> Done
                </Button>
            </Modal.Actions>
        </Modal>


    </>;
}