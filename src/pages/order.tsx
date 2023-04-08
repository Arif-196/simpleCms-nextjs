import React, { useState } from 'react';
import {
  Button, Col, Form, Input, Row, Table
} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Modal } from '@/components';

interface DataType {
  key: React.Key;
  id: number;
  no_meja: number;
  customer_name: string;
  customer_contact: string;
  status: string;
  jumlah_order: number;
  total_price: number;
  create_at: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'No Meja',
    dataIndex: 'no_meja',
    
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Nama Customer',
    dataIndex: 'customer_name',
    defaultSortOrder: 'descend',
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Kontak Customer',
    dataIndex: 'customer_contact',
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Total Produk',
    dataIndex: 'jumlah_order'
  },
  {
    title: 'Total Belanja',
    dataIndex: 'total_price',
  },
  {
    title: 'Tanggal',
    dataIndex: 'create_at',
  },
];

const data = [
  {
    key: '1',
    id: 1,
    no_meja: 505,
    customer_name: 'John Brown',
    customer_contact: '0812-6785-3412',
    status: 'on_progress',
    jumlah_order: 5,
    total_price: 70000,
    create_at: '02-04-2023'
  },
  {
    key: '2',
    id: 2,
    no_meja: 505,
    customer_name: 'John Brown',
    customer_contact: '0812-6785-3412',
    status: 'on_progress',
    jumlah_order: 5,
    total_price: 70000,
    create_at: '02-04-2023'
  },
  {
    key: '3',
    id: 3,
    no_meja: 505,
    customer_name: 'John Brown',
    customer_contact: '0812-6785-3412',
    status: 'on_progress',
    jumlah_order: 5,
    total_price: 70000,
    create_at: '02-04-2023'
  },
  {
    key: '4',
    id: 4,
    no_meja: 505,
    customer_name: 'John Brown',
    customer_contact: '0812-6785-3412',
    status: 'on_progress',
    jumlah_order: 5,
    total_price: 70000,
    create_at: '02-04-2023'
  },
];

const onChange: TableProps<DataType>['onChange'] = ( pagination, filters, sorter, extra ) => {
  console.log( 'params', pagination, filters, sorter, extra );
};

const Order = () =>  {

  const [isModalOpen, setIsModalOpen] = useState( false );
  const [openModalDetail, setOpenModalDetail] = useState( false );

  return (
    <div>
      <Row justify='space-between'>
        <Col>
          <h1>Order</h1>
        </Col>
        <Col>
          <Button type='primary' onClick={ () => setIsModalOpen( true ) }>
          Print Invoice
          </Button>
        </Col>
      </Row>
      <Table columns={ columns } dataSource={ data } onChange={ onChange } onRow={ ( record, rowIndex ) => {
        return {
          onClick: event => {
            setOpenModalDetail( true );
          }, // click row
        };
      } }/>

      <Modal
        isModalOpen={ isModalOpen }
        setIsModalOpen={ setIsModalOpen }>
      
        <Form
          name='basic'
          labelCol={ { span: 5 } }
          wrapperCol={ { span: 15 } }
          style={ { maxWidth: 600 } }
          initialValues={ { remember: true } }
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Order Id'
            name='order id'
            rules={ [
              {
                required: true,
                message: 'Please input Product Name!'
              }
            ] }
          >
            <Input />
          </Form.Item>

          { /* <Form.Item
          label="Harga"
          name="harga"
          rules={[{ required: true, message: 'Please input Product Price!' }]}
        >
          <Input />
        </Form.Item> */ }
        </Form>
      </Modal>

      <Modal
        title='Detail Order'
        isModalOpen={ openModalDetail }
        setIsModalOpen={ setOpenModalDetail }
      // footer = {null}
      >
        <p>Product Id : 15</p>
        <p>Nama Product : Pecel Ayam</p>
        <p>Qty : 3</p>
        <p>Harga Produk : 15000</p>
        <hr />
        <p>Product Id : 17</p>
        <p>Nama Product : Pangsit</p>
        <p>Qty : 3</p>
        <p>Harga Produk : 15000</p>
        <hr />
        <p>Product Id : 18</p>
        <p>Nama Product : Mie Ayam</p>
        <p>Qty : 3</p>
        <p>Harga Produk : 15000</p>
     
      </Modal>
    </div>
  );
};

export default Order;