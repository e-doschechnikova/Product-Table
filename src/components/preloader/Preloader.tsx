import React from 'react';
import {Space, Spin} from 'antd';

const Preloader: React.FC = () => (
    <Space size="middle" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '50% auto'}}>
        <Spin size="large"/>
    </Space>
);

export default Preloader;