const __dataUser = [
    { id: "E1", name: "An", age: 21, born: 2001 },
    { id: "E2", name: "Quan", age: 100, born: 1922 },
    { id: "E3", name: "Hoang", age: 40, born: 1982 },
    { id: "E4", name: "Long", age: 99, born: 1923 },
];

const __formularInit = ['=e.age', '=e.born', '=IF(t.A > 22, 100, 299)', '=t.A * t.C ']
const __descriptionInit = ['Age', 'Born year', 'If statement', 'Formular']


const __GroupPayroll = {
    'Total income': ['Basic salary', 'Bonus money', 'Bonus project'],
    'Free income tax': ['Lunch allowance'],
    'Tax deduction': ['BHYT', 'Dependent person', 'Charity'],
}

const __AllPayroll = [
    { ID: 'R1', name: 'Basic salary', description: '...', groupPayroll: ['Total income', 'Salary'], ruleDependency: 0, variable: 1, effect: 120},
    { ID: 'R2', name: 'Bonus project', description: '...', groupPayroll: ['Total income', 'Bonus'], ruleDependency: 0, variable: 1, effect: 120},
]

const __templateFilter = [
    {
        label: "Employee",
        options: [
            {
                label: "ID",
                value: "id",
                type: "text",
            },
            {
                label: "sex",
                value: "sex",
                type: "select",
                options: [
                    {
                        label: "Male",
                        value: "male",
                    },
                    {
                        label: "Female",
                        value: "female",
                    },
                ],
            },
            {
                label: "Word Count",
                value: "word_count",
                type: "integer",
            },
            {
                label: "Rating",
                value: "rating",
                type: "number",
            },
            {
                label: "Is Redirect",
                value: "is_redirect",
                type: "radio",
            },
            {
                label: "Published",
                value: "published",
                type: "switch",
            },
            {
                label: "Updated Date",
                value: "updated_date",
                type: "date",
            },
        ],
    },
    {
        label: "Department",
        options: [
            {
                label: "Department ID",
                value: "user_roles",
                type: "multiselect",
                options: [
                    {
                        label: "Expert",
                        value: "expert",
                    },
                    {
                        label: "Staff",
                        value: "staff",
                    },
                    {
                        label: "Site Contributor",
                        value: "site_contributor",
                    },
                    {
                        label: "System",
                        value: "system",
                    },
                ],
            },
        ],
    },
];

const __customOperators = {
    emp_in: {
        options: [
            {
                label: "in",
                value: "in",
            },
            {
                label: "not in",
                value: "not_in",
            },
        ],
        type: "multiselect",
    },
}
export { __dataUser, __formularInit, __descriptionInit, __GroupPayroll, __AllPayroll, __templateFilter, __customOperators };