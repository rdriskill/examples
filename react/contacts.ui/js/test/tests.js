import Utils from "../src/Utils";

QUnit.test("Utils.buildString()", function (assert) {
    var expectedResult = "This test has passed.",
        actualResult = Utils.buildString("This test has {0}.", ["passed"]);

    assert.equal(expectedResult, actualResult);
});
