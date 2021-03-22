
import React from 'react'
import { ColumnType } from '../App'
import { Modal, Button, Input } from '../Components'
import { ModalTitle } from './ModalsStyles';
import { CreateColumnItemWrapper, CreateColumnWrapper } from './ModalsStyles'
interface ModalProps {
    isOpen: boolean,
    close: () => void,
    handleAddColumn: (column: ColumnType) => void
}

const ModalCreateColumn: React.FC<ModalProps> = ({
    isOpen,
    close,
    handleAddColumn }) => {

    let newColumnName: string, newColumnDescription: string

    const handleSubmit = () => {
        if (!!newColumnName) {
            let newColumn: ColumnType = {
                id: `${new Date().getTime()}-${newColumnName}`,
                title: newColumnName, description: newColumnDescription
            };
            handleAddColumn(newColumn);
            close();
        }

    }
    return (
        <div>
            <Modal isOpen={isOpen} close={close}>
                <CreateColumnWrapper>
                    <ModalTitle>Enter column name</ModalTitle>
                    <div>
                        <Input
                            focused
                            onChange={e => { newColumnName = e.currentTarget.value }} />
                    </div>
                    <ModalTitle>Enter column description</ModalTitle>
                    <CreateColumnItemWrapper>
                        <Input
                            onChange={e => { newColumnDescription = e.currentTarget.value }} />
                    </CreateColumnItemWrapper>
                    <CreateColumnItemWrapper>
                        <Button
                            style="padding: 5px 20px"
                            onClick={handleSubmit}
                            text="ok" />
                    </CreateColumnItemWrapper>
                </CreateColumnWrapper>
            </Modal>
        </div>
    )
}

export default ModalCreateColumn;