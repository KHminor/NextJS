import '@/styles/globals.css';
import { poor_story } from '@/ui/font';
import Layout from './layout';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const excludeRouters = ['/login'];

  if (excludeRouters.includes(router.pathname))
    return <Component classname={`${poor_story.className}`} {...pageProps} />;

  return (
    <Layout>
      <Component classname={`${poor_story.className}`} {...pageProps} />
    </Layout>
  );
}
