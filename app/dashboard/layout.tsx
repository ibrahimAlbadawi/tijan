import HeaderDashboard from "./header-dashboard"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <HeaderDashboard />
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}
