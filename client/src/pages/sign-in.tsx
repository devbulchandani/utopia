import { SignIn } from '@clerk/clerk-react'
import React from 'react'

export default function SignInPage() {
  return (
    <div className='pt-40 flex justify-center' >
      <SignIn path="/sign-in" />
    </div>
  )
}