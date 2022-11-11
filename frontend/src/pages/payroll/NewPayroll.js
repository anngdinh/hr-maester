import styled from "styled-components";
import { useState, useEffect } from 'react';

import _ from 'lodash';

import { Icon, Input, Label, Menu, Table, Button, Header, Step, Container, Form, Dropdown, Segment, Accordion } from 'semantic-ui-react'

import Tbody2 from "./components/Tbody2";
import Thead3 from "./components/Thead3_HyperFomular";
import VariableModal from "./components/VariableModal";
import RuleDependencyModal from "./components/RuleDependencyModal";
import { __dataUser, __descriptionInit, __formularInit, __query, __queryFilter } from "../data/PayrollData";
import MyQueryBuilder from "./components/MyQueryBuilder";
import axios from "axios";

const resultColumnOptions = [
    { key: 'A', text: 'A', value: 'A', },
    { key: 'B', text: 'B', value: 'B', },
    { key: 'C', text: 'C', value: 'C', },
    { key: 'D', text: 'D', value: 'D', },
    { key: 'E', text: 'E', value: 'E', },
]

export default function NewPayroll() {
    const [ruleFetchData, setRuleFetchData] = useState([]);
    const [groupFetchData, setGroupFetchData] = useState([]);

    const [newDataInfor, setNewDataInfor] = useState({
        name: '',
        alias: '',
        description: '',
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
    const queryFilter = __queryFilter
    const [dataUser, setDataUser] = useState([{}])
    const [formularArr, setFormularArr] = useState([])
    const [descriptionArr, setDescriptionArr] = useState([])
    const [dataArr, setDataArr] = useState([])


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
        setDataArr(new Array(__dataUser.length).fill(0).map(() => new Array(__formularInit.length).fill(0)))
    }, [])

    const ExtractUserRow = () => {
        const extractUserRow = dataUser.map(e => {
            return { id: e.id, name: e.name };
        });
        // console.log({ extractUserRow })
        return extractUserRow;
    }
    const NewColumn = () => {
        let _descriptionArr = _.cloneDeep(descriptionArr)
        _descriptionArr.push("")

        let _formularArr = _.cloneDeep(formularArr);
        _formularArr.push("")

        let _dataArr = _.cloneDeep(dataArr);
        _dataArr.map((e) => e.push(0))

        setDescriptionArr(_descriptionArr);
        setFormularArr(_formularArr);
        setDataArr(_dataArr);
    }

    const getOptions = (number, prefix) =>
        _.times(number, (index) => ({
            key: index,
            text: `${prefix}${index * 10 + 10}`,
            value: index,
        }))

    const onChangeNewInfor = (e) => {
        let _newVar = _.cloneDeep(newDataInfor);
        _newVar[e.target.name] = e.target.value;
        // console.log(_newVar)
        setNewDataInfor(_newVar);
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
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <Input value={newDataInfor['name']} placeholder='Name...' name='name' onChange={onChangeNewInfor} />
                    </Form.Field>
                    <Form.Field>
                        <label>Alias</label>
                        <Input disabled value={newDataInfor['alias']} placeholder='...' name='alias' onChange={onChangeNewInfor} />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Input value={newDataInfor['description']} placeholder='Description...' name='description' onChange={onChangeNewInfor} />
                    </Form.Field>
                    <Form.Field>
                        <label>Group Payroll</label>
                        <Dropdown
                            placeholder='Group Payroll'
                            // fluid
                            multiple
                            search
                            selection
                            options={groupBelongOptions}
                            onChange={(e, data) => setGroupBelong(data.value)}
                        />
                    </Form.Field>
                </Form>
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
                <Button color='green' >
                    <Icon name='checkmark' /> Check
                </Button>

                200 employees are applied !
            </Container>


            <Header as='h3' dividing>
                4. Additional data
            </Header>
            <Container>
                <Segment placeholder>
                    <Header icon>
                        <Icon name='pdf file outline' />
                        Additional data for each employee such as coefficient salary, ...
                    </Header>
                    <Button primary>Add Data</Button>
                </Segment>
            </Container>


            <Header as='h3' dividing>
                5. Formular table
            </Header>

            <Container textAlign='right' fluid>
                <Container fluid>
                    <Button positive floated="right" onClick={() => NewColumn()}>
                        <Icon name='add' />
                        New column
                    </Button>
                    Preview
                    <Dropdown
                        placeholder='10'
                        compact
                        selection
                        options={getOptions(3, ' ')}
                    />
                </Container>
            </Container>


            <Table celled>
                <Thead3
                    dataUser={dataUser}
                    formularArr={formularArr}
                    setFormularArr={setFormularArr}
                    dataArr={dataArr}
                    setDataArr={setDataArr}
                    descriptionArr={descriptionArr}
                    setDescriptionArr={setDescriptionArr}>
                </Thead3>
                <Tbody2
                    extractUserRow={ExtractUserRow()}
                    dataArr={dataArr}>
                </Tbody2>
            </Table>

            <Form>
                <Form.Field inline>
                    <label>Result Column</label>
                    <Dropdown
                        // placeholder='10'
                        compact
                        selection
                        options={resultColumnOptions}
                    />
                </Form.Field>
            </Form>

            <Container textAlign="center">
                <Button color='green' >
                    <Icon name='checkmark' /> Create new payroll
                </Button>
            </Container>
            {/* <Test></Test> */}
            {/* <Dashboard></Dashboard> */}

            {/* <CreateGroupRule></CreateGroupRule> */}


        </>
    );
};

