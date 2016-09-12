'use strict';

const _ = require('lodash');

function objDiff(obj1, obj2) {
  const result = {};
  const pathsAll = _.union(_objFlatPaths(obj1), _objFlatPaths(obj2));

  pathsAll.forEach(path => {
    const KEY_DOES_NOT_EXIST = 'KEY_DOES_NOT_EXIST';
    const val1 = _.has(obj1, path) ? _.get(obj1, path) : KEY_DOES_NOT_EXIST;
    const val2 = _.has(obj2, path) ? _.get(obj2, path) : KEY_DOES_NOT_EXIST;

    if (!_.isEqual(val1, val2) || (val1 === KEY_DOES_NOT_EXIST && val2 === KEY_DOES_NOT_EXIST)) {

      // TODO: fix [] and {} comparison
      if (_isPlainValue(val1) || _isPlainValue(val2)) {
        result[path] = {
          obj1: val1 && val1.toString ? val1.toString() : val1,
          obj2: val2 && val2.toString ? val2.toString() : val2
        };
      }
    }
  });

  return result;

  // recursively build paths for all object props
  // i.e. { foo: { bar: 'val' '}} --> ['foo', 'foo.bar']
  function _objFlatPaths(source, prefix, paths) {
    prefix = prefix || '';
    paths = paths || [];

    if (_.isPlainObject(source) || _.isArray(source)) {
      Object.keys(source).forEach(key => {
        let path = '';

        if (_.isArray(source)) {
          path = `${prefix}[${key}]`;
        } else {
          path = prefix ? prefix + '.' : '';
          path += key;
        }

        paths.push(path);
        _objFlatPaths(source[key], path, paths);
      });
    }

    return paths;
  }

  function _isPlainValue(val) {
    return !_.isPlainObject(val) && !_.isArray(val);
  }
}

module.exports = objDiff;