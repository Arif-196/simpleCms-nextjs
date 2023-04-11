import React, {
  useCallback, useMemo, useState
} from 'react';
import {
  Col, Form, Input, Row, Select, Table, Upload, message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import type { ColumnsType } from 'antd/es/table';
import { Modal, Button } from '@/components';
import { baseurl as BASE_URL } from '../config';
import Image from 'next/image';
import { fetchHandler, postHandler } from '@/fetchHandler';
import { endpoints } from '@/endpoints';
import { useRouter } from 'next/router';

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

const columns = ( imgUrl:string ):ColumnsType<DataType> => [
  {
    title: 'ID',
    dataIndex: 'id',
    sortDirections: ['descend'],
  },
  {
    title: 'Nama Produk',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
  },
  {
    title: 'Harga',
    dataIndex: 'price',
    
  },
  {
    title: 'Qty',
    dataIndex: 'qty',
    
  },
  {
    title: 'Gambar',
    dataIndex: 'image',
    render: ( img: any ) => <Image alt='hello' width={ 30 } height={ 30 } src={ `${imgUrl}/public/product/${img}` } />
  },
  {
    title: 'Category',
    dataIndex: 'category',
    
  },
];

const Product = ( { baseurl, products }: any ) =>  {

  const [isModalOpen, setIsModalOpen] = useState( false );
  const [form] = Form.useForm();
  const router = useRouter();

  const factoryProduct = useMemo( () => {
    if ( products && products.length ) {

      return products.map( ( item:any, index:number ) => {
        return {
          ...item,
          key: index
        };
      } );
    }

    return [];

  }, [products] );

  const handleFininsh = useCallback( async() => {
    try {
      const fields = form.getFieldsValue();
      const formData = new FormData();
      Object.keys( fields ).forEach( key => {
        if ( key === 'image' ) {
          formData.append( key, fields[key].fileList[0]?.originFileObj );
        } else {
          formData.append( key, fields[key] );
        }
      } );
      formData.append( 'type', fields.categoryId === '1' ? 'MINUMAN' : 'MAKANAN' );
      formData.append( 'userId', '20' );

      await postHandler( endpoints.products, 'POST', formData, true );
      router.reload();
    } catch ( error ) {
      message.error( 'terjadi kesalahan', 1000 );
    }

  }, [router, form] );

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
      <Table columns={ columns( baseurl ) } dataSource={ factoryProduct } />
      <Modal
        isModalOpen={ isModalOpen }
        setIsModalOpen={ setIsModalOpen }
        footer={ [
          <Button
            key='back'
            label='Batal'/>, <Button
            label='Tambah'
            key='submit'
            type='primary'
            form='formSubmit'
            htmlType='submit'
          />
        ] }
      >
        <Form
          labelCol={ { span: 5 } }
          wrapperCol={ { span: 15 } }
          style={ { maxWidth: 600 } }
          initialValues={ { remember: true } }
          autoComplete='off'
          form={ form }
          onFinish={ handleFininsh }
          id='formSubmit'
        >
          <Form.Item
            label='Produk'
            name='namaProduk'
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
            name='hargaProduk'
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
            name='image'
            label='Gambar'
            rules={ [
              {
                required: true,
                message: 'Please upload Product Image!'
              }
            ] }
          >
            <Upload name='logo' action='/upload.do' listType='picture'>
              <Button icon={ <UploadOutlined /> }>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label='Category'
            name='categoryId'
            rules={ [
              {
                required: true,
                message: 'Please input Product Category!'
              }
            ] }>
            <Select>
              <Select.Option value='1'>MINUMAN</Select.Option>
              <Select.Option value='2'>MAKANAN</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetchHandler( endpoints.products );
  
  return {
    props: {
      baseurl: BASE_URL,
      products: response.data
    }
  };
}

export default Product;