import Navbar from '../components/Navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h2>Dashboard Layout</h2>
      <div style={{ border: '1px solid gray', padding: 10 }}>
        {children}
      </div>
    </div>
  )
}