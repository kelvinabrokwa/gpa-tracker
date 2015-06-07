var xtend = require('xtend'),
    { EventEmitter } = require('events'),
    findIndex = require('101/find-index'),
    calculate = require('../calculator');

var Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/constants');

var data = {
  target: 100,
  cats: []
}

var CHANGE_EVENT = 'change';

var DataStore = xtend(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }, 
  dispatcherIndex: Dispatcher.register(payload => {
    var action = payload.action;
    switch(action.source) {
      case Constants.UPDATE_TARGET:
        data.target = action.grade;
        break;
      case Constants.ADD_CAT:
        data.cats.push(action.data);
        break;
      case Constants.UPDATE_CAT:
        var idx = findIndex(data.cats, (c) => c.id === action.data.id);
        data.cats[idx] = action.data;
        break;
      case Constants.REMOVE_CAT:
        data.cats = data.cats.filter(c => c.id !== action.id);
        break;
    }
    DataStore.emitChange(calculate(data));
    return true;
  })
});

module.exports = DataStore;
