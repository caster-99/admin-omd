import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Home from '@/pages/Principal/Home'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Users } from '@/pages/Principal/Users'
import { RolesAndPermissions } from './pages/Principal/RolesAndPermissions'
import { Coupons } from './pages/Principal/Coupons'
import { PoolClosures } from './pages/Principal/PoolClosures'
import { Workers } from '@/pages/Principal/Workers'
import { Transactions as PoolUSDTTransactions } from '@/pages/PoolUSDT/Transactions'
import { Investments as PoolUSDTInvestments } from '@/pages/PoolUSDT/Investments'
import { Investments as PoolOMDBInvestments } from '@/pages/PoolOMDB/Investments'
import { Transactions as PoolOMDBTransactions } from '@/pages/PoolOMDB/Transactions'
import { Investments as OMD3Investments } from '@/pages/OMD3/Investments'
import { Transactions as OMD3Transactions } from '@/pages/OMD3/Transactions'
import { PoolClosures as OMD3Closures } from '@/pages/OMD3/PoolClosures'
import { Workers as PoolUSDTWorkers } from '@/pages/PoolUSDT/Workers'
import { Workers as OMD3Workers } from '@/pages/OMD3/Workers'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Home />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/users" element={<Users />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/rolesAndPermissions" element={<RolesAndPermissions />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/coupons" element={<Coupons />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/poolOMDB/closures" element={<PoolClosures />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/poolOMDB/workers" element={<Workers />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/poolOMDB/investments" element={<PoolOMDBInvestments />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/poolOMDB/transactions" element={<PoolOMDBTransactions />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/poolUSDT/transactions" element={<PoolUSDTTransactions />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/poolUSDT/investments" element={<PoolUSDTInvestments />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/poolUSDT/workers" element={<PoolUSDTWorkers />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/omd3/investments" element={<OMD3Investments />} />
      </Route>

      <Route element={<ProtectedRoute />}>
         <Route path="/dashboard/omd3/transactions" element={<OMD3Transactions />} />
      </Route>

      <Route element={<ProtectedRoute />}>
         <Route path="/dashboard/omd3/closures" element={<OMD3Closures />} />
      </Route>

      <Route element={<ProtectedRoute />}>
         <Route path="/dashboard/omd3/workers" element={<OMD3Workers />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
