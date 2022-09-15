import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
	<div className="bg-zinc-800 text-white min-h-screen">
		<Component {...pageProps} />
	</div>
  );
}

export default MyApp
