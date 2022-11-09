import _ from 'lodash';
import { useState } from 'react';

import { Icon, Label, Menu, Table, Input, Button, Dropdown, Modal, Header } from 'semantic-ui-react';

export default function RuleDependencyModal() {
    const [open, setOpen] = useState(false)

    const payrollRule = ['Total income', 'Dependent person', 'Basic salary', 'BHYT', 'Bonus money', 'Tax'];
    const stateOptions = payrollRule.map((value, index) => ({
        key: value,
        text: value,
        value: index,
    }));

    const [payrollValue, setPayrollValue] = useState([]);

    return <>
        <Modal
            closeOnDimmerClick={false}
            closeOnEscape={false}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Add rule dependency</Button>}
        >
            <Header icon='archive' content='Add rule dependency' />
            <Modal.Content>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Payroll Name</Table.HeaderCell>
                            <Table.HeaderCell>Name alias</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {payrollValue?.map((e, i) => {
                            return (<Table.Row key={i}>
                                <Table.Cell>{stateOptions[e].key}</Table.Cell>
                                <Table.Cell>{stateOptions[e].text}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        basic
                                        icon='trash'
                                        onClick={(e, data) => console.log({ e, data, e })}
                                    />
                                </Table.Cell>
                            </Table.Row>)
                        })}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                                <Dropdown
                                    placeholder='Select Payroll'
                                    // fluid
                                    multiple
                                    search
                                    selection
                                    options={stateOptions}
                                    onChange={(e, data) => setPayrollValue(data.value)}
                                />
                                {/* <Button
                                    floated='right'
                                    primary>
                                    Save
                                </Button> */}
                            </Table.HeaderCell>


                        </Table.Row>
                    </Table.Footer>
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