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
    Table
} from "semantic-ui-react";


export default function MyHeader() {


    return (
        <Grid padded className="tablet computer only">
            <Menu borderless inverted fluid fixed="top">
                <Menu.Item header as="a">
                    Project name
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Input placeholder="Search..." size="small" />
                    </Menu.Item>
                    <Menu.Item as="a">Dashboard</Menu.Item>
                    <Menu.Item as="a">Settings</Menu.Item>
                    <Menu.Item as="a">Profile</Menu.Item>
                    <Menu.Item as="a">Help</Menu.Item>
                </Menu.Menu>
            </Menu>
        </Grid>

    );

};
