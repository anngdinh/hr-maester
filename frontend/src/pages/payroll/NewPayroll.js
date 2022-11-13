import styled from "styled-components";
import { useState, useEffect } from 'react';

import _ from 'lodash';

import { Icon, Input, Label, Menu, Table, Button, Header, Step, Container, Form, Dropdown, Segment, Accordion } from 'semantic-ui-react'

import VariableModal from "./components/rule/VariableModal";
import RuleDependencyModal from "./components/rule/RuleDependencyModal";
import { __dataUser, __descriptionInit, __formularInit, __query, __queryFilter } from "../data/PayrollData";
import MyQueryBuilder from "./components/rule/MyQueryBuilder";
import axios from "axios";
import AddDataGrid from "./components/rule/AddDataGrid";
import FormulaTable from "./components/rule/FormulaTable";
import BasicInformation from "./components/rule/BasicInformation";

export default function NewPayroll() {
    const [ruleFetchData, setRuleFetchData] = useState([]);
    const [groupFetchData, setGroupFetchData] = useState([]);

    const [newDataInfor, setNewDataInfor] = useState({
        name: '',
        alias: '',
        description: '',
        isIncome: true,
    });
    const [groupAllOptions, setGroupAllOptions] = useState([]);
    const [groupBelong, setGroupBelong] = useState([])
    const [groupBelongOptions, setGroupBelongOptions] = useState([])

    const [variable, setVariable] = useState([
        { name: 'Tax level 1', alias: 'tax_level_1', value: '0.1' },
        { name: 'Tax level 2', alias: 'tax_level_2', value: '0.35' }]);

    const [ruleDepend, setRuleDepend] = useState([])
    const [groupDepend, setGroupDepend] = useState([])

    const [query, setQuery] = useState(__query)
    const [queryFilter, setQueryFilter] = useState(__queryFilter)

    const [dataUser, setDataUser] = useState([{}])
    const [formularArr, setFormularArr] = useState([])
    const [descriptionArr, setDescriptionArr] = useState([])
    const [dataTableArr, setDataTableArr] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                {
                    const { data: response } = await axios.get(process.env.REACT_APP_BACKEND + '/api/payroll/groupRule/read');
                    setGroupFetchData(response);
                    const x = response.map((e, i) => ({
                        key: e.id,
                        text: e.name,
                        value: e.id,
                        alias: e.alias,
                        disabled: false
                    }))
                    setGroupAllOptions(x)
                    setGroupBelongOptions(x)
                }
                {
                    const { data: response } = await axios.get(process.env.REACT_APP_BACKEND + '/api/payroll/rule/read');
                    setRuleFetchData(response);
                }
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();

        setDataUser(__dataUser);
        setFormularArr(__formularInit)
        setDescriptionArr(__descriptionInit)
        setDataTableArr(new Array(__dataUser.length).fill(0).map(() => new Array(__formularInit.length).fill(0)))
    }, [])

    const submitNewRule = () => {
        let data = {
            ...newDataInfor,
            variable: variable,
            groupBelong: groupBelong,
            ruleDepend: ruleDepend,
            groupDepend: groupDepend,
            // query: JSON.stringify(query),
            query: query,
            formularArr: formularArr,
            descriptionArr: descriptionArr
        }
        console.log(data)
        const x = axios.post(process.env.REACT_APP_BACKEND + '/api/payroll/rule/createFullRule', data);
    }

    return (
        <>
            <Header as='h2'>
                <Icon name='file outline' />
                <Header.Content>
                    Create new payroll
                    {/* <Header.Subheader>Manage your preferences</Header.Subheader> */}
                </Header.Content>
            </Header>

            <Header as='h3' dividing>
                1. Information
            </Header>
            <Container>
                <BasicInformation
                    newDataInfor={newDataInfor}
                    setNewDataInfor={setNewDataInfor}
                    groupBelongOptions={groupBelongOptions}
                    setGroupBelong={setGroupBelong}
                ></BasicInformation>
            </Container>

            <Header as='h3' dividing>
                2. Payroll dependency and Variable
            </Header>

            <Container>
                <VariableModal
                    variable={variable}
                    setVariable={setVariable}></VariableModal>
                <RuleDependencyModal
                    groupBelong={groupBelong}
                    groupBelongOptions={groupBelongOptions}
                    setGroupBelongOptions={setGroupBelongOptions}
                    groupFetchData={groupFetchData}
                    ruleFetchData={ruleFetchData}
                    ruleDepend={ruleDepend}
                    setRuleDepend={setRuleDepend}
                    groupDepend={groupDepend}
                    setGroupDepend={setGroupDepend}></RuleDependencyModal>
            </Container>

            <Header as='h3' dividing>
                3. Query builder
            </Header>

            <Container>
                <MyQueryBuilder
                    query={query}
                    setQuery={setQuery}
                    queryFilter={queryFilter}></MyQueryBuilder>
            </Container>


            <Header as='h3' dividing>
                4. Additional data
            </Header>
            <Container>
                <AddDataGrid></AddDataGrid>
            </Container>


            <Header as='h3' dividing>
                5. Formula table
            </Header>

            <FormulaTable
                formularArr={formularArr}
                setFormularArr={setFormularArr}
                descriptionArr={descriptionArr}
                setDescriptionArr={setDescriptionArr}
                dataTableArr={dataTableArr}
                setDataTableArr={setDataTableArr}
                dataUser={dataUser}
            ></FormulaTable>


            <Container textAlign="center">
                <Button color='green' onClick={submitNewRule}>
                    <Icon name='checkmark' /> Create new payroll
                </Button>
            </Container>
        </>
    );
};

