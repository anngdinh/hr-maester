import React, { Component, useState } from "react";
import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom'
import styled from "styled-components";
import { Dropdown, Form, Button, Divider, Grid, Header, Icon, Input, Image, Label, Menu, Table } from 'semantic-ui-react';
import { DefineRoutes } from "../routes";


const SideBar = props => {
    const [activeItem, setActiveItem] = useState('dashboard')
    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
        navigate(name)
    }
    const navigate = useNavigate()
    return (
        <Sidebar>
            <Header as='h2'>
                <Image src='https://i.ibb.co/0GnsyBW/hr-maester2.png' size='massive' />
                <Header.Content>
                    <BigTitle>
                        HR MAESTER
                    </BigTitle>
                    <Header.Subheader>Manage your company</Header.Subheader>
                </Header.Content>
            </Header>

            <Menu
                vertical
                fluid
                id="sidebar">
                <Menu.Item>
                    <Menu.Header>GENERAL</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item
                            name={DefineRoutes.dashboard.path}
                            active={activeItem === DefineRoutes.dashboard.path}
                            onClick={handleItemClick}
                        >
                            <Icon name='file outline' />
                            Dashboard
                        </Menu.Item>
                        <Menu.Item
                            name={DefineRoutes.settings.path}
                            active={activeItem === DefineRoutes.settings.path}
                            onClick={handleItemClick}
                        >
                            <Icon name='file outline' />
                            Settings
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>PAYROLL</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item
                            name={DefineRoutes.payrule.path}
                            active={activeItem === DefineRoutes.payrule.path}
                            onClick={handleItemClick}
                        >
                            <Icon name='file outline' />
                            All payrule
                        </Menu.Item>
                        <Menu.Item
                            name={DefineRoutes.payroll.path}
                            active={activeItem === DefineRoutes.payroll.path}
                            onClick={handleItemClick}
                        >
                            <Icon name='file outline' />
                            All payroll
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        </Sidebar>
    );
};

const Sidebar = styled.div`
    /* background-color: #262b40; */
    /* height: 100%; */
`;
const BigTitle = styled.div`
    /* text-align: center; */
    // background-color: red;
    color: #377DFF;
    font-family: 'Trebuchet MS', sans-serif;
`;

export default SideBar;