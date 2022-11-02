import React, {useState} from 'react';
import MuiQueryBuilder from "mui-querybuilder";
import {__customOperators, __templateFilter} from "../../data/PayrollData";
const filters = [
    {
        label: "Employee",
        options: [
            {
                label: "Employee ID",
                value: "employee_id",
                type: "emp_in",
                options: [
                    {
                        label: "E1",
                        value: "E1",
                    },
                    {
                        label: "F1",
                        value: "f1",
                    },
                    {
                        label: "E2",
                        value: "E2",
                    },
                    {
                        label: "F2",
                        value: "F2",
                    },
                ],
            },
        ],
    },
    {
        label: "Department",
        options: [
            {
                label: "Department Name",
                value: "department_name",
                type: "emp_in",
                options: [
                    {
                        label: "Marketing",
                        value: "E1",
                    },
                ],
            },
        ],
    },
    {
        label: "Project",
        options: [
            {
                label: "Project Name",
                value: "project_name",
                type: "emp_in",
                options: [
                    {
                        label: "Marketing",
                        value: "E1",
                    },
                ],
            },
        ],
    },
];


const customOperators = __customOperators;

const MyQueryBuilder = () => {
    const [query, setQuery] = useState({
        combinator: "and",
        rules: [

        ],
    });
    return (
        <div>
            <MuiQueryBuilder
                debug
                filters={filters}
                query={query}
                customOperators={customOperators}
                onChange={(query, valid) => {
                    setQuery(query);
                    console.log("Valid?", valid);
                }}
            />
            {console.log(JSON.stringify(query))}
            {console.log(JSON.parse(JSON.stringify(query)))}
        </div>
    );
};

export default MyQueryBuilder;