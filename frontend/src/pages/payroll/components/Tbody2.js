import styled from "styled-components";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

import { valueError } from "../utils/Constant";

export default function Tbody2({ extractUserRow, dataArr }) {
    // console.log({ extractUserRow })
    return <Table.Body>
        <Table.Row active>
            <Table.Cell collapsing>Employee ID</Table.Cell>
            <Table.Cell collapsing>Name</Table.Cell>
            {dataArr[0]?.map((_, j) => {
                return (
                    <LabelColumnTd key={j}>
                        {String.fromCharCode(j + 65)}
                    </LabelColumnTd>
                )
            })}
        </Table.Row>
        {dataArr?.map((_, i) => {
            return (
                <Table.Row key={i}>
                    <Table.Cell>{extractUserRow[i].id}</Table.Cell>
                    <Table.Cell>{extractUserRow[i].name}</Table.Cell>
                    {dataArr[0]?.map((_, j) => {
                        return (
                            <Table.Cell key={j} error={valueError.includes(dataArr[i][j])}>
                                {dataArr[i][j]}
                            </Table.Cell>
                        )
                    })}
                </Table.Row>
            )
        })}
    </Table.Body>;
}

const LabelColumnTd = styled.td`
    text-align: center;
    // background-color: red;
`;