export default function BlogIndex() {
  return (
    <div>
      <h3>博客文章列表</h3>
      <ul>
        <li>
          <a href="/blog/first-post">第一篇文章</a>
        </li>
        <li>
          <a href="/blog/second-post">第二篇文章</a>
        </li>
      </ul>
    </div>
  )
}

export const Loader = () => {
  return new Response('loader')
}

export const Handle = {
  title: '标题',
}
