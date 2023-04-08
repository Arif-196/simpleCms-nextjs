import React, { useState } from 'react';
import {
  Button, Col, Form, Input, Row, Table as AntdTable
} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Modal } from '@/components';
import Image from 'next/image';

interface DataType {
  key: React.Key;
  id: number;
  no_meja: number;
  image: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    sortDirections: ['descend'],
  },
  {
    title: 'No Meja',
    dataIndex: 'no_meja',
    defaultSortOrder: 'descend',
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Table QR Code',
    render: ( img: any ) => {
      console.log( img, 'IMG' );
      
      return <Image alt='ok' style={ {
        width: 30,
        height: 30
      } } src={ `http://localhost:8080/public/images/${img.image}` } />;
    }
  },
];

const data = [
  {
    key: '1',
    id: 9,
    no_meja: 500,
    image: '500.png',
  },
  {
    key: '2',
    id: 12,
    no_meja: 501,
    image: '501.png',
  },
  {
    key: '3',
    id: 13,
    no_meja: 505,
    image: '505.png',
  },
];

const onChange: TableProps<DataType>['onChange'] = ( pagination, filters, sorter, extra ) => {
  console.log( 'params', pagination, filters, sorter, extra );
};

const Table = () => {

  const [isModalOpen, setIsModalOpen] = useState( false );

  return (
    <div>
      <Row justify='space-between'>
        <Col>
          <h1>Table</h1>
        </Col>
        <Col>
          <Button type='primary' onClick={ () => setIsModalOpen( true ) }>
          Tambah Meja Baru
          </Button>
        </Col>
      </Row>
      <AntdTable columns={ columns } dataSource={ data } onChange={ onChange } />
      <Modal isModalOpen={ isModalOpen } setIsModalOpen={ setIsModalOpen }>
        <Form
          name='basic'
          labelCol={ { span: 5 } }
          wrapperCol={ { span: 16 } }
          style={ { maxWidth: 600 } }
          initialValues={ { remember: true } }
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='No Meja'
            name='no_meja'
            rules={ [
              {
                required: true,
                message: 'Please input your username!'
              }
            ] }
          >
            <Input />
          </Form.Item>

          { /* <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true,  message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item> */ }
        </Form>
      </Modal>
    </div>
  );
};

export default Table;