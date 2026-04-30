import SignupForm from './SignupForm'

export const metadata = {
  title: 'Sign Up | Mini Blog',
  description: 'Create a new account on Mini Blog',
}

export default function SignupPage() {
  return (
    <main>
      <SignupForm />
    </main>
  )
}
