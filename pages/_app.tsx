import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Head from 'next/head';

function App({ Component, pageProps: { session, ...pageProps} }: AppProps<{ session: Session }>) {
  return (
	<SessionProvider session={session}>
		<Head>
			<link rel="icon" href="/favicon.ico" sizes="any" />
    		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
			<title>todo-app</title>
		</Head>
		<div className="bg-zinc-800 text-white min-h-screen">
			<Component {...pageProps} />
		</div>
	</SessionProvider>
  );
}

export default App;