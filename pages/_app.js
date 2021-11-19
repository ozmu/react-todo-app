import React from "react"
import { wrapper } from "../store"
import '../styles/style.css';

const App = ({ Component, appProps}) => (
  <Component {...appProps} />
)

export default wrapper.withRedux(App);
