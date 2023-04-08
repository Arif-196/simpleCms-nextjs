import React, { useState } from 'react';
import {
  Button, Col, Form, Input, Row, Table
} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Modal } from '@/components';
import Image from 'next/image';

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  price: number;
  discount: number;
  qty: number;
  image: string;
  category: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Nama Produk',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Harga',
    dataIndex: 'price',
    
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    
  },
  {
    title: 'Qty',
    dataIndex: 'qty',
    
  },
  {
    title: 'Gambar',
    dataIndex: 'image',
    render: ( img: any ) => <Image alt='hello' style={ { width: 30 } } src={ `http://localhost:8080/public/product/${img}` } />
  },
  {
    title: 'Category',
    dataIndex: 'category',
    
  },
];

const data = [
  {
    key: '1',
    id: 1,
    name: 'Pecel Lele',
    price: 15000,
    discount: 0,
    qty: 10,
    image: '2.jpeg',
    category: 'MAKANAN'
  },
  {
    key: '2',
    id: 2,
    name: 'Pecel Ayam',
    price: 15000,
    discount: 0,
    qty: 10,
    image: '2.jpeg',
    category: 'MAKANAN'
  },
  {
    key: '3',
    id: 3,
    name: 'Aqua Botol 500ml',
    price: 4000,
    discount: 0,
    qty: 10,
    image: '2.jpeg',
    category: 'MINUMAN'
  },
  {
    key: '4',
    id: 4,
    name: 'Es Teh Manis',
    price: 5000,
    discount: 0,
    qty: 10,
    image: '2.jpeg',
    category: 'MINUMAN'
  },
];

const onChange: TableProps<DataType>['onChange'] = ( pagination, filters, sorter, extra ) => {
  console.log( 'params', pagination, filters, sorter, extra );
};

const Product = () =>  {

  const [isModalOpen, setIsModalOpen] = useState( false );

  return (
    <div>
      <Row justify='space-between'>
        <Col>
          <h1>Product</h1>
        </Col>
        <Col>
          <Button type='primary' onClick={ () => setIsModalOpen( true ) }>
          Tambah Produk
          </Button>
        </Col>
      </Row>
      <Table columns={ columns } dataSource={ data } onChange={ onChange } />
      <Modal isModalOpen={ isModalOpen } setIsModalOpen={ setIsModalOpen }>
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
            label='Produk'
            name='nameProduk'
            rules={ [
              {
                required: true,
                message: 'Please input Product Name!'
              }
            ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Harga'
            name='harga'
            rules={ [
              {
                required: true,
                message: 'Please input Product Price!'
              }
            ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Discount'
            name='discount'
            rules={ [
              {
                required: false,
                message: 'Please input Product Price!'
              }
            ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Qty'
            name='qty'
            rules={ [
              {
                required: true,
                message: 'Please input Product Price!'
              }
            ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Gambar'
            name='image'
            rules={ [
              {
                required: true,
                message: 'Please input Product Image!'
              }
            ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Category'
            name='type'
            rules={ [
              {
                required: true,
                message: 'Please input Product Category!'
              }
            ] }
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;