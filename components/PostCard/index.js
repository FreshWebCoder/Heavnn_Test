import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const PostCard = ({ data, onDelete, onEdit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [form] = Form.useForm();
  const { id, title, body } = data;

  const handleDelete = () => {
    setIsSubmitting(true);

    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setIsSubmitting(false);
        onDelete(id);
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: "Error",
          description: "Failed to delete post"
        });
        setIsSubmitting(false);
      });
  };

  const handleEdit = () => {
    setModalOpened(true);
  };

  const onCloseModal = () => {
    setModalOpened(false);
  };

  const onFinish = (values) => {
    setIsSubmitting(true);

    axios
      .put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          ...data,
          ...values,
        }
      )
      .then(({ data }) => {
        setIsSubmitting(false);
        setModalOpened(false);
        onEdit(id, data);
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: "Error",
          description: "Failed to edit post"
        });
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Card
        title={title}
        bordered={false}
        extra={(
          <Space>
            <Button
              type="ghost"
              icon={<EditOutlined />}
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={handleEdit}
            />
            <Button
              type="ghost"
              icon={<DeleteOutlined />}
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={handleDelete}
            />
          </Space>
        )}
      >
        {body}
      </Card>

      <Modal
        title="Edit Post"
        open={modalOpened}
        onOk={form.submit}
        onCancel={onCloseModal}
        okButtonProps={{ disabled: isSubmitting, loading: isSubmitting }}
      >
        <Form form={form} initialValues={data} onFinish={onFinish}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "This field is required." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="body"
            rules={[{ required: true, message: "This field is required." }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default PostCard;
