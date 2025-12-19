export const generateMetadata = (props) =>
  import('@utils/metadata').then((m) =>
    m.generateMetadata(props, 'not-found', false, false)
  );

export default function NotFoundLayout({ children }) {
  return children;
}
