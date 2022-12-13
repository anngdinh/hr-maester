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

const tableData = [
  {
    display_name: "Administration",
    manager: "John",
    employees: 10,
    parent_department: "",
  },
  {
    display_name: "Sales",
    manager: "Amber",
    employees: 20,
    parent_department: "",
  },
  {
    display_name: "Dev",
    manager: "Leslie",
    employees: 15,
    parent_department: "",
  },
  { display_name: "QA", manager: "Ben", employees: 10, parent_department: "" },
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

function Department() {
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
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button primary>Create</Button>}
      >
        <Modal.Header>Create a new department</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form>
              <Form.Field
                id="form-input-control-display-name"
                control={Input}
                label="Display Name"
                placeholder="Display Name"
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
              sorted={column === "display_name" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "display_name" })
              }
            >
              Display Name
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "manager" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "manager" })
              }
            >
              Manager
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "employees" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "employees" })
              }
            >
              Employees
            </Table.HeaderCell>

            <Table.HeaderCell
              sorted={column === "parent_department" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "parent_department" })
              }
            >
              Parent Department
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.display_name} onClick={(e) => console.log(e)}>
              <Table.Cell collapsing>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>{item.display_name}</Table.Cell>
              <Table.Cell>{item.manager}</Table.Cell>
              <Table.Cell>{item.employees}</Table.Cell>
              <Table.Cell>{item.parent_department}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default Department;
