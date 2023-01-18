import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'antd';
import {buttonModalStyleCancel, buttonModalStyleReject, styles, text} from "../../common/styles";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {cancelProductTC, setDocumentsTC} from "../../redux/documents-reducer";

const CustomModal: React.FC<CustomModalPropsType> = ({selectedRowKeys}) => {

    const [checkNames, setCheckNames] = useState([]);
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.documents.documents)

    useEffect(() => {
        setCheckNames(data.filter((el: any) => {
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
        <Button type="primary" onClick={showModalButton} style={styles} ghost>
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
            <p style={text}>{`Вы уверены что хотите аннулировать товар(ы): ${checkNames.map((el: { name: string }) => el.name)}`}</p>
        </Modal>
    </div>
}

type CustomModalPropsType = {
    selectedRowKeys: any
}

export default CustomModal;