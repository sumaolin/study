"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var user_1 = require("../src/model/user");
var todoFolder_1 = require("../src/model/todoFolder");
var todo_3 = require("../src/model/todo");
var ava_1 = require("ava");
var password_hash_1 = require("password-hash");
function deleteData(data) {
    return __awaiter(this, void 0, void 0, function () {
        var compose;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (data.length == 0)
                        return [2 /*return*/];
                    compose = data.map(function (i) {
                        return i.destory();
                    });
                    return [4 /*yield*/, Promise.all(compose)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function destoryAll() {
    return __awaiter(this, void 0, void 0, function () {
        var todos, folders, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, todo_3.Todo.findAll()];
                case 1:
                    todos = _a.sent();
                    return [4 /*yield*/, todoFolder_1.TodoFolder.findAll()];
                case 2:
                    folders = _a.sent();
                    return [4 /*yield*/, user_1.User.findAll()];
                case 3:
                    users = _a.sent();
                    return [4 /*yield*/, Promise.all([deleteData(todos), deleteData(folders), deleteData(users)])];
                case 4:
                    _a.sent();
                    console.log('already delete all data');
                    return [2 /*return*/];
            }
        });
    });
}
function fackerData() {
    return __awaiter(this, void 0, void 0, function () {
        var user, todoFolder, todo_1, todo_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1["default"].createUser({
                        username: 'yogo',
                        email: 'su@km',
                        password: '123456'
                    })];
                case 1:
                    user = _a.sent();
                    todoFolder = todoFolder_1.TodoFolder.build({
                        user_id: user.id,
                        title: '生活'
                    });
                    return [4 /*yield*/, todoFolder.save()];
                case 2:
                    _a.sent();
                    todo_1 = todo_3.Todo.build({
                        text: '吃大餐！',
                        completed: true,
                        todo_folder_id: todoFolder.id
                    });
                    todo_2 = todo_3.Todo.build({
                        text: '睡大觉！',
                        completed: false,
                        todo_folder_id: todoFolder.id
                    });
                    return [4 /*yield*/, todo_1.save()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, todo_2.save()];
                case 4:
                    _a.sent();
                    console.log('facker data finished');
                    return [2 /*return*/];
            }
        });
    });
}
ava_1["default"]('test user create', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, folders, todos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, destoryAll()];
            case 1:
                _a.sent();
                return [4 /*yield*/, fackerData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, user_1.User.find({
                        where: {
                            email: 'su@km '
                        }
                    })];
            case 3:
                user = _a.sent();
                return [4 /*yield*/, user.getFolders()];
            case 4:
                folders = _a.sent();
                return [4 /*yield*/, folders[0].getTodos()];
            case 5:
                todos = _a.sent();
                t.is(folders[0].title, '生活');
                t.is(todos[0].completed, true);
                t.is(todos[0].text, '吃大餐！');
                t.is(password_hash_1["default"].verify('123456', user.password), true);
                return [2 /*return*/];
        }
    });
}); });
