import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setDocumentsTC} from "../../redux/documents-reducer";
import Preloader from "../preloader/Preloader";
import CustomModal from "../../features/modal/CustomModal";
import {shallowEqual} from "react-redux";


interface DataType {
    key: React.Key;
    name: string;
    quantity: number,
    deliveryDate: string,
    price: number,
    currency: string,
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Наименование',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        key: 'name'
    },
    {
        title: 'Количество',
        dataIndex: 'quantity',
        sorter: (a, b) => b.quantity - a.quantity,
        key: 'quantity'
    },
    {
        title: 'Дата доставки',
        dataIndex: 'localDate',
        sorter: (a, b) => {
            let c = new Date(a.deliveryDate)
            // debugger
            return new Date(a.deliveryDate) - new Date(b.deliveryDate)
        },
        key: 'localDate'

    },
    {
        title: 'Цена',
        dataIndex: 'price',
        sorter: (a, b) => b.price - a.price,
        key: 'price'

    },
    {
        title: 'Валюта',
        dataIndex: 'currency',
        sorter: (a, b) => a.currency.localeCompare(b.currency),
        key: 'currency'

    },
];

const CustomTable: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.documents.documents)

    useEffect(() => {
        dispatch(setDocumentsTC())
    }, [dispatch])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const dataSource = data.map((el: any) => ({...el, key: el.id, localDate: new Date(el.deliveryDate).toLocaleDateString()}))

    return <div>
        <CustomModal selectedRowKeys={selectedRowKeys}/>
        <Table rowSelection={rowSelection}
               columns={columns}
               dataSource={dataSource}
               pagination={false}
               summary={() => (
                   <Table.Summary fixed>
                       <Table.Summary.Row>
                           <Table.Summary.Cell index={0}>Общее количество</Table.Summary.Cell>
                           <Table.Summary.Cell index={1}></Table.Summary.Cell>
                           <Table.Summary.Cell index={2}>{dataSource.reduce((acc, el) => {
                               return acc + el.quantity
                           }, 0)}</Table.Summary.Cell>
                           <Table.Summary.Cell index={3}></Table.Summary.Cell>
                           <Table.Summary.Cell index={4}></Table.Summary.Cell>
                           <Table.Summary.Cell index={5}></Table.Summary.Cell>
                       </Table.Summary.Row>
                   </Table.Summary>)}
               style={{marginLeft: 16, marginTop: 30}}/>
    </div>
};

export default CustomTable;