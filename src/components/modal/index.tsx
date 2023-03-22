import React from 'react';
import { Modal as AntdModal} from 'antd';

type ModalType =  {
  isModalOpen?: boolean
  setIsModalOpen?:any
  children?:React.ReactNode
  title?:string
}

const Modal = ({isModalOpen, setIsModalOpen, title, children = null}: ModalType) => {

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AntdModal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </AntdModal>
    </>
  );
};

export default Modal;