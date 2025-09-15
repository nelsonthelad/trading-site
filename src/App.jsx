import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../Layout.js'
import ScannerPage from '../Pages/Scanner.js'
import AnalyticsPage from '../Pages/Analytics.js'
import TopOpportunitiesPage from '../Pages/TopOpportunities.js'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ScannerPage />} />
        <Route path="/scanner" element={<ScannerPage />} />
        <Route path="/top-opportunities" element={<TopOpportunitiesPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
