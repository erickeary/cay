/*
 *
 * cayTest.js
 *
 */

HelloWorldTest = TestCase("HelloWorldTest");

HelloWorldTest.prototype.testCay = function() {
    var cay = new myapp.Cay();
    assertEquals("Hello World!", cay.greet("World"));

    jstestdriver.console.log("JsTestDriver", cay.greet("World"));
    console.log(cay.greet("Browser", "World"));
};


TestCaseDemo = TestCase("TestCaseDemo");

TestCaseDemo.prototype.setUp = function(){
    var cay = new myapp.Cay();
};

TestCaseDemo.prototype.testFirst = function(){
    assertTrue("Expecting settings.authToken to be true", settings.authToken);
};

TestCaseDemo.prototype.testSecond = function(){
    //the test
};

TestCaseDemo.prototype.tearDown = function(){
    //clean up - after each test
};
