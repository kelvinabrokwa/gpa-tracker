var React = require('react'),
    xtend = require('xtend');

var actions = require('../actions/actions');

var Row = React.createClass({
  getInitialState() {
    return {
      name: null,
      weight: null,
      grades: ''
    };
  },
  onChange(prop, e) {
    var value;
    if (prop === 'grades')
      value = e.target.value.split(',').filter(g => g).map(parseFloat);
    else if (prop === 'weight')
      value = parseFloat(e.target.value) / 100;
    else
      value = e.target.value;
    this.setState({ [prop]: value }, () => {
      actions.updateCat(xtend(this.state, {id: this.props.id}));
    });
  },
  remove() {
    this.props.remove(this.props.id);
  },
  render() {
    return (
      <tr>
        <td className='icon' onClick={this.remove}>
          <i className="fa fa-times"></i>
        </td>
        <td>
          <input type='text' onChange={this.onChange.bind(this, 'name')}/>
        </td>
        <td>
          <input type='text' onChange={this.onChange.bind(this, 'weight')}/>
        </td>
        <td>
          <input type='text' onChange={this.onChange.bind(this, 'grades')}/>
        </td>
        <td></td>
      </tr>
    );
  }
});

module.exports = Row;
