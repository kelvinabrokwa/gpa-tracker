var React = require('react');

var Row = require('./row');

var actions = require('../actions/actions'),
    DataStore = require('../stores/data_store');

/**
 * Remember to warn against and prohibit duplicate names
 * use `.toLowerCase()`
 */


var guid = () => {
  var s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

var Table = React.createClass({
  getInitialState() {
    return { rows: [] };
  },
  componentWillMount() {
    DataStore.addChangeListener(this._onChange);
    this.addCat();
  },
  _onChange(t) {
    console.log(t)
    //this.setState({})
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
    return (
      <div className=''>
        <div onClick={this.addCat} className='icon'>
          <i className="fa fa-plus"></i>
        </div>
        <table>
          <thead>
            <td></td>
            <td>Name</td>
            <td>Weight</td>
            <td>Grades</td>
            <td>Needed</td>
          </thead>
          <tbody>
            {this.state.rows.map(id => <Row
              key={id}
              id={id}
              remove={this.removeCat}  
            />)}
          </tbody>
        </table>
      </div>
    );
  } 
});

module.exports = Table;
