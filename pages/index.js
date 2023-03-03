import { LoadingOutlined } from '@ant-design/icons';
import { notification, Input, Space, Pagination } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';

const pageSize = 25;

export default function Posts() {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const filteredPosts = posts.filter((el) => el.body.toLowerCase().includes(keyword.toLowerCase()));

  useEffect(() => {
    setIsLoading(true);

    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(({ data }) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: "Error",
          description: "Failed to fetch posts"
        });
        setIsLoading(false);
      });
  }, []);

  const onDelete = (id) => {
    setPosts((prevVal) => prevVal.filter((el) => el.id !== id));
  };

  const onEdit = (id, data) => {
    setPosts((prevVal) => prevVal.map((el) => el.id === id ? data : el));
  }

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <Layout>
      {isLoading ? (
        <LoadingOutlined style={{ fontSize: 48 }} />
      ) : (
        <Space direction="vertical" size={30}>
          <Input placeholder="Search by content" value={keyword} onChange={onChangeKeyword} />

          <Space direction="vertical">
            {filteredPosts
              .slice((page - 1) * 25, page * 25)
              .map((el) => (
                <PostCard
                  key={el.id}
                  data={el}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            }
          </Space>
          <Pagination
            current={page}
            total={filteredPosts.length}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={setPage}
          />
        </Space>
      )}
    </Layout>
  )
}
