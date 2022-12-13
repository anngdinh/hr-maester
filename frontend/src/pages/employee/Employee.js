import _ from "lodash";
import React from "react";
import {
  Table,
  Checkbox,
  Button,
  Modal,
  Form,
  Input,
  Select,
  TextArea,
} from "semantic-ui-react";

const headers = [
  "employee_name",
  "work_phone",
  "work_email",
  "department",
  "job_position",
  "manager",
];

const tableData = [
  {
    employee_name: "Administration",
    work_phone: "0123456789",
    work_email: "test@gmail.com",
    department: "",
    job_position: "",
    manager: "John",
  },
  {
    employee_name: "Administration",
    work_phone: "0123456789",
    work_email: "test@gmail.com",
    department: "",
    job_position: "",
    manager: "John",
  },
  {
    employee_name: "Administration",
    work_phone: "0123456789",
    work_email: "test@gmail.com",
    department: "",
    job_position: "",
    manager: "John",
  },
  {
    employee_name: "Administration",
    work_phone: "0123456789",
    work_email: "test@gmail.com",
    department: "",
    job_position: "",
    manager: "John",
  },
];

const Managers = [
  { key: "1", text: "John", value: "John" },
  { key: "2", text: "Amber", value: "Amber" },
  { key: "3", text: "Ben", value: "Ben" },
];

const Departments = [
  { key: "1", text: "Administration", value: "Administration" },
  { key: "2", text: "Sales", value: "Sales" },
];

function exampleReducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    default:
      throw new Error();
  }
}

function Employee() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: tableData,
    direction: null,
  });
  const { column, data, direction } = state;

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Modal
        // onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button primary>Create</Button>}
      >
        <Modal.Header>Create a new department</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Field
                id="form-input-control-employee-name"
                control={Input}
                label="Employee Name"
                placeholder="Employee Name"
              />
              <Form.Field
                control={Select}
                options={Managers}
                label={{
                  children: "Manager",
                  htmlFor: "form-select-control-manager",
                }}
                placeholder="Manager"
                search
                searchInput={{ id: "form-select-control-manager" }}
              />
              <Form.Field
                control={Select}
                options={Departments}
                label={{
                  children: "Parent Department",
                  htmlFor: "form-select-control-parent-department",
                }}
                placeholder="Parent Department"
                search
                searchInput={{ id: "form-select-control-parent-department" }}
              />
              <Form.Field
                id="form-textarea-control-description"
                control={TextArea}
                label="Description"
                placeholder="Description"
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="gray" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Save"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            primary
          />
        </Modal.Actions>
      </Modal>

      <Button inverted primary>
        Delete
      </Button>
      <Button inverted primary>
        Export
      </Button>

      <Table sortable celled compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>
              <Checkbox />
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "employee_name" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "employee_name" })
              }
            >
              Employee Name
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "work_phone" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "work_phone" })
              }
            >
              Work Phone
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "work_email" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "work_email" })
              }
            >
              Work Email
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "department" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "department" })
              }
            >
              Department
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "job_position" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "job_position" })
              }
            >
              Job Position
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "manager" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "manager" })
              }
            >
              Manager
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.employee_name} onClick={(e) => console.log(e)}>
              <Table.Cell collapsing>
                <Checkbox />
              </Table.Cell>

              {headers.map((header) => (
                <Table.Cell>{item[header]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default Employee;
