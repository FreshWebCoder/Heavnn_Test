import { LoadingOutlined } from '@ant-design/icons';
import { notification, Input, Space, Pagination } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';

const pageSize = 25;

export default function UserPosts() {
  const router = useRouter();
  const { id } = router.query;
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const filteredPosts = posts.filter((el) => el.body.toLowerCase().includes(keyword.toLowerCase()));

  console.log(id);

  useEffect(() => {
    if (id) {
      setIsLoading(true);

      axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
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
    }
  }, [id]);

  const onDelete = (id) => {
    setPosts((prevVal) => prevVal.filter((el) => el.id !== id));
  };

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
