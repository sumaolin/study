"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var path_1 = require("path");
var sq = new sequelize_1["default"]('todo', null, null, {
    dialect: 'sqlite',
    storage: path_1.resolve(__dirname, '../storage/todo.db3')
});
exports["default"] = sq;
