import React, { useMemo, useState } from 'react';
import {
  Button, Col, Form, Input, Row, Select, Table, Tabs
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Modal } from '@/components';

const { TabPane } = Tabs;
const { Option } = Select;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          }, {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    sorter: ( a, b ) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: ( a, b ) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      }, {
        text: 'New York',
        value: 'New York',
      },
    ],
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const data2 = [
  {
    key: '1',
    name: 'Arif',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Riski',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Indra',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Dimas',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const fieldMessage =  'Tidak boleh kosong';

const User = () =>  {

  const [tabActive, setTabActive] = useState( 'guru' );

  const [isModalOpen, setIsModalOpen] = useState( false );

  const renderForm = useMemo( () => {
    if ( tabActive === 'guru' ) {
      return (
        <React.Fragment>
          <Form.Item
            label='Nip'
            name='nip'
            rules={ [
              {
                required: true,
                message: fieldMessage
              }
            ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Nama Lengkap'
            name='fullName'
            rules={ [
              {
                required: true,
                message: fieldMessage
              }
            ] }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Alamat'
            name='alamat'
            rules={ [
              {
                required: true,
                message: fieldMessage
              }
            ] }
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name='gender'
            label='Jenis Kelamin'
            rules={ [
              {
                required: true,
                message: 'Mohon Pilih Jenis Kelamin'
              }
            ] }
          >
            <Select placeholder='Pilih Jenis Kelamin'>
              <Option value='laki'>Laki-laki</Option>
              <Option value='perempuan'>Perempuan</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={ [
              {
                required: true,
                message: fieldMessage
              }
            ] }
          >
            <Input.Password />
          </Form.Item>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Form.Item
          label='Nis'
          name='nis'
          rules={ [
            {
              required: true,
              message: fieldMessage
            }
          ] }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Nama Lengkap'
          name='fullName'
          rules={ [
            {
              required: true,
              message: fieldMessage
            }
          ] }
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Alamat'
          name='alamat'
          rules={ [
            {
              required: true,
              message: fieldMessage
            }
          ] }
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name='gender'
          label='Jenis Kelamin'
          rules={ [
            {
              required: true,
              message: 'Mohon Pilih Jenis Kelamin'
            }
          ] }
        >
          <Select placeholder='Pilih Jenis Kelamin'>
            <Option value='laki'>Laki-laki</Option>
            <Option value='perempuan'>Perempuan</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={ [
            {
              required: true,
              message: fieldMessage
            }
          ] }
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='kode_kelas'
          label='Kode Kelas'
          rules={ [
            {
              required: true,
              message: 'Mohon Pilih Kode Kelas'
            }
          ] }
        >
          <Select placeholder='Pilih Kode Kelas'>
            <Option value='01TPLM001'>01TPLM001</Option>
            <Option value='01TPLM002'>01TPLM002</Option>
            <Option value='01TPLM003'>01TPLM003</Option>
            <Option value='01TPLM004'>01TPLM004</Option>
          </Select>
        </Form.Item>
      </React.Fragment>
    );
  }, [tabActive] );

  return (
    <div>
      <Row justify='end'>
        <Col>
          <Button type='primary' onClick={ () => setIsModalOpen( true ) }>
          Tambah { tabActive.substring( 0, 1 ).toUpperCase() + tabActive.substring( 1, tabActive.length ) }
          </Button>
        </Col>
      </Row>
      <Tabs defaultActiveKey={ tabActive } onChange={ e => setTabActive( e ) }>
        <TabPane tab='Guru' key='guru'>
          <Table columns={ columns } dataSource={ data } />
        </TabPane>
        <TabPane tab='Siswa' key='siswa'>
          <Table columns={ columns } dataSource={ data2 } />
        </TabPane>
      </Tabs>
      <Modal title={ `Tambah ${tabActive}` } isModalOpen={ isModalOpen } setIsModalOpen={ setIsModalOpen }>
        <Form
          name='basic'
          labelCol={ { span: 8 } }
          wrapperCol={ { span: 16 } }
          style={ { maxWidth: 600 } }
          initialValues={ { remember: true } }
          autoComplete='off'
        >
          { renderForm }
        </Form>
      </Modal>
    </div>
  );
};

export default User;