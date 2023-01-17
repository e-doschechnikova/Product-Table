import React, {useEffect, useState} from 'react';
import styles from './CustomModal.module.css';
import {Button, Modal} from 'antd';
import {buttonModalStyleCancel, buttonModalStyleReject, buttonStyle} from "../../common/button-style";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {cancelProductTC, setDocumentsTC} from "../../redux/documents-reducer";


type CustomModalPropsType = {
    selectedRowKeys: any
}

const CustomModal = ({selectedRowKeys}: CustomModalPropsType) => {
    const [checkNames, setCheckNames] = useState([]);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.documents.documents)

    useEffect(() => {
        setCheckNames(data.filter((el) => {
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
                <Button key="submit" style={buttonModalStyleReject} onClick={cancelButton}>
                    Применить
                </Button>,
                <Button key="submit" type="primary" onClick={rejectButton} style={buttonModalStyleCancel}
                        danger>
                    Отклонить
                </Button>]}>
            <p className={styles.text}
               key={selectedRowKeys.name}>{`Вы уверены что хотите аннулировать товар(ы): ${checkNames.map(el => el.name)}`}</p>
        </Modal>
    </div>
}

export default CustomModal;