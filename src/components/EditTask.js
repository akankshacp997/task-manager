import React, { useState, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUserContext } from "./Context";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Modal,
  Space,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";
uuidv4();

const EditTask = ({ task, id }) => {
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState("default");
  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useUserContext();
  const [value, setValue] = useState(task);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTitle("");
    setOpen(false);
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        const newState = data.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              title: values.title,
              description: values.description,
              priority: values.priority,
              date: values.date,
              status: values.status,
            };
          }
          return user;
        });
        setData(newState);

        handleOk();
      })
      .catch((error) => {
        form.resetFields();
      });
  };
  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          id="myForm"
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            ...value,
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "please input title" }]}
          >
            <Input type="text" placeholder="Add your task title here" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: false, message: "please input title" }]}
          >
            <Input type="text" placeholder="Describe your task" />
          </Form.Item>
          <Form.Item name="date" label="Due Date">
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: "please input title" }]}
          >
            <Select>
              <Select.Option value="high">High</Select.Option>
              <Select.Option value="low">Low</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "please input title" }]}
          >
            <Radio.Group>
              <Radio value={true}> Completed</Radio>
              <Radio value={false}> In Progress </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditTask;
