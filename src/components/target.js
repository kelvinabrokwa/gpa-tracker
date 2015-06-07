var React = require('react');

var actions = require('../actions/actions'),
    DataStore = require('../stores/data_store');

var Target = React.createClass({
  getInitialState() {
    return { target: 100 };
  },
  onChange(e) {
    this.setState({ target: e.target.value }, () => {
      actions.updateTarget(this.state.target);
    })
  },
  render() {
    return (
      <div>
        <input
          type='range'
          max='100'
          min='0'
          value={this.state.target}
          onChange={this.onChange}
          className='h-center mb2'
        />
        <div className='h-center mb4'>Target grade: {this.state.target}%</div>
      </div>
    );
  }
});

module.exports = Target;
