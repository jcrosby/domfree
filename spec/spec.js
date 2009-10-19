node.mixin(require('../domfree.js'));
describe("domfree", function() {
  it("knows a function when it sees it", function() {
    assert(DF.isFunction(function(){}));
    assert(!DF.isFunction({}));
    assert(!DF.isFunction([]));
    assert(!DF.isFunction(true));
    assert(!DF.isFunction(1));
    assert(!DF.isFunction(new Date()));
  });
  it("knows an array when it sees it", function() {
    assert(DF.isArray([]));
    assert(DF.isArray([1,2]));
    assert(!DF.isArray({}));
    assert(!DF.isArray(true));
    assert(!DF.isArray(1));
    assert(!DF.isArray(new Date()));
  });
  it("clones objects", function() {
    var object = {
      foo: "bar",
      one: function() {
        return 1;
      },
      two: [1, {2: {3: 4}}, 2]
    };
    assertEqual(object, DF.clone(object));
  });
  it("adds an each iterator to Array", function() {
    var result = 0;
    var items = [1, 2, 3];
    items.each(function(i, item) {
      result = result + i + item;
    });
    assertEqual(9, result);
  });
});
