import { Outlet } from 'react-router'

export default function App() {
  return (
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h1>My App</h1>
        <nav>
          <a href="/" style={{ marginRight: '1rem' }}>
            首页
          </a>
          <a href="/about" style={{ marginRight: '1rem' }}>
            关于
          </a>
          <a href="/blog" style={{ marginRight: '1rem' }}>
            博客
          </a>
          <a href="/docs" style={{ marginRight: '1rem' }}>
            文档首页
          </a>
          <a href="/test" style={{ marginRight: '1rem' }}>
            测试
          </a>
          <a href="/login" style={{ marginRight: '1rem' }}>
            登录
          </a>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  )
}
