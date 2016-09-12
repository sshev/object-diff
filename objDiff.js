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
      if (_isPlainValue(val1) || _isPlainValue(val2) || (_.isEmpty(val1) && _.isEmpty(val2))) {
        result[path] = { obj1: _toStr(val1), obj2: _toStr(val2) };
      }
    }
  });

  return result;

  function _toStr(val) {
    let result = val;

    if (Array.isArray(val)) {
      result = JSON.stringify(val);
    } else
    if (val && val.toString) {
      result = val.toString()
    }

    return result;
  }

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

  // not {...} and not [...], or not {}
  function _isPlainValue(val) {
    // console.log(val, !_.isPlainObject(val) && !_.isArray(val));//xxx
    return !_.isPlainObject(val) && !_.isArray(val);
  }
}

module.exports = objDiff;