import { React, useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export default function SignUp() {

    const [data, setData] = useState({
        username: '',
        mail: "",
        password: "",
        rePassword: "",
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
                    <Image src='https://i.ibb.co/5FQ8nMM/hr-maester-logo.png' /> Create a new account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Your name' name="name" value={data.username} onChange={changeHandler} />
                        <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' name="mail" type='mail' value={data.mail} onChange={changeHandler} />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={data.password} onChange={changeHandler}
                        />

                        <Form.Input
                            fluid
                            icon='repeat'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='rePassword'
                            value={data.password} onChange={changeHandler}
                        />

                        <Button color='teal' fluid size='large' onClick={submitHandler}>
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Have already an account? <a href='/login'>Login</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
