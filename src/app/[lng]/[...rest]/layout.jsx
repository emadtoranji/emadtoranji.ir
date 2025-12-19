export const generateMetadata = (props) =>
  import('@utils/metadata').then((m) =>
    m.generateMetadata(props, 'not-found', false, false)
  );

export const dynamic = 'force-static';

export default function NotFoundLayout({ children }) {
  return children;
}
