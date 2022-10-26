import styled from "styled-components";
import { useState, useEffect } from 'react';

import _ from 'lodash';

import { Icon, Label, Menu, Table, Button, Header, Step, Container, Form, Dropdown, Segment } from 'semantic-ui-react'
import Thead2 from "./components/Thead2";
import Tbody2 from "./components/Tbody2";
import Thead3 from "./components/Thead3_HyperFomular";
import Variable from "./components/Variable";
import RuleDependency from "./components/RuleDependency";
import CreateGroupRule from "./components/CreateGroupRule";
import VariableModal from "./components/VariableModal";
import RuleDependencyModal from "./components/RuleDependencyModal";
import { __dataUser, __descriptionInit, __formularInit } from "../data/PayrollData";

const resultColumnOptions = [
    { key: 'A', text: 'A', value: 'A', },
    { key: 'B', text: 'B', value: 'B', },
    { key: 'C', text: 'C', value: 'C', },
    { key: 'D', text: 'D', value: 'D', },
    { key: 'E', text: 'E', value: 'E', },
]

const payrollRule = ['Total income', 'Dependent person', 'Basic salary', 'BHYT', 'Bonus money', 'Tax'];
const stateOptions = payrollRule.map((value, index) => ({
    key: value,
    text: value,
    value: index,
}));

export default function NewPayroll() {
    const [dataUser, setDataUser] = useState([{}])
    const [formularArr, setFormularArr] = useState([])
    const [descriptionArr, setDescriptionArr] = useState([])
    const [dataArr, setDataArr] = useState([])

    useEffect(() => {
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
                        <label>Payroll</label>
                        <input placeholder='Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <input placeholder='Description' />
                    </Form.Field>
                    <Form.Field>
                        <label>Group Payroll</label>
                        <Dropdown
                            placeholder='Group Payroll'
                            // fluid
                            multiple
                            search
                            selection
                            options={stateOptions}
                        // onChange={(e, data) => setPayrollValue(data.value)}
                        />
                    </Form.Field>
                    {/* <Button primary type='submit'>Save</Button> */}
                </Form>
            </Container>

            <Header as='h3' dividing>
                2. Payroll dependency and Variable
            </Header>

            <Container>

                {/* <Button primary>Add rule Dependency</Button>
                <Button primary>Add variable</Button>
                <Variable></Variable>
                <RuleDependency></RuleDependency> */}
                <VariableModal></VariableModal>
                <RuleDependencyModal></RuleDependencyModal>
            </Container>

            <Header as='h3' dividing>
                3. Query builder
            </Header>



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

