import styled from "styled-components";
import React, { Component, useState } from "react";

import "semantic-ui-css/semantic.min.css";

import {
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Input,
    Image,
    Label,
    Menu,
    Table,
    Dropdown
} from "semantic-ui-react";

const trigger = (
    <span>
        <Image avatar src="https://img-cdn.2game.vn/pictures/2game/2019/10/26/2game-Naruto-Slugfest-logo-1.png" />
    </span>
)

const options = [
    { key: 'user', text: 'Account', icon: 'user' },
    { key: 'settings', text: 'Settings', icon: 'settings' },
    { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
]

export default function NavBar() {


    return (
        <Grid padded className="tablet computer only">
            <Menu secondary fluid >
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item as="a">Dashboard</Menu.Item>
                    <Menu.Item as="a">Settings</Menu.Item>
                    <Menu.Item as="a">Profile</Menu.Item>
                    <Menu.Item as="a">
                        <span>
                            <Icon name='bell' size="large"/>
                            <Label color='red' floating>
                                22
                            </Label>
                        </span>
                    </Menu.Item>
                    <Menu.Item>
                        {/* <AccountImg src="https://img-cdn.2game.vn/pictures/2game/2019/10/26/2game-Naruto-Slugfest-logo-1.png" /> */}
                        <Dropdown
                            trigger={trigger}
                            options={options}
                            pointing='top right'
                            icon={null}
                        />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Grid>

    );

};

const BigTitle = styled.div`
    /* text-align: center; */
    // background-color: red;
    color: #377DFF;
    font-family: 'Trebuchet MS', sans-serif;
`;

const AccountImg = styled.img`
    /* text-align: center; */
    // background-color: red;
    color: #377DFF;
`;