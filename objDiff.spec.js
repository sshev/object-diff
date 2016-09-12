'use strict';

const _ = require('lodash');
const objDiff = require('./objDiff');

const mockObject = {
  id: '57d2a554ffd400fa9603e2db',
  name: { first: 'Noble', last: 'Oneal' },
  company: 'GEEKOL',
  email: 'noble.oneal@geekol.org',
  tags: ['adipisicing', 'qui', 'incididunt', 'est', 'eiusmod'],
  friends: [
    { id: 0, name: 'White Finley' },
    { id: 1, name: 'Florence Jenkins' },
    { id: 2, name: 'Carole Huffman' }
  ]
};

describe('objDiff()', () => {
  let obj1;
  let obj2;

  beforeEach(() => {
    obj1 = _.cloneDeep(mockObject);
    obj2 = _.cloneDeep(mockObject);
  });

  describe('simple cases', () => {
    it('should compare equal objects', () => {
      expect(objDiff(obj1, obj2)).toEqual({});
    });

    it('should compare 1st level props', () => {
      obj1.company = 'aaa';
      expect(objDiff(obj1, obj2)).toEqual({ company: { obj1: obj1.company, obj2: obj2.company } });
    });

    it('should compare deep props', () => {
      obj1.name.first = 'aaa';
      expect(objDiff(obj1, obj2)).toEqual({ 'name.first': { obj1: obj1.name.first, obj2: obj2.name.first } });
    });

    it('should compare deep array props', () => {
      obj1.friends[1].name = 'John Smith';
      obj1.friends[2].name = 'Foo Bar';
      expect(objDiff(obj1, obj2)).toEqual({
        'friends[1].name': { obj1: obj1.friends[1].name, obj2: obj2.friends[1].name },
        'friends[2].name': { obj1: obj1.friends[2].name, obj2: obj2.friends[2].name }
      });
    });
  });

  describe('edge cases', () => {
    it('should handle comparison undefined vs not existing key', () => {
      obj1.prop = undefined;
      expect(objDiff(obj1, obj2)).toEqual({ prop: { obj1: undefined, obj2: 'KEY_DOES_NOT_EXIST' } });
    });

    it('should handle comparison undefined vs null', () => {
      obj1.prop = undefined;
      obj2.prop = null;
      expect(objDiff(obj1, obj2)).toEqual({ prop: { obj1: undefined, obj2: null } });
    });

    it('should handle comparison undefined vs 0', () => {
      obj1.prop = undefined;
      obj2.prop = 0;
      expect(objDiff(obj1, obj2)).toEqual({ prop: { obj1: undefined, obj2: 0 } });
    });

    it('should handle comparison with regexp', () => {
      obj1.prop = '';
      obj2.prop = /abc/;
      expect(objDiff(obj1, obj2)).toEqual({ prop: { obj1: '', obj2: '/abc/' } });
    });

    it('should handle comparison with function', () => {
      obj1.prop = undefined;
      obj2.prop = () => {};
      expect(objDiff(obj1, obj2)).toEqual({ prop: { obj1: undefined, obj2: '() => {}' } });
    });

    // TODO: enable when comparison [] vs {} fixed
    xit('should handle comparison [] vs {}', () => {
      obj1.prop = [];
      obj2.prop = {};
      expect(objDiff(obj1, obj2)).toEqual({ prop: { obj1: [], obj2: {} } });
    });
  });

});