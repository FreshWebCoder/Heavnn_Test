import { EyeOutlined } from '@ant-design/icons';
import { notification, Input, Space, Table } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Layout from '../../components/Layout';

export default function Users() {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const filteredUsers = users.filter((el) => el.name.toLowerCase().includes(keyword.toLowerCase()));

  useEffect(() => {
    setIsLoading(true);

    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(({ data }) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: "Error",
          description: "Failed to fetch users"
        });
        setIsLoading(false);
      });
  }, []);

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
    
  }

  return (
    <Layout>
      <Space direction="vertical" size={30} style={{ width: "100%" }}>
        <Input placeholder="Search by first name or last name" value={keyword} onChange={onChangeKeyword} />

        <Table
          loading={isLoading}
          columns={[{
            title: "Name",
            dataIndex: "name",
            key: "name"
          }, {
            title: "Username",
            dataIndex: "username",
            key: "username"
          }, {
            title: "Email",
            dataIndex: "email",
            key: "email"
          }, {
            title: "Address",
            dataIndex: "address",
            key: "address",
            render: (val) => `${val.suite}, ${val.street}, ${val.city} (${val.zipcode})`
          }, {
            title: "",
            dataIndex: "id",
            key: "id",
            render: (val) => <Link href={`/users/${val}`}><EyeOutlined /></Link>
          }]}
          dataSource={filteredUsers}
          pagination={{
            position: ["bottomCenter"]
          }}
        />
      </Space>
    </Layout>
  )
}
