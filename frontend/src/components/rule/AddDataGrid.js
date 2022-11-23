import React from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function AddDataGrid(props) {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='pdf file outline' />
                Additional data for each employee such as coefficient salary, ...
            </Header>
            <Button primary>Add Data</Button>
        </Segment>
    );
}