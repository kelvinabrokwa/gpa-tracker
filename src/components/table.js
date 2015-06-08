var React = require('react');

var Row = require('./row');

var actions = require('../actions/actions'),
    DataStore = require('../stores/data_store');

var guid = () => {
  var s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

var Table = React.createClass({
  getInitialState() {
    return { rows: [], targets: {} };
  },
  componentWillMount() {
    DataStore.addChangeListener(this._onChange);
    this.addCat();
  },
  _onChange(t) {
    this.setState({ targets: t });
  },
  addCat() {
    var newId = guid();
    actions.addCat({
      id: newId,
      name: null,
      weight: null,
      grades: null
    });
    var rows = this.state.rows;
    rows.push(newId);
    this.setState({ rows: rows });
  },
  removeCat(id) {
    this.setState({ rows: this.state.rows.filter(r => r !== id) });
    actions.removeCat(id);
  },
  render() {
    let targets = this.state.targets;
    return (
      <div>
        <div onClick={this.addCat} className='icon big add h-center mb2'>
          <div className='h-center mt0'>
            <i className="fa fa-plus h-center"></i>
          </div>
        </div>
        <table>
          <thead>
            <td></td>
            <td><span className='h-center'>Name</span></td>
            <td><span className='h-center'>Weight</span></td>
            <td><span className='h-center'>Grades</span></td>
            <td><span className='h-center'>Needed</span></td>
          </thead>
          <tbody>
            {this.state.rows.map(id => <Row
              key={id}
              id={id}
              remove={this.removeCat}  
              target={id in targets ? targets[id] : ''}
            />)}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = Table;
