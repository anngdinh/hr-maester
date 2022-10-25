import _ from 'lodash';
import styled from "styled-components";
import { useState } from 'react';

import { Icon, Label, Menu, Table, Input, Form, Button } from 'semantic-ui-react';

export default function CreateGroupRule() {


    return <>
        <Form>
            <Form.Field>
                <label>Group Rule Name</label>
                <input placeholder='Name' />
            </Form.Field>
            <Form.Field>
                <label>Description</label>
                <input placeholder='Description' />
            </Form.Field>
            <Button primary type='submit'>Save</Button>
        </Form>
    </>;
}