import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'mobx-react-lite/batchingForReactDom'

import App from './App'
import { ErrorBoundary } from './components'
import { StoreProvider } from './stores'

ReactDOM.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)
