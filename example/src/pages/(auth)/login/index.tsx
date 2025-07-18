export default function Login() {
  return (
    <div>
      <h3>登录</h3>
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label>用户名:</label>
          <input type="text" style={{ marginLeft: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>密码:</label>
          <input type="password" style={{ marginLeft: '0.5rem' }} />
        </div>
        <button type="submit">登录</button>
      </form>
      <p><a href="/register">还没有账号？注册</a></p>
    </div>
  )
}