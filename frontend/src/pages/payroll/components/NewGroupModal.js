import React, { useState } from 'react';
import _ from "lodash";
import { Button, Icon, Input, Modal, Table, Form, Container, Dropdown } from "semantic-ui-react";
import axios from "axios";

export default function NewGroupModal({ rule, setGroupPayroll }) {
    const [open, setOpen] = useState(false);
    const ruleOptions = Object.keys(rule).map((value, index) => ({
        key: parseInt(value),
        text: rule[value].name,
        value: rule[value].id,
    }));

    const [newVar, setNewVar] = useState({ name: '', alias: '', description: '' });
    const [ruleBelong, setRuleBelong] = useState([]);


    const onChangeNewVar = (e) => {
        let _newVar = _.cloneDeep(newVar);
        _newVar[e.target.name] = e.target.value;
        // console.log(_newVar)
        setNewVar(_newVar);
    }

    const saveNewGroup = async () => {
        try {
            let ID = 0;
            await axios
                .post(
                    process.env.REACT_APP_BACKEND + "/api/payroll/groupRule/create",
                    newVar
                )
                .then((response) => {
                    console.log("response: ", response.data);
                    ID = response.data.id;
                });
            await axios
                .post(
                    process.env.REACT_APP_BACKEND + "/api/payroll/groupRule/updateGroupRuleHaveRule",
                    {
                        'g_rule': ID,
                        'rule': ruleBelong
                    }
                )
                .then((response) => {
                    console.log("response: ", response.data);
                    ID = response.data.id;
                });
            const { data: response } = await axios.get(process.env.REACT_APP_BACKEND + '/api/payroll/groupRule/getBelongGroupRule');
            setGroupPayroll(response);
        }
        catch (err) {
            console.log("ERROR: ", err);
        }
    };

    return <>
        <Modal
            closeOnDimmerClick={false}
            closeOnEscape={false}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button positive floated="right" onClick={() => { }}>
                    <Icon name='add' />
                    New Group
                </Button>
            }>
            <Modal.Header>Create New Group</Modal.Header>
            <Modal.Content>
                <Container>
                    <Form>
                        <Form.Field>
                            <label>Name</label>
                            <Input value={newVar['name']} placeholder='Name...' name='name' onChange={onChangeNewVar} />
                        </Form.Field>
                        <Form.Field>
                            <label>Alias</label>
                            <Input disabled value={newVar['alias']} placeholder='...' name='alias' onChange={onChangeNewVar} />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <Input value={newVar['description']} placeholder='Description...' name='description' onChange={onChangeNewVar} />
                        </Form.Field>
                        <Form.Field>
                            <label>Payroll belong</label>
                            <Dropdown
                                placeholder='Click to choose...'
                                // fluid
                                multiple
                                search
                                selection
                                options={ruleOptions}
                                onChange={(e, data) => setRuleBelong(data.value)}
                            />
                        </Form.Field>
                    </Form>
                </Container>

            </Modal.Content>

            <Modal.Actions>
                <Button onClick={() => setOpen(false)}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button primary onClick={() => {
                    // console.log({ newVar, ruleBelong })
                    saveNewGroup()
                    setOpen(false)
                }}>
                    <Icon name='checkmark' /> Save
                </Button>
            </Modal.Actions>
        </Modal>


    </>;
};

