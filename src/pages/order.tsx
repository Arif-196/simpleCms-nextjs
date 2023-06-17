import React, {
  useMemo, useState, useCallback
} from 'react';
import {
  Button, Col, Form, Input, Row, Select, Table, message
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Modal } from '@/components';
import { fetchHandler, postHandler } from '@/fetchHandler';
import { endpoints } from '@/endpoints';
import { useRouter } from 'next/router';
import moment from 'moment';

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

const columns = ( handleUpdateStatus: any ) : ColumnsType<DataType> => [
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
    render: ( value => {
      return moment( value ).format( 'LLL' );
    } )
  },
  {
    title: 'Aksi',
    render: ( item: any ) => {
      if ( item.status === 'on_progress' ) {
        return <Select defaultValue={ 'Pilih Status' }
          onClick={ z => {
            z.stopPropagation();
          } }
          onSelect={ e => {
            handleUpdateStatus( item, e );
          } } placeholder={ 'Pilih Status' } options={ [
            {
              value: 'success',
              label: 'Success'
            }, {
              value: 'cancelled',
              label: 'Cancel'
            }
          ] } />;
      
      }
      return <p>{ item.status }</p>;
    }
  },
];

const Order = ( { orders }:any ) =>  {

  const [isModalOpen, setIsModalOpen] = useState( false );
  const [openModalDetail, setOpenModalDetail] = useState( false );
  const [detailOrder, setDetailORder] = useState( [] );
  const router = useRouter();

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
  
  const handleUpdateStatus = useCallback( async( item: any, status: string ) => {
    try {
      const response = await postHandler( `${endpoints.updateStatusOrder}/${item.id}`, 'PUT', { status } );

      router.reload();

    } catch ( error ) {
      message.error( 'terjadi kesalahan', 1000 );
    }

  }, [router] );
  
  const renderDetailOrder = useMemo( () => {
    if ( detailOrder && detailOrder.length ) {
      return detailOrder.map( ( item: any, index: number ) => {
        return (
          <React.Fragment key={ index }>
            <p>Product Id : { item.product_id }</p>
            <p>Nama Product : { item.name }</p>
            <p>Qty : { item.qty }</p>
            <p>Harga Produk : { item.price }</p>
            <hr />
          </React.Fragment>
        );
      } );
    }
  }, [detailOrder] );

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
      <Table columns={ columns( handleUpdateStatus ) } dataSource={ factoryOrders }
        onRow={ record => {
          return {
            onClick: async() => {
              const response = await postHandler( `${endpoints.invoice}/${record.id}`, 'GET' );
              setDetailORder( response.data );
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
        { renderDetailOrder }
     
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