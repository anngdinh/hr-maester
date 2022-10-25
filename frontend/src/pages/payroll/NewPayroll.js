import styled from "styled-components";
import { useState } from 'react';

import _ from 'lodash';

import { Icon, Label, Menu, Table, Button, Header, Step, Container, Form, Dropdown } from 'semantic-ui-react'
import Thead2 from "./components/Thead2";
import Tbody2 from "./components/Tbody2";
import Thead3 from "./components/Thead3_HyperFomular";
import Variable from "./components/Variable";
import RuleDependency from "./components/RuleDependency";
import CreateGroupRule from "./components/CreateGroupRule";

export default function NewPayroll() {

    const dataUser = [
        { id: "E1", name: "Annn", age: 21, born: 2001 },
        { id: "E2", name: "Quan", age: 100, born: 1922 }
    ];
    const [formularArr, setFormularArr] = useState(['=e.age', '=e.born', '=IF(t.A > 22, 100, 299)', '=t.A * t.C '])
    const [descriptionArr, setDescriptionArr] = useState(['a', 'b', 'c', 'd'])

    const numUser = dataUser.length;
    const numFormular = 4;


    // const dataRender = new Array(numFormular).fill(0).map(() => new Array(numUser).fill(0));
    const [dataArr, setDataArr] = useState(new Array(numUser).fill(0).map(() => new Array(numFormular).fill(0)))


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


    return (
        <>
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
                        placeholder='Select Payroll'
                        // fluid
                        multiple
                        search
                        selection
                        // options={stateOptions}
                        // onChange={(e, data) => setPayrollValue(data.value)}
                    />
                </Form.Field>
                <Button primary type='submit'>Save</Button>
            </Form>

            {/* <Header as='h2'>
                <Icon name='settings' />
                <Header.Content>
                    Account Settings
                    <Header.Subheader>Manage your preferences</Header.Subheader>
                </Header.Content>
            </Header>
            <Container>
                <Step.Group>
                    <Step>
                        <Icon name='truck' />
                        <Step.Content>
                            <Step.Title>Query Builder</Step.Title>
                            <Step.Description>Create a query for applicable employees</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step active>
                        <Icon name='payment' />
                        <Step.Content>
                            <Step.Title>Calculation formula</Step.Title>
                            <Step.Description>Use the information of each employee to calculate</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='info' />
                        <Step.Content>
                            <Step.Title>Confirm Order</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
            </Container>

            <Button variant="primary" onClick={() => NewColumn()}>
                <Icon name='add' />
                New column
            </Button>
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
            </Table> */}

            {/* <Test></Test> */}
            {/* <Dashboard></Dashboard> */}
            {/* <Variable></Variable>
            <RuleDependency></RuleDependency> */}
            {/* <CreateGroupRule></CreateGroupRule> */}
        </>
    );
};

