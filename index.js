import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './src/store'
import AppRoutes from './src/routes'
import 'bootstrap/dist/css/bootstrap.css';
import './src/containers/App.css'
ReactDOM.render(
    <Provider store={store}> 
    <AppRoutes />
    </Provider>,
    document.getElementById('app')
)
