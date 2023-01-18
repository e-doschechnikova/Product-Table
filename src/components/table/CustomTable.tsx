import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setDocumentsTC} from "../../redux/documents-reducer";
import CustomModal from "../../features/modal/CustomModal";


export type DataType = {
    id: string,
    key: React.Key;
    name: string;
    quantity: number,
    deliveryDate: string | number | Date,
    price: number,
    currency: string,
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Наименование',
        dataIndex: 'name',
        sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
        key: 'name'
    },
    {
        title: 'Количество',
        dataIndex: 'quantity',
        sorter: (a: DataType, b: DataType) => b.quantity - a.quantity,
        key: 'quantity'
    },
    {
        title: 'Дата доставки',
        dataIndex: 'localDate',
        sorter: (a: DataType, b: DataType) => {
            return new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime()
        },
        key: 'localDate'

    },
    {
        title: 'Цена',
        dataIndex: 'price',
        sorter: (a: DataType, b: DataType) => b.price - a.price,
        key: 'price'

    },
    {
        title: 'Валюта',
        dataIndex: 'currency',
        sorter: (a: DataType, b: DataType) => a.currency.localeCompare(b.currency),
        key: 'currency'

    },
];

const CustomTable: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string>>([]);
    const dispatch = useAppDispatch()
    const data: Array<DataType> = useAppSelector(state => state.documents.documents)

    useEffect(() => {
        dispatch(setDocumentsTC())
    }, [dispatch])

    const onSelectChange = (newSelectedRowKeys: Array<string>) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const dataSource: Array<DataType> = data.map((el: DataType) => ({
            ...el,
            key: el.id,
            localDate: new Date(el.deliveryDate).toLocaleDateString()
        }
    ))

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
                           <Table.Summary.Cell index={2}>{dataSource.reduce((acc: number, el: DataType) => {
                               return acc + el.quantity
                           }, 0)}</Table.Summary.Cell>
                           <Table.Summary.Cell index={3}></Table.Summary.Cell>
                           <Table.Summary.Cell index={4}></Table.Summary.Cell>
                           <Table.Summary.Cell index={5}></Table.Summary.Cell>
                       </Table.Summary.Row>
                   </Table.Summary>)}
               style={{marginLeft: 16, marginTop: 30, textAlign: 'center'}}/>
    </div>
};

export default CustomTable;