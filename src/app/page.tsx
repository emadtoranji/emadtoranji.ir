import type { Metadata } from 'next';
import Layout from '@app/[lng]/layout';
import Page from '@app/[lng]/page';

export const generateMetadata = (props: any): Promise<Metadata> =>
  import('@utils/metadata').then((m) => m.generateMetadata(props, 'home'));

export default async function RootPage() {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}
