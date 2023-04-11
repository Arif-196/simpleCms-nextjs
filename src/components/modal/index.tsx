import React from 'react';
import { Modal as AntdModal } from 'antd';

type ModalType =  {
  isModalOpen?: boolean
  setIsModalOpen?:any
  children?:React.ReactNode
  title?:string
  footer?:React.ReactNode
}

const Modal = ( {
  isModalOpen, setIsModalOpen, title, children = null, footer
}: ModalType ) => {

  const handleOk = () => {
    setIsModalOpen( false );
  };

  const handleCancel = () => {
    setIsModalOpen( false );
  };

  return (
    <>
      <AntdModal title={ title } open={ isModalOpen } onOk={ handleOk } onCancel={ handleCancel } footer={ footer }>
        { children }
      </AntdModal>
    </>
  );
};

export default Modal;