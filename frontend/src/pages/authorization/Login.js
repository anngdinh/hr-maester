import { React, useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export default function Login() {

    const [data, setData] = useState({
        username: "",
        password: ""
    })

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitHandler = e => {
        e.preventDefault();
        console.log(data);
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='https://i.ibb.co/5FQ8nMM/hr-maester-logo.png' /> Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name="username" value={data.username} onChange={changeHandler} />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={data.password} onChange={changeHandler}
                        />

                        <Button color='teal' fluid size='large' onClick={submitHandler}>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='/sign-up'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
