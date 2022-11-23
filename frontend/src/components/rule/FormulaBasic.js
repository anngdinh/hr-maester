import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export default function FormulaBasic(props) {
    return (
        <Form>
            <Form.Field>
                <label>Fomula</label>
                <Input value='65436' placeholder='Name...' name='name' onChange={() => { }} />
            </Form.Field>
        </Form>
    );
}