import React, {useEffect, useState} from 'react';
import styles from './CustomModal.module.css';
import {Button, Modal} from 'antd';
import {buttonModalStyleCancel, buttonModalStyleReject, buttonStyle} from "../../common/button-style";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {cancelProductTC, setDocumentsTC} from "../../redux/documents-reducer";
import {DataType} from "../../components/table/CustomTable";

type CustomModalPropsType = {
    selectedRowKeys: Array<string>
}

const CustomModal: React.FC<CustomModalPropsType> = ({selectedRowKeys}) => {

    const [checkNames, setCheckNames] = useState([]);
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch()
    const data: Array = useAppSelector(state => state.documents.documents)

    useEffect(() => {
        setCheckNames(data.filter((el: ) => {
            return selectedRowKeys.includes(el.id)
        }))
    }, [data, selectedRowKeys])

    const showModalButton = () => {
        setOpen(true);
    };

    const cancelButton = () => {
        dispatch(cancelProductTC(selectedRowKeys))
        dispatch(setDocumentsTC())
        setOpen(false);
    }

    const rejectButton = () => {
        setOpen(false);
    };

    return <div>
        <Button type="primary" onClick={showModalButton} style={buttonStyle} ghost>
            Аннулировать
        </Button>
        <Modal
            open={open}
            onCancel={cancelButton}
            onOk={rejectButton}
            footer={[
                <Button style={buttonModalStyleReject} onClick={cancelButton}>
                    Применить
                </Button>,
                <Button type="primary" onClick={rejectButton} style={buttonModalStyleCancel}
                        danger>
                    Отклонить
                </Button>]}>
            <p className={styles.text}>{`Вы уверены что хотите аннулировать товар(ы): ${checkNames.map((el: { name: string }) => el.name)}`}</p>
        </Modal>
    </div>
}

export default CustomModal;