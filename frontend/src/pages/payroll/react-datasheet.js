import styled from "styled-components";
import ReactDataSheet from 'react-datasheet';
import "react-datasheet/lib/react-datasheet.css";

import React from 'react'
import "./DataTableStyles.css";

import _ from 'lodash'



export default class ReactDataSheetDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            formularSheet: [
                [{ value: null }],
                [{ value: null }],
                [{ value: "A" }]
            ],

            dataSheet: [
                [{ value: 1 }],
                [{ value: 2 }]
            ],

        };
        this.emVar = "e";
        this.tableVar = "t";
        // from api
        this.dataUser = [
            ["E1", "Annn", 21, 2001],
            ["E2", "Quan", 22, 2000]
        ];
        this.dataUserField = ["id", "name", "age", "born"];
    }


    generateGrid() {
        let description = [
            { readOnly: true, value: null }, { readOnly: true, value: "Description" }
        ].concat(this.state.formularSheet[0]);
        let formular = [
            { readOnly: true, value: null }, { readOnly: true, value: "Formular" }
        ].concat(this.state.formularSheet[1]);
        let colIndex = [
            { readOnly: true, value: "ID" }, { readOnly: true, value: "Name" }
        ].concat(this.state.formularSheet[2]);

        let rowTitles = this.dataUser.map((element, index) => {
            let rowTitle = [{ readOnly: true, value: element[0] }, { readOnly: true, value: element[1] }];
            rowTitle = rowTitle.concat(this.state.dataSheet[index]);
            // console.log(rowTitle)
            return rowTitle;
        })


        return [description, formular, colIndex].concat(rowTitles);
    }

    addColumn = () => {
        const state = _.assign({}, this.state)

        state.formularSheet[0] = state.formularSheet[0].concat([{ value: null }])
        state.formularSheet[1] = state.formularSheet[1].concat([{ value: null }])
        state.formularSheet[2] = state.formularSheet[2].concat([{ value: "B" }])

        for (let index = 0; index < this.dataUser.length; index++) {
            state.dataSheet[index] = state.dataSheet[index].concat([{ value: null, readOnly: true }])
        }

        this.setState(state)
    }

    onCellsChanged = (changes) => {
        // let newDataSheet = this.state.dataSheet;
        // changes.forEach(({ cell, row, col, value }) => {
        //     console.log("New expression :", cell, row, col, value);
        //     cell.value = "modify";

        //     newDataSheet[row][col].value = value;

        //     this.setState({ dataSheet: newDataSheet });
        // });
        this.addColumn();


        const state = _.assign({}, this.state)
        changes.forEach(({ cell, row, col, value }) => {
            console.log(cell, row, col, value);
            this.cellUpdate(state, cell, row, col - 2, value)
        })
        this.setState(state)
    }
    cellUpdate(state, cell, row, col, expr) {
        state.formularSheet[row][col].value = expr;
        state.dataSheet[row][col].value = this.haha;
        return state
    }


    render() {
        return (
            <>
                <ReactDataSheet
                    data={this.generateGrid()}
                    valueRenderer={(cell) => cell.value}
                    onCellsChanged={this.onCellsChanged}

                // dataRenderer={(cell) => cell.expr}
                />


            </>
        )
    }
}