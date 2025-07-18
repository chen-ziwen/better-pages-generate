import { useParams } from 'react-router'

export default function DocsIndex() {
  const { lang } = useParams()

  return (
    <div>
      <h2>文档首页</h2>
      <p>当前语言: {lang || 'default'}</p>
      <p>这是一个可选参数路由的示例。</p>
      <ul>
        <li>
          <a href="/docs">默认文档</a>
        </li>
        <li>
          <a href="/docs/en">英文文档</a>
        </li>
        <li>
          <a href="/docs/zh">中文文档</a>
        </li>
      </ul>
    </div>
  )
}
