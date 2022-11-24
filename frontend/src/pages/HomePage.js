import React, { Component, useState } from "react";
import { Route, Redirect, Routes } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { DefineRoutes } from "../routes";
import { Button, Divider, Grid, Icon, Input, Image, Label, Menu, Table, Container } from "semantic-ui-react";

import AllPayrule from "../components/rule/AllPayrule";
import NewPayrule from '../components/rule/NewPayrule'
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import AllPayroll from "../components/payroll/AllPayroll";
import NewPayroll from "../components/payroll/NewPayroll";
import PayrollDetail from "../components/payroll/PayrollDetail";


export default () => (
    <div className="App">
        <Grid padded='vertically'>
            <Grid.Column style={{ backgroundColor: "#262b40" }}
                tablet={3}
                computer={3}
                only="tablet computer"
            >
                <SideBar />
            </Grid.Column>


            <Grid.Column
                mobile={16}
                tablet={13}
                computer={13}
            // floated="right"

            >
                <NavBar></NavBar>
                <div id="content">
                    <Routes>
                        <Route path={DefineRoutes.payrule.path} element={<AllPayrule />} />
                        <Route path={DefineRoutes.newPayrule.path} element={<NewPayrule />} />
                        <Route path={DefineRoutes.payroll.path} element={<AllPayroll />} />
                        <Route path={DefineRoutes.newPayroll.path} element={<NewPayroll />} />
                        <Route path={DefineRoutes.payrollDetail.path} element={<PayrollDetail />} />
                    </Routes>
                </div>
            </Grid.Column>
        </Grid>
    </div>
);