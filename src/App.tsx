import React from 'react';
import AppBar from "./components/header/AppBar";
import {Col, Row} from "antd";
import CustomTable from "./components/table/CustomTable";

const App: React.FC = () => {
    return (
        <div>
            <AppBar/>
            <Row>
                <Col md={{span: '12', offset: '6'}}>
                    <CustomTable/>
                </Col>
            </Row>
        </div>
    );
}

export default App;
