// API utility for calling FastAPI backend

import { API_BASE_URL } from '../config'

export async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }

  return response.json()
}

// Example usage:
// import { apiCall } from './utils/api'
// const data = await apiCall('/auth/login', { method: 'POST', body: JSON.stringify({...}) })
