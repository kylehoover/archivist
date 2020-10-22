import React, { Component, ErrorInfo } from 'react'
import { HasChildren } from '../../../types'

interface Props extends HasChildren {}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Error</h1>
    }

    return this.props.children
  }
}
