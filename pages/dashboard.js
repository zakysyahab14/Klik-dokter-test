import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Input, Modal, Form, Button, Popconfirm } from 'antd';
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import 'antd/dist/antd.css'
import { userLogout } from "../redux/actions/LoginActions";
import Cookies from "js-cookie";
import { getProduct, editProduct, deleteProduct, addProduct, searchProduct } from "../redux/actions/ProductActions";
import { InfoCircleOutlined } from '@ant-design/icons';
import { EDIT_PRODUCT } from "../redux/reducer/Types";

const Dashboard = () => {
    const [form] = Form.useForm();
    const [formAdd] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');

    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    const dispatch = useDispatch();
    const router = useRouter();
    const allData = useSelector((state) => state.Product);
    const { loading, error, product } = allData;
    const { Search } = Input;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalProductVisible, setModalProductVisible] = useState(false)

    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;
    const validateMessages = {
        required: '${label} is required!',
      };
    const modalProduct = () => {
        setModalProductVisible(true)
    }
    const showModal = (record) => {
        if (isLogin) {
            setIsModalVisible(true);
            form.setFieldsValue({
              sku: record.sku,
              product_name: record.product_name,
              qty: record.qty,
              price: record.price,
              unit: record.unit,
              status: record.status,
              ...record,
            });
            setEditingKey(record.key);
        }
        else {
            Modal.info({
                content: 'You need to Login'
            })
        }
      };
    const handleOk = () => {
        setIsModalVisible(false);
        setModalProductVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setModalProductVisible(false);
    };
    useEffect(() => {
        dispatch(getProduct());
      }, []);
    const edit = values => {
        if (isLogin) {
        dispatch(
            editProduct({
                sku: values.sku,
                product_name: values.product_name,
                qty: values.qty,
                price: values.price,
                unit: values.unit,
                status: values.status,
            })
        )} else {
            Modal.info({
                content: 'You need to Login'
            })
        }
    }
    const add = values => {
        dispatch(
            addProduct({
                sku: values.sku,
                product_name: values.product_name,
                qty: values.qty,
                price: values.price,
                unit: values.unit,
                status: values.status,
            })
        )
    }
    const handleDelete = values => {
        if (isLogin) {
        dispatch(
            deleteProduct({
                sku: values.sku
            })
        )} else {
            Modal.info({
                content: 'You need to Login'
            })
        }
    }
    const columns = [
    {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
    },
    {
        title: 'Product Name',
        dataIndex: 'product_name',
        key: 'product_name',
    },
    {
        title: 'Quantity',
        dataIndex: 'qty',
        key: 'qty',
    },
    {
        title: 'Unit',
        key: 'unit',
        dataIndex: 'unit',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
        
        <Space size="middle">
            <a className="text-primary" onClick={() => showModal(record)}>Edit</a>
            <Modal title="Edit Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        record
                    }}
                    onValuesChange={onRequiredTypeChange}
                    requiredMark={requiredMark}
                    onFinish={edit}
                    validateMessages={validateMessages}
                    >
                    <Form.Item name="sku" label="SKU" required tooltip="This is a required field">
                        <Input disabled defaultValue={record.sku} placeholder={record.sku} />
                    </Form.Item>
                    <Form.Item name="product_name" label="Product Name" rules={[{ required: true }]}>
                        <Input defaultValue={record.product_name} placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="qty" label="Quantity" rules={[{ required: true }]}>
                        <Input defaultValue={record.qty} placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                        <Input defaultValue={record.price} placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="unit" label="Unit" rules={[{ required: true }]}>
                        <Input defaultValue={record.unit} placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Input defaultValue={record.status} placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Popconfirm title="Are You Sure to Delete?" onConfirm={() => handleDelete(record)}>
                <a className="text-danger">Delete</a>
            </Popconfirm>
        </Space>
        ),
    },
    ];
    
    const data = product
    const logout = () => {
        // e.preventDefault;
        dispatch(userLogout());
        router.push("/");
        Cookies.remove("token");
        window.location.reload();
      };
    const onSearch = value => {
        if (value) {
            dispatch(
                searchProduct({
                    sku: value
                })
            )
        } else {
            dispatch(getProduct());
        }
        
    };
    const isLogin = Cookies.get('token')

    return (
        <div>
            <div className='row'>
                {!isLogin &&
                    <div className="text-end">
                        <a
                            onClick={() => router.push('/Register')}
                            >
                            Register
                        </a>
                        &nbsp;|&nbsp; 
                        <a
                            onClick={() => router.push('/Login')}
                            >
                            Login
                        </a>
                    </div>
                }
                {isLogin &&
                    <div className="text-end">
                        <a 
                            onClick={logout}>
                            <h5>Logout</h5>
                        </a>
                    </div>
                }
            </div>
            <div className="row">
                <div className="col-6">
                    <Search allowClear placeholder="input search text" onSearch={onSearch} enterButton />
                </div>
                <div className="col-6">
                    <a 
                        onClick={modalProduct}
                    >
                        <h4 className="text-primary text-end">Add Item</h4>
                    </a>
                    <Modal title="Add Product" visible={modalProductVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                        <Form
                        form={formAdd}
                        layout="vertical"
                        onValuesChange={onRequiredTypeChange}
                        requiredMark={requiredMark}
                        onFinish={add}
                        validateMessages={validateMessages}
                        >
                            <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
                                <Input placeholder="input SKU" />
                            </Form.Item>
                            <Form.Item name="product_name" label="Product Name" rules={[{ required: true }]}>
                                <Input placeholder="input product name" />
                            </Form.Item>
                            <Form.Item name="qty" label="Quantity" rules={[{ required: true }]}>
                                <Input placeholder="input quantity" />
                            </Form.Item>
                            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                                <Input placeholder="input price" />
                            </Form.Item>
                            <Form.Item name="unit" label="Unit" rules={[{ required: true }]}>
                                <Input placeholder="input unit" />
                            </Form.Item>
                            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                <Input placeholder="input status" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
                <Table rowKey="sku" columns={columns} dataSource={data} />
        </div>
    )
}

export default Dashboard;