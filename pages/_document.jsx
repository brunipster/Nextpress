import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <meta name="theme-color" content="#003c71"></meta>
        </Head>
        <body>
          <div id="root-float-elements"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
