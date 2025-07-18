export default function Register() {
  return (
    <div>
      <h3>注册</h3>
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label>用户名:</label>
          <input type="text" style={{ marginLeft: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>邮箱:</label>
          <input type="email" style={{ marginLeft: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>密码:</label>
          <input type="password" style={{ marginLeft: '0.5rem' }} />
        </div>
        <button type="submit">注册</button>
      </form>
      <p><a href="/login">已有账号？登录</a></p>
    </div>
  )
}