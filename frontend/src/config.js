// API Configuration
// In production, this will be your FastAPI backend URL (from CloudFront or API Gateway)
// In development, it uses the proxy from vite.config.js

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export { API_BASE_URL }
