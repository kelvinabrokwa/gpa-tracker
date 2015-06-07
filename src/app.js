var React = require('react');

var Target = require('./components/target'),
    Table =  require('./components/table');

var App = React.createClass({
  render() {
    return (
      <div>
        <div className='h-center mb4 big'>GPA Tracker</div>
        <Target />
        <Table />
      </div>
    );
  }
});

module.exports = React.render(<App />, document.getElementById('app'));
