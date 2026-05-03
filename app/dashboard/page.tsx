import { Navbar } from '@/components/Navbar'
import { DashboardWrapper } from '@/components/dashboard/DashboardWrapper'

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <DashboardWrapper />
        </div>
      </main>
    </>
  )
}
