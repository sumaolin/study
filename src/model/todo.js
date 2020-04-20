"use strict";
exports.__esModule = true;
var db_1 = require("../db");
var sequelize_1 = require("sequelize");
var todoFolder_1 = require("./todoFolder");
var Todo = db_1["default"].define('todo', {
    id: {
        type: sequelize_1["default"].INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: sequelize_1["default"].TEXT
    },
    completed: {
        type: sequelize_1["default"].BOOLEAN
    },
    todo_folder_id: {
        type: sequelize_1["default"].INTEGER,
        reference: {
            modal: todoFolder_1.TodoFolder,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});
exports.Todo = Todo;
todoFolder_1.TodoFolder.hasMayn(Todo, { as: 'Todos', foreignKey: 'todo_folder_id' });
