import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import LoginForm from './LoginForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await auth();
  const { callbackUrl, expired } = await searchParams;

  const callbackUrlString = Array.isArray(callbackUrl)
    ? callbackUrl[0]
    : callbackUrl;

  if (session) {
      return redirect(callbackUrlString || '/');
  }
  
  return <LoginForm callbackUrl={callbackUrlString} sessionExpired={expired === "true"} />;
}
