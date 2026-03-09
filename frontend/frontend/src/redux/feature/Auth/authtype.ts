export interface User {
  uid: string
  email: string | null
  name: string | null
  photo: string | null
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  status: "pending" | "succeed" | "rejected"
}