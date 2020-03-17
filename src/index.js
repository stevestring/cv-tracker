import React from 'react'
import ReactDOM from 'react-dom'
import { Route,  BrowserRouter as Router } from 'react-router-dom'
import './index.css'
//import App from './App'
import State from './State'
//import County from './County'

const routing = (
  <Router>
        <div>
            <Route exact path="/" render={(props) => <State region={"Maryland"}/>} />
            <Route path="/index.html" render={(props) => <State region={"Maryland"}/>} />   
            <Route path="/state/:region" render={(props) => <State region={props.match.params.region}/>} />
            {/* <Route path="/county/:region" render={(props) => <County region={props.match.params.region}/>} /> */}
        </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
