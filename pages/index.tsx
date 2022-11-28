import { NextPage, GetServerSideProps } from "next";
import Layout from "../components/Layout";
import AmpState from "../components/amp/AmpState";
import AmpScript from "../components/amp/AmpScript";
import {
  AmpIncludeAmpList,
  AmpIncludeAmpCarousel,
  AmpIncludeAmpFxFlyingCarpet,
  AmpIncludeAmpAd,
} from "../components/amp/AmpCustomElement";
import Head from "next/head";
import Script from "next/script";
export const config = { amp: true };
type HomeProps = {
  host: string;
};

const Home: NextPage<HomeProps> = (props) => (
  <>
    <Layout
      title="Welcome to AMP"
      description="Learn how to build an AMP First with Next.js."
    >
      <Head>
        <Script
          async
          custom-element="amp-fx-flying-carpet"
          src="https://cdn.ampproject.org/v0/amp-fx-flying-carpet-0.1.js"
        ></Script>
      </Head>

      <main>
        <h1 className="title">Welcome to AMP ⚡</h1>
        <p className="description">
          To get started, edit <code>pages/index.js</code> and save to reload.
        </p>
        <amp-img
          alt="A view of the sea"
          src="https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80"
          width="900"
          height="675"
          layout="responsive"
        />

        <AmpIncludeAmpFxFlyingCarpet />
        <AmpIncludeAmpAd />
        <div style={{ height: "100vh", background: "green" }} />
        <div style={{ height: 700, background: "gray" }}>
          <h1>ADS WINDOW</h1>
          <div className="amp-flying-carpet-text-border">Advertising</div>
          <amp-fx-flying-carpet height="300px">
            <amp-ad
              width="300"
              height="600"
              layout="fixed"
              type="doubleclick"
              data-slot="/35096353/amptesting/formats/flying_carpet"
            ></amp-ad>
          </amp-fx-flying-carpet>
          <div className="amp-flying-carpet-text-border">Advertising</div>

          <h1>HELLO</h1>
        </div>
        <div style={{ height: "100vh", background: "green" }} />
      </main>
    </Layout>
    <style jsx>{`
      code,
      pre {
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo,
          Courier, monospace;
        background: #f2f2f2;
        padding: 2px 3px;
        font-size: 13px;
      }
      main {
        margin: 0 auto;
        max-width: 800px;
      }
      main > * + * {
        margin: 4rem 0.5rem;
      }
      .title {
        text-align: center;
        padding-top: 4rem;
      }
      .hero {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        grid-gap: 1rem;
      }
      .hero > a {
        display: block;
        padding: 1rem;
        text-align: left;
        text-decoration: none;
        background-color: #005af0;
      }
      .hero h3 {
        margin: 0;
        color: #067df7;
        color: #fff;
      }
      .hero p {
        margin: 0;
        color: #fff;
      }
    `}</style>
  </>
);

// amp-script requires absolute URLs, so we create a property `host` which we can use to calculate the script URL.
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const getProtocol = (req: any) => {
    if (req.connection.encrypted) {
      return "https";
    }
    const forwardedProto = req.headers["x-forwarded-proto"];
    if (forwardedProto) {
      return forwardedProto.split(/\s*,\s*/)[0];
    }
    return "http";
  };

  // WARNING: This is a generally unsafe application unless you're deploying to a managed platform like Vercel.
  // Be sure your load balancer is configured to not allow spoofed host headers.
  return { props: { host: `${getProtocol(req)}://${req.headers.host}` } };
};

export default Home;
