var enumA;
(function (enumA) {
    enumA[enumA["a"] = 0] = "a";
})(enumA || (enumA = {}));
console.log(enumA.a);
var str = 'something';
var test;
(function (test) {
    test[test["test01"] = 0] = "test01";
})(test || (test = {}));
var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    FileAccess[FileAccess["Test"] = 0] = "Test";
    // O = str.length
})(FileAccess || (FileAccess = {}));
console.log(FileAccess.None);
var enumDemo2;
(function (enumDemo2) {
    enumDemo2[enumDemo2["c"] = 0] = "c";
    enumDemo2[enumDemo2["a"] = 4] = "a";
    enumDemo2[enumDemo2["b"] = 5] = "b";
})(enumDemo2 || (enumDemo2 = {}));
console.log(enumDemo2.c);
// console.log(FileAccess2)
