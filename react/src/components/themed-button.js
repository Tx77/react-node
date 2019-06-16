import React, { Component } from 'react';
import {ThemeContext} from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background, width: 100, height: 30}}>
        click
      </button>
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;