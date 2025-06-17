import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/landing');
  return null; // redirect() throws an error, so this won't be reached
}
