export default class Sets {
  static union(setA, setB) {
    var _union = new Set(setA);
    for (var elem of setB) {
      _union.add(elem);
    }
    return _union;
  }

  static intersection(setA, setB) {
    var _intersection = new Set();
    for (var elem of setB) {
      if (setA.has(elem)) {
        _intersection.add(elem);
      }
    }
    return _intersection;
  }

  static symmetricDifference(setA, setB) {
    var _difference = new Set(setA);
    for (var elem of setB) {
      if (_difference.has(elem)) {
        _difference.delete(elem);
      } else {
        _difference.add(elem);
      }
    }
    return _difference;
  }

  static difference(setA, setB) {
    var _difference = new Set(setA);
    for (var elem of setB) {
      _difference.delete(elem);
    }
    return _difference;
  }

  static isSuperset(set, subset) {
    for (var elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }
}
