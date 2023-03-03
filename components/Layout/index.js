import Link from 'next/link';
import { Layout as AntLayout, Menu } from 'antd';

const { Header, Content } = AntLayout;

const Layout = ({ children }) => {
  return (
    <AntLayout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          items={[{
            key: "posts",
            label: <Link href="/">Posts</Link>
          }, {
            key: "users",
            label: <Link href="/users">Users</Link>
          }]}
        />
      </Header>

      <Content>
        {children}
      </Content>
    </AntLayout>
  )
}

export default Layout;
