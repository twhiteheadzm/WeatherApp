import React from 'react';

export default class Error extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.display) {
      return (
        <div class='error'>
          {this.props.message.toString()}
        </div>
      );
    }else{return null;}
  }
}