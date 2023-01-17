import React from 'react';
import {Layout} from 'antd';


const {Header} = Layout;

const headerStyle = {
    color: 'white',
    fontSize: '30px',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '300'
}

const AppBar = () => {
    return <Layout>
        <Header style={headerStyle}>ДОБРО ПОЖАЛОВАТЬ!</Header>
    </Layout>
};

export default AppBar;