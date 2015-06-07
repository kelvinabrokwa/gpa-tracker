var Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/constants');

var actions = {
  updateTarget(grade) {
    Dispatcher.handleViewAction({
      source: Constants.UPDATE_TARGET,
      grade: grade
    });
  },
  addCat(data) {
    Dispatcher.handleViewAction({
      source: Constants.ADD_CAT,
      data: data
    });
  },
  updateCat(data) {
    Dispatcher.handleViewAction({
      source: Constants.UPDATE_CAT,
      data: data
    });
  },
  removeCat(id) {
    Dispatcher.handleViewAction({
      source: Constants.REMOVE_CAT,
      id: id
    });
  }
};

module.exports = actions;
