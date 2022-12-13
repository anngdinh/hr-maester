import React, { Component, useState } from "react";

import "semantic-ui-css/semantic.min.css";

import {
  Button,
  Divider,
  Grid,
  Icon,
  Input,
  Image,
  Label,
  Menu,
  Table,
} from "semantic-ui-react";

import MyHeader from "./components/MyHeader";
import Department from "./department/Department";
import Employee from "./employee/Employee";
import NewPayroll from "./payroll/Payroll";

export default function HomePage() {
  const [page, setPage] = useState("department");

  const handleItemClick = (e, { name }) => setPage(name);

  return (
    <div className="App">
      <MyHeader></MyHeader>

      <Grid padded>
        <Grid.Column
          tablet={3}
          computer={3}
          only="tablet computer"
          id="sidebar"
        >
          <Menu vertical borderless fluid text id="sidebar">
            <Menu.Item>
              <Menu.Header>GENERAL</Menu.Header>
              <Menu.Menu>
                <Menu.Item>
                  <Icon name="dashboard" />
                  Dashboard
                </Menu.Item>
                <Menu.Item>
                  <Icon name="setting" />
                  Setting
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
              <Menu.Header>EMPLOYEE</Menu.Header>
              <Menu.Menu>
                <Menu.Item
                  name="employee"
                  active={page === "employee"}
                  onClick={handleItemClick}
                >
                  <Icon name="user" />
                  Employee
                </Menu.Item>
                <Menu.Item
                  name="department"
                  active={page === "department"}
                  onClick={handleItemClick}
                >
                  <Icon name="group" />
                  Department
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
              <Menu.Header>PAYROLL</Menu.Header>
              <Menu.Menu>
                <Menu.Item
                  name="payroll"
                  active={page === "payroll"}
                  onClick={handleItemClick}
                >
                  <Icon name="file outline" />
                  New Payroll
                </Menu.Item>
                <Menu.Item
                  name="bb"
                  active={page === "bb"}
                  onClick={handleItemClick}
                  as="a"
                >
                  <Icon name="list" />
                  All Payroll
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
          </Menu>
        </Grid.Column>

        <Grid.Column
          mobile={16}
          tablet={13}
          computer={13}
          floated="right"
          id="content"
        >
          <div style={{ display: page === "payroll" ? "block" : "none" }}>
            <NewPayroll></NewPayroll>
          </div>

          <div style={{ display: page === "department" ? "block" : "none" }}>
            <Department></Department>
          </div>

          <div style={{ display: page === "employee" ? "block" : "none" }}>
            <Employee />
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
}
