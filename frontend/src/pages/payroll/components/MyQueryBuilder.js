import React, { useState } from 'react';
import MuiQueryBuilder from "mui-querybuilder";
import { __customOperators, __templateFilter } from "../../data/PayrollData";



const customOperators = __customOperators;

const MyQueryBuilder = ({ query, setQuery, queryFilter }) => {
    return (
        <div>
            <MuiQueryBuilder
                // debug
                filters={queryFilter}
                query={query}
                customOperators={customOperators}
                onChange={(query, valid) => {
                    setQuery(query);
                    // console.log("Valid?", valid);
                }}
            />
            {/* {console.log(JSON.stringify(query))}
            {console.log(JSON.parse(JSON.stringify(query)))} */}
        </div>
    );
};

export default MyQueryBuilder;