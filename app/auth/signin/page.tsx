import { redirect } from 'next/navigation'

// No login required — redirect to home
export default function SignInPage() {
  redirect('/')
}
