import styled from "styled-components";
import { useState, useEffect } from 'react';

import _ from 'lodash';

import { Icon, Input, Label, Menu, Table, Button, Header, Step, Container, Form, Dropdown, Segment, Accordion, Checkbox } from 'semantic-ui-react'
import axios from "axios";
import parseStruct from "../../utils/parseStruct";

const randomKey = 'r';

const RuleStructCheckbox = ({ ruleStruct, ruleCheckbox, setRuleCheckbox }) => {
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


export default function NewPayroll() {
    const [allRule, setAllRule] = useState([])
    const [ruleCheckbox, setRuleCheckbox] = useState({})  //{1:{value:true, disable:false}}
    const [ruleStruct, setRuleStruct] = useState({})

    const [newDataInfor, setNewDataInfor] = useState({ name: 'MONTHLY PAYROLL', month: new Date().getMonth() + 1, year: new Date().getFullYear() })

    useEffect(() => {
        const fetchData = async () => {
            try {
                {
                    const { data: response } = await axios.get(process.env.REACT_APP_BACKEND + '/api/payroll/rule/read');
                    setAllRule(response)
                    let x = parseStruct(response)
                    // console.log({x})
                    setRuleStruct(x)
                    setRuleCheckbox(() => {
                        let result = {}
                        response.forEach(element => {
                            result[randomKey + element.id] = { value: true, disable: false }
                        });

                        result[randomKey + 1].disable = true; // rootRule
                        // console.log({ result })
                        return result;
                    })
                }
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, [])

    const onChangeNewInfor = (e) => {
        let _newVar = _.cloneDeep(newDataInfor);
        _newVar[e.target.name] = e.target.value;
        setNewDataInfor(_newVar);
    }

    return (
        <>
            <Header as='h2'>
                <Icon name='file outline' />
                <Header.Content>
                    Create new payroll
                </Header.Content>
            </Header>

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
                            <Input value={newDataInfor.year} disabled />
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Container>

            <RuleStructCheckbox
                ruleStruct={ruleStruct}
                ruleCheckbox={ruleCheckbox}
                setRuleCheckbox={setRuleCheckbox}
            ></RuleStructCheckbox>

            <Button color='red' onClick={() => { }}>
                <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' onClick={() => { }}>
                <Icon name='checkmark' /> Create
            </Button>
        </>
    );
};

