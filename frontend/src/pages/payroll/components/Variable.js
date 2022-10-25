import _ from 'lodash';
import { useState } from 'react';

import { Icon, Label, Menu, Table, Input, Button, Dropdown } from 'semantic-ui-react';

export default function Variable() {
    const [variable, setVariable] = useState([]);
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
    </>;
}