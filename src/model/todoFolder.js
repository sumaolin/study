"use strict";
exports.__esModule = true;
var db_1 = require("../db");
var sequelize_1 = require("sequelize");
var user_1 = require("./user");
var TodoFolder = db_1["default"].define('todo_folder', {
    id: {
        type: sequelize_1["default"].INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1["default"].TEXT
    },
    user_id: {
        type: sequelize_1["default"].INTEGER,
        reference: {
            Modal: user_1.User,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});
exports.TodoFolder = TodoFolder;
user_1.User.hasMany(TodoFolder, {
    constraints: false,
    as: 'Folders',
    foreignKey: 'user_id'
});
