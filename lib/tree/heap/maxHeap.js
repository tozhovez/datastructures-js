/**
 * datastructures-js/heap/MaxHeap
 * @class
 * @extends Heap
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const Heap = require('./heap');

class MaxHeap extends Heap {

  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * @public
   * gets the max element in the heap
   * @returns {(string|number|null)}
   */
  max() {
    return this._root();
  }

  /**
   * @public
   * removes the max element from the heap
   * @returns {(string|number|null)}
   */
  extractMax() {
    return this._removeRoot();
  }

  /**
   * @public
   * removes an element at a given index
   * @param {number} index
   */
  remove(index) {
    this._updateKey(index, this.max() + 1);
    this.extractMax();
  }

  /**
   * @private
   * find the min child of a parent
   * @param {number} i
   */
  _maxChild(left, right) {
    if (left < this._size && right < this._size) {
      if (this._nodes[left] > this._nodes[right]) {
        return left;
      }
      else {
        return right;
      }
    }
    else if (right < this._size) {
      return right;
    }
    else if (left < this._size) {
      return left;
    }
  }

  /**
   * @protected
   * fix the max element of the heap starting from a child
   * @param {number} i
   */
  _bubble(i) {
    let index = i;
    let parent = this._parent(i);
    while (index > 0 && this._nodes[parent] < this._nodes[index]) {
      this._swap(index, parent);
      index = parent;
      parent = this._parent(index);
    }
  }
  
  /**
   * @private
   * fix the max element of the heap starting from a parent
   * @param {number} parent
   */
  _fixRoot(parent) {
    let maxChild = this._maxChild(this._left(parent), this._right(parent));
    if (maxChild !== null && this._nodes[parent] < this._nodes[maxChild]) {
      this._swap(parent, maxChild);
      this._fixRoot(maxChild);
    }
  }

}

module.exports = MaxHeap;