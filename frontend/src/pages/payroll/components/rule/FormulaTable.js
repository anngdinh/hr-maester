import React from 'react';
import { Button, Container, Dropdown, Form, Icon, Label, Table } from "semantic-ui-react";
import Thead3 from "./Thead3_HyperFomular";
import Tbody2 from "./Tbody2";
import _ from "lodash";

const resultColumnOptions = [
    { key: 'A', text: 'A', value: 'A', },
    { key: 'B', text: 'B', value: 'B', },
    { key: 'C', text: 'C', value: 'C', },
    { key: 'D', text: 'D', value: 'D', },
    { key: 'E', text: 'E', value: 'E', },
]

export default function FormulaTable({
    formularArr,
    setFormularArr,
    descriptionArr,
    setDescriptionArr,
    dataTableArr,
    setDataTableArr,
    dataUser
}) {

    const NewColumn = () => {
        let _descriptionArr = _.cloneDeep(descriptionArr)
        _descriptionArr.push("")

        let _formulaArr = _.cloneDeep(formularArr);
        _formulaArr.push("")

        let _dataTableArr = _.cloneDeep(dataTableArr);
        _dataTableArr.map((e) => e.push(0))

        setDescriptionArr(_descriptionArr);
        setFormularArr(_formulaArr);
        setDataTableArr(_dataTableArr);
    }

    const getOptions = (number, prefix) =>
        _.times(number, (index) => ({
            key: index,
            text: `${prefix}${index * 10 + 10}`,
            value: index,
        }))

    const ExtractUserRow = () => {
        const extractUserRow = dataUser.map(e => {
            return { id: e.id, name: e.name };
        });
        // console.log({ extractUserRow })
        return extractUserRow;
    }

    return (
        <>
            <Container textAlign='right' fluid>
                <Container fluid>
                    <Button as='div' labelPosition='left'>
                        <Label basic>
                            Preview
                        </Label>
                        <Dropdown
                            placeholder='10'
                            compact
                            selection
                            basic
                            options={getOptions(3, ' ')}
                        />
                    </Button>

                    <Button positive onClick={() => NewColumn()}>
                        <Icon name='add' />
                        New column
                    </Button>
                </Container>
            </Container>

            <Table celled>
                <Thead3
                    dataUser={dataUser}
                    formularArr={formularArr}
                    setFormularArr={setFormularArr}
                    dataTableArr={dataTableArr}
                    setDataTableArr={setDataTableArr}
                    descriptionArr={descriptionArr}
                    setDescriptionArr={setDescriptionArr}>
                </Thead3>
                <Tbody2
                    extractUserRow={ExtractUserRow()}
                    dataTableArr={dataTableArr}>
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
        </>
    );
}
