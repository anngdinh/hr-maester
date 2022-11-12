import React, { useState } from 'react';
import MuiQueryBuilder from "mui-querybuilder";
import { __customOperators, __templateFilter } from "../../../data/PayrollData";
import { Button, Container, Icon } from 'semantic-ui-react';



const customOperators = __customOperators;

const MyQueryBuilder = ({ query, setQuery, queryFilter }) => {
    return (
        <Container>
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

            <Button color='green' >
                <Icon name='checkmark' /> Check
            </Button>
            200 employees are applied !
        </Container>
    );
};

export default MyQueryBuilder;