import { fallbackLng } from '@i18n/settings';
import Link from 'next/link';

export default function Problem({
  content,
  code = 404,
  currentLang = fallbackLng,
}) {
  return (
    <>
      <div className='d-flex align-items-center vh-100 py-5'>
        <div className='container py-5'>
          <div className='row align-items-center'>
            <div className='col text-center'>
              <div className='lc-block mb-3'>
                <div editable='rich'>
                  <h1 className='display-1 fw-bold text-muted'>{code}</h1>
                </div>
              </div>
              <div className='lc-block mb-5'>
                <div editable='rich'>
                  <p className='rfs-11'>{content.title}</p>
                </div>
              </div>
              <div className='lc-block'>
                <Link
                  className='btn rounded-1 btn-secondary px-4'
                  href={`/${currentLang}`}
                >
                  {content.button}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
