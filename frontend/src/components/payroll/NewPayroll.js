import styled from "styled-components";
import { useState, useEffect } from 'react';

import _ from 'lodash';

import { Icon, Input, Label, Menu, Table, Button, Header, Step, Container, Form, Dropdown, Segment, Accordion, Checkbox } from 'semantic-ui-react'
import axios from "axios";
import parseStruct from "../../utils/parseStruct";
import InforPayrollComponent from "./InforPayrollComponent";
import { DefineRoutes } from "../../routes";
import { useNavigate } from 'react-router-dom';

const randomKey = 'r';


export default function NewPayroll() {
    const navigate = useNavigate()
    
    const [ruleCheckbox, setRuleCheckbox] = useState({})  //{1:{value:true, disable:false}}
    const [ruleStruct, setRuleStruct] = useState({})

    const [newDataInfor, setNewDataInfor] = useState({ name: 'MONTHLY PAYROLL', month: new Date().getMonth() + 1, year: new Date().getFullYear() })

    useEffect(() => {
        const fetchData = async () => {
            try {
                {
                    const { data: response } = await axios.get(process.env.REACT_APP_BACKEND + '/api/payroll/rule/read');
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

    const handleCreateNew = async () => {
        const data = {
            name: newDataInfor.name,
            month: newDataInfor.month,
            year: newDataInfor.year,
            rule: ruleCheckboxToArr()
        }
        // console.log({ data })
        await axios.post(process.env.REACT_APP_BACKEND + '/api/payroll/payroll/create', data)
            .then(response => {
                console.log({ response })
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        navigate(DefineRoutes.payroll.path)
    }

    const ruleCheckboxToArr = () => {
        var result = Object.keys(ruleCheckbox).reduce(function (result, rule) {
            // console.log({ rule })
            if (ruleCheckbox[rule].value)
                result.push(parseInt(rule.slice(randomKey.length)));
            return result;
        }, []);
        return result
    }

    return (
        <>
            <Header as='h2'>
                <Icon name='file outline' />
                <Header.Content>
                    Create new payroll
                </Header.Content>
            </Header>

            <InforPayrollComponent
                editMode={true}
                newDataInfor={newDataInfor}
                setNewDataInfor={setNewDataInfor}
                ruleCheckbox={ruleCheckbox}
                setRuleCheckbox={setRuleCheckbox}
                ruleStruct={ruleStruct}
                setRuleStruct={setRuleStruct}
            ></InforPayrollComponent>

            <Button color='red' onClick={() => { }}>
                <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' onClick={() => handleCreateNew()}>
                <Icon name='checkmark' /> Create
            </Button>
        </>
    );
};

