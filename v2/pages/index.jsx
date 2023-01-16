import Head from 'next/head';
import home from '../content/home';

export default function HomePage() {
  const { data } = home;
  return (<>
    <Head>
      <title>GameVentory | The Board Game Network</title>
    </Head>

    {data.map((content, _i) => (
      <div key={_i} style={{ background: content.background }}>
        <div className="container">
          <content.title.type>{content.title.text}</content.title.type>
          <p>{content.description}</p>
        </div>
      </div>
    ))}
  </>);
}

/* todo: produce static html */