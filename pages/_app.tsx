import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

function App({ Component, pageProps: { session, ...pageProps} }: AppProps<{ session: Session }>) {
  return (
	<SessionProvider session={session}>
		<div className="bg-zinc-800 text-white min-h-screen">
			<Component {...pageProps} />
		</div>
	</SessionProvider>
  );
}

export default App;