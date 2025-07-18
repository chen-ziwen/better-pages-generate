import { Outlet } from 'react-router'

export default function BlogLayout() {
  return (
    <div>
      <h2>博客</h2>
      <nav style={{ marginBottom: '1rem' }}>
        <a href="/blog" style={{ marginRight: '1rem' }}>博客首页</a>
        <a href="/blog/tags" style={{ marginRight: '1rem' }}>标签</a>
      </nav>
      <Outlet />
    </div>
  )
}