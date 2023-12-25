import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUserContext, useSearchContext } from "./Context";
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
import moment from "moment";
const { Search } = Input;

uuidv4();

const TaskForm = () => {
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState("default");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useUserContext();
  const [search, setSearch] = useSearchContext();
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
        console.log(values, "data");
        setData([
          ...data,
          {
            id: uuidv4(),
            title: values.title,
            description: values.description,
            date: values.date,
            priority: values.priority,
            status: values.status,
            edit: false,
          },
        ]);
        handleOk();
      })
      .catch((error) => {
        console.log(error, "error");
        form.resetFields();
      });
  };

  const handleSearch = (value) => {
    let res = value;

    const filtered = data.filter((task) => {
      let resLowercase = res.toLowerCase();
      let taskLowercase = task.title;
      {
        taskLowercase.toLowerCase() === resLowercase
          ? setSearch({ task })
          : setSearch("");
      }
    });
  };

  return (
    <>
      <Search
        placeholder="Search from your tasks here ..."
        allowClear
        onSearch={handleSearch}
        className="mb-8"
        style={{
          width: 550,
        }}
      />
      <Button
        onClick={showModal}
        type="primary"
        className="bg-purple-400 text-xl pt-0 text-white ml-2 disabled:pointer-events-none"
      >
        +
      </Button>
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
            rules={[{ required: true, message: "please spicify title" }]}
          >
            <Input type="text" placeholder="Add your task title here" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" placeholder="Describe your task" />
          </Form.Item>
          <Form.Item
            name="date"
            label="Due Date"
            rules={[{ required: true, message: "please spicify date" }]}
          >
            <DatePicker name="date" />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: "please spicify priority" }]}
          >
            <Select>
              <Select.Option value="high">High</Select.Option>
              <Select.Option value="low">Low</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "please specify status" }]}
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
export default TaskForm;
