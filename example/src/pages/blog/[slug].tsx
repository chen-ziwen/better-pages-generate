import { useParams } from 'react-router'

export default function BlogPost() {
  const { slug } = useParams()
  
  return (
    <div>
      <h3>博客文章: {slug}</h3>
      <p>这是一个动态路由页面，显示 slug 参数: <strong>{slug}</strong></p>
      <p>你可以访问 /blog/任意文本 来测试这个功能。</p>
    </div>
  )
}