import React from 'react';
import { Dropdown, Form, Input } from 'semantic-ui-react';

export default function BasicInformation({
    newDataInfor,
    setNewDataInfor,
    groupBelongOptions,
    setGroupBelong
}) {
    const onChangeNewInfor = (e) => {
        let _newVar = _.cloneDeep(newDataInfor);
        _newVar[e.target.name] = e.target.value;
        // console.log(_newVar)
        setNewDataInfor(_newVar);
    }

    return (
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
    );
}
