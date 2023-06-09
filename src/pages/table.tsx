import React, { useMemo, useState } from 'react';
import {
  Button, Col, Form, Input, Row, Table as AntdTable
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { baseurl as BASE_URL } from '../config';
import { fetchHandler } from '@/fetchHandler';
import { endpoints } from '@/endpoints';
import { Modal } from '@/components';
import Image from 'next/image';

interface DataType {
  key: React.Key;
  id: number;
  no_meja: number;
  image: string;
}

const columns : ColumnsType<DataType> = [
  
  {
    title: 'ID',
    dataIndex: 'id',
    sortDirections: ['descend'],
  },
  {
    title: 'No Meja',
    dataIndex: 'no_meja',
    defaultSortOrder: 'descend',
  },
  {
    title: 'Table QR Code',
    render: ( img: any ) => {
      return <Image alt='ok' width={ 30 } height={ 30 } src={ `http://localhost:8080/public/images/${img.no_meja}.png` } />;
    }
  },
];

const Table = ( { baseurl, tables }: any ) => {

  const [isModalOpen, setIsModalOpen] = useState( false );
  const factoryTable = useMemo( () => {
    if ( tables && tables.length ) {

      return tables.map( ( item:any, index:number ) => {
        return {
          ...item,
          key: index
        };
      } );
    }

    return [];

  }, [tables] );

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
      <AntdTable columns={ columns } dataSource={ factoryTable } />
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

export async function getStaticProps() {
  const response = await fetchHandler( endpoints.tables );
  
  return {
    props: {
      baseurl: BASE_URL,
      tables: response.data
    }
  };
}

export default Table;