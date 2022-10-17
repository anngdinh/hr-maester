import styled from "styled-components";

export default function Tbody({ extractUserRow, dataArr }) {
    // console.log({ extractUserRow })
    return <tbody>
        <tr>
            <td>Employee ID</td>
            <td>Name</td>
            {dataArr?.map((_, j) => {
                return (
                    <LabelColumnTd key={j}>
                        {String.fromCharCode(j + 65)}
                    </LabelColumnTd>
                )
            })}
        </tr>
        {dataArr[0]?.map((_, i) => {
            return (
                <tr key={i}>
                    <td>{extractUserRow[i].id}</td>
                    <td>{extractUserRow[i].name}</td>
                    {dataArr?.map((_, j) => {
                        return (
                            <td key={j}>
                                {dataArr[j][i]}
                            </td>
                        )
                    })}
                </tr>
            )
        })}
    </tbody>;
}

const LabelColumnTd = styled.td`
    text-align: center;
    // background-color: red;
`;