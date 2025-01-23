import '@/styles/globals.css';
import { poor_story } from '@/ui/font';

export default function App({ Component, pageProps }) {
  return <Component classname={`${poor_story.className}`} {...pageProps} />;
}
