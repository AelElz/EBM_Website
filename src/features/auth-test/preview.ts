import { AUTH_ENDPOINTS, type AuthRequest } from './contract'

export interface PreviewReceipt {
  mode: 'preview'
  intent: 'login' | 'register'
  email: string
}

/**
 * Deliberately performs no HTTP request, storage write, account creation or authentication.
 * Replace this boundary with the Node.js HTTP adapter when that service exists.
 * Never log the request body or return the password in a result.
 */
export async function previewAuthRequest(request: AuthRequest): Promise<PreviewReceipt> {
  return { mode: 'preview', intent: request.path === AUTH_ENDPOINTS.register ? 'register' : 'login', email: request.body.email }
}
