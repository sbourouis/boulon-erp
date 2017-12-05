'use strict';

module.exports = function(supplier) {
  supplier.validatesPresenceOf('name');
  supplier.validatesUniquenessOf('name', {message: 'name is not unique'});
};
