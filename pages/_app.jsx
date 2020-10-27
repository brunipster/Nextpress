import React from "react";
import App from "next/app";
import Router from 'next/router'
import './styles/index.scss'

export default class MyApp extends App {
  componentDidMount() {
    Router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.handleRouteChange)
  }

  handleRouteChange = (url) => {
    pageView(url)
  }

  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}
