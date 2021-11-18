import React from "react"
import { wrapper } from "../store"

const App = ({ Component, appProps}) => (
  <Component {...appProps} />
)

export default wrapper.withRedux(App);
