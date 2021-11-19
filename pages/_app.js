import { React, useEffect } from "react"
import Head from 'next/head'


import { wrapper } from "../store"
import '../styles/css/dashlite.css'

const App = ({ Component, appProps}) => {

  useEffect(() => {
    document.querySelector("body").className = 'nk-body bg-lighter npc-default has-sidebar no-touch nk-nio-theme'
  }, [])

  return (
    <>
      <Head>
        <title>Awesome Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="nk-app-root">
        <div className="nk-main">
          <div className="nk-content">
            <Component {...appProps} />
          </div>
        </div>
      </div>
    </>
  )
}

export default wrapper.withRedux(App);
