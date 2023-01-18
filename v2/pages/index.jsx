import classnames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import home from '../content/home';

import isEven from '../utils/isEven';

export default function HomePage() {
  const { data } = home;
  return (<>
    <Head>
      <title>GameVentory | The Board Game Network</title>
    </Head>

    <div style={{ marginTop: '-1rem' }}>
      {data.map((content, _i) => {
        return (
          <div 
            key={_i}
            className="py-5"
          >
            <div className={classnames(
              'container',
              'd-lg-flex',
              { 'flex-row-reverse': !isEven(_i) }
            )}>
              <div className={classnames(
                {'me-auto': isEven(_i) }
              )}>
                <content.title.type>{content.title.text}</content.title.type>
                <p>{content.description}</p>
              </div>
              <Image 
                src={content.image}
                className={classnames(
                  {'me-auto': !isEven(_i)}
                )}
                width="500"
                alt={content.alt}
              />
            </div>
          </div>
        )
      })}
    </div>
  </>);
}

/* todo: produce static html */