import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect root URL "/" to the login page
  redirect('/login');
}
