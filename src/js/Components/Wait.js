import React from 'react';

export default class Wait extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.display) {
      return (
        <div class='wait'>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    }else{return null;}
  }
}