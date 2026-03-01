import React, { createContext, useContext, useState } from 'react'

const EmployeeContext = createContext()

export function EmployeeProvider({ children }) {
  const [employee] = useState({ name: 'John Doe', role: 'Server' })

  return <EmployeeContext.Provider value={employee}>{children}</EmployeeContext.Provider>
}

export function useEmployee() {
  const context = useContext(EmployeeContext)
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider')
  }
  return context
}
