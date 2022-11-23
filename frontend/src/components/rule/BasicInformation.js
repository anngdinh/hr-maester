import React from 'react';
import { Dropdown, Form, Icon, Input, Label, Popup } from 'semantic-ui-react';
import AliasRender from '../../utils/AliasRender';

export default function BasicInformation({
    newDataInfor,
    setNewDataInfor,
    groupBelongOptions,
    setGroupBelong
}) {
    const onChangeNewInfor = (e) => {
        let _newVar = _.cloneDeep(newDataInfor);
        _newVar[e.target.name] = e.target.value;
        _newVar.alias = AliasRender(_newVar.name)
        // console.log(_newVar)
        setNewDataInfor(_newVar);
    }

    const handleCheckboxChange = (e, { value }) => {
        // console.log({ value })
        let _newVar = _.cloneDeep(newDataInfor);
        _newVar.isGroup = value === 0 ? false : true;
        setNewDataInfor(_newVar);
    }

    return (
        <Form>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Name</label>
                    <Input value={newDataInfor['name']} placeholder='Name...' name='name' onChange={onChangeNewInfor} />
                </Form.Field>
                <Form.Field>
                    <label>Alias</label>
                    <div style={{ display: newDataInfor.alias === "" ? "none" : "block" }}>
                        <Label color='teal' tag >
                            {newDataInfor.alias}
                        </Label>
                    </div>
                </Form.Field>
            </Form.Group>

            <Form.Group inline>
                <label>Type</label>
                <Form.Radio
                    label='Group'
                    value={1}
                    checked={newDataInfor.isGroup === true}
                    onChange={handleCheckboxChange}
                />
                <Form.Radio
                    label='Rule'
                    value={0}
                    checked={newDataInfor.isGroup === false}
                    onChange={handleCheckboxChange}
                />
            </Form.Group>

            <Form.Field>
                <label>Description</label>
                <Form.TextArea value={newDataInfor['description']} placeholder='Description...' name='description' onChange={onChangeNewInfor} />
            </Form.Field>

            <Form.Field>
                <label>Group</label>
                <Dropdown
                    placeholder='Group'
                    clearable
                    search
                    selection
                    options={groupBelongOptions}
                    onChange={(e, data) => setGroupBelong(data.value)}
                />
            </Form.Field>
        </Form>
    );
}
