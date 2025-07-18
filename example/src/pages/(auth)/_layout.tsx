import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>用户认证</h2>
      <Outlet />
    </div>
  )
}