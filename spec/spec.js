process.mixin(require('./../domfree'));
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
  it("extends empty objects", function() {
    assertEqual({foo:"bar"}, DF.extend({}, {foo:"bar"}));
  });
  it("extends object with existing properties", function() {
    assertEqual({foo:"bar",box:"car"},DF.extend({foo:"bar"},{box:"car"}));
  });
  it("adds an each iterator to Array", function() {
    var result = 0;
    var items = [1, 2, 3];
    items.each(function(i, item) {
      result = result + i + item;
    });
    assertEqual(9, result);
  });
  it("adds ownPropertyNames to Object", function() {
    var object = {foo: "bar", hello: "there"};
    assertEqual(['foo', 'hello'], object.ownPropertyNames().sort());
  });
  it("excludes a single property", function() {
    var object = {foo: "bar", hello: "there"};
    assert(!object.excluding('hello').hello);
  });
  it("excludes properties", function() {
    var object = {foo: "bar", hello: "there", thing: "baz"};
    var stripped = object.excluding(['foo', 'thing']);
    assert(!stripped.foo);
    assert(!stripped.thing);
  });
  it("produces a UUID", function() {
    var uuid = DF.uuid();
    assertEqual('-', uuid[8]);
    assertEqual('-', uuid[13]);
    assertEqual('-', uuid[18]);
    assertEqual('-', uuid[23]);
    assertEqual(36, uuid.length);
  });
});
