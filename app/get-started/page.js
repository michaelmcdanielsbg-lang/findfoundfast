import { redirect } from 'next/navigation'

/**
 * Marketing "Get started" should land on sign-in / sign-up (Google, Apple, email).
 * Lead / sales form lives at /request-demo.
 */
export default function GetStartedPage() {
  redirect('/auth/login')
}
