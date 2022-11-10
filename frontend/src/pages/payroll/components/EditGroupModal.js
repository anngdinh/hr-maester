import React, { useState } from 'react';
import _ from "lodash";
import { Button, Icon, Input, Modal, Table, Form, Container, Dropdown } from "semantic-ui-react";
import axios from "axios";

export default function EditGroupModal({ g_rule_id, groupPayroll, setGroupPayroll }) {
    const [open, setOpen] = useState(false);
    const ruleOptions = Object.keys(groupPayroll.rule).map((value, index) => ({
        key: parseInt(value),
        text: groupPayroll.rule[value].name,
        value: groupPayroll.rule[value].id,
    }));

    const [newVar, setNewVar] = useState({
        id: g_rule_id,
        name: groupPayroll.g_rule[g_rule_id].name,
        alias: groupPayroll.g_rule[g_rule_id].alias,
        description: groupPayroll.g_rule[g_rule_id].description
    });
    const [ruleBelong, setRuleBelong] = useState(groupPayroll.belong[g_rule_id]);


    const onChangeNewVar = (e) => {
        let _newVar = _.cloneDeep(newVar);
        _newVar[e.target.name] = e.target.value;
        // console.log(_newVar)
        setNewVar(_newVar);
    }

    const saveNewGroup = async () => {
        try {
            await axios
                .post(
                    process.env.REACT_APP_BACKEND + "/api/payroll/groupRule/update",
                    newVar
                )
                .then((response) => {
                    console.log("response: ", response.data);
                });
            await axios
                .post(
                    process.env.REACT_APP_BACKEND + "/api/payroll/groupRule/updateGroupRuleHaveRule",
                    {
                        'g_rule': g_rule_id,
                        'rule': ruleBelong
                    }
                )
                .then((response) => {
                    console.log("response: ", response.data);
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
                <Button
                    basic
                    icon='edit'
                />
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
                                defaultValue={ruleBelong}
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

