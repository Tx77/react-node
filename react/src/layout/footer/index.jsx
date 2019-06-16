import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Footer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      menu : props.menu
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({menu: nextProps.menu});
  }

  renderMenu = (menu) => (
    menu.map(item => {
      return (
        <h1 key={item.id}>{item.id}</h1>
      );
    })
  )

  render () {
    return (
      <div>{this.renderMenu(this.state.menu)}</div>
    );
  }
}

export default Footer;