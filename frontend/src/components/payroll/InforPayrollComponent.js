import styled from "styled-components";
import { useState, useEffect } from 'react';

import _ from 'lodash';

import { Icon, Input, Label, Menu, Table, Button, Header, Step, Container, Form, Dropdown, Segment, Accordion, Checkbox } from 'semantic-ui-react'


const randomKey = 'r';

const RuleStructCheckbox = ({ ruleStruct, ruleCheckbox, setRuleCheckbox }) => {
    // console.log({ ruleCheckbox })
    if (!ruleStruct.id || !ruleCheckbox[randomKey + ruleStruct.id]) return <></>;

    const id = ruleStruct.id;
    const childrenId = ruleStruct.children?.map((e) => e.id);
    const handleChecked = (data) => {
        let _ruleCheckbox = _.cloneDeep(ruleCheckbox);
        _ruleCheckbox[randomKey + id].value = data;
        setRuleCheckbox(_ruleCheckbox)
    }

    return (<>
        <Checkbox
            label={ruleStruct.id + "    " + ruleStruct.name + ' - ' + childrenId.toString()}
            disabled={ruleCheckbox[randomKey + id].disable}
            onChange={(e, data) => handleChecked(data.checked)}
            checked={ruleCheckbox[randomKey + id].value}
        />
        <div style={{ marginLeft: '10px', paddingLeft: '10px', borderLeft: '1px solid black' }}>
            {ruleStruct.children?.map((e, index) => {
                return <RuleStructCheckbox key={index}
                    ruleStruct={e}
                    ruleCheckbox={ruleCheckbox}
                    setRuleCheckbox={setRuleCheckbox}
                ></RuleStructCheckbox>
            })
            }
        </div>
    </>)

}

export default function InforPayrollComponent({ editMode, newDataInfor, setNewDataInfor, ruleCheckbox, setRuleCheckbox, ruleStruct, setRuleStruct }) {

    const onChangeNewInfor = (e) => {
        let _newVar = _.cloneDeep(newDataInfor);
        _newVar[e.target.name] = e.target.value;
        setNewDataInfor(_newVar);
    }

    return (
        <>
            <Container>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Name</label>
                            <Input value={newDataInfor['name']} placeholder='Name...' name='name' onChange={onChangeNewInfor} />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Month</label>
                            <Input type="number" min="1" max="12" value={newDataInfor['month']} name='month' onChange={onChangeNewInfor} />
                        </Form.Field>
                        <Form.Field>
                            <label>Year</label>
                            <Input
                                // disabled
                                value={newDataInfor.year} />
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Container>

            <RuleStructCheckbox
                ruleStruct={ruleStruct}
                ruleCheckbox={ruleCheckbox}
                setRuleCheckbox={setRuleCheckbox}
            ></RuleStructCheckbox>

        </>
    );
};

