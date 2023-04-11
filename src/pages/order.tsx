import React, { useMemo, useState } from 'react';
import {
  Button, Col, Form, Input, Row, Table
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Modal } from '@/components';
import { fetchHandler, postHandler } from '@/fetchHandler';
import { endpoints } from '@/endpoints';

import { baseurl as BASE_URL } from '../config';

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
  order_id?:any
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'No Meja',
    dataIndex: 'no_meja',
    sortDirections: ['descend'],
  },
  {
    title: 'Nama Customer',
    dataIndex: 'customer_name',
    defaultSortOrder: 'descend',
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
    title: 'Total Belanja',
    dataIndex: 'total_price',
  },
  {
    title: 'Tanggal',
    dataIndex: 'create_at',
  },
];
const Order = ( { orders }:any ) =>  {

  const [isModalOpen, setIsModalOpen] = useState( false );
  const [openModalDetail, setOpenModalDetail] = useState( false );

  const factoryOrders = useMemo( () => {
    if ( orders && orders.length ) {

      return orders.map( ( item:any, index:number ) => {
        return {
          ...item,
          key: index
        };
      } );
    }

    return [];
  }, [orders] );

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
      <Table columns={ columns } dataSource={ factoryOrders }
        onRow={ ( record, rowIndex ) => {
          return {
            onClick: async() => {
              const response = await postHandler( `${endpoints.invoice}/${record.order_id}`, 'GET' );
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

export async function getStaticProps() {
  const response = await fetchHandler( endpoints.orders );
  const orders = response.data;
  
  return {
    props: {
      baseurl: BASE_URL,
      orders
    }
  };
}
export default Order;