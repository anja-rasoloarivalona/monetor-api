import Sequelize from 'sequelize'
import sequelize from './sequelize.js'

const TodoChecklist = sequelize.define(
    'todoChecklist',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        todoId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true,
            references: "todo",
            referencesKey: "id",
        },
        title: {
            type: Sequelize.STRING(255),
        },
        description: {
            type: Sequelize.STRING(255),
        },
        dueDate: {
            type: Sequelize.DATE
        },
        startDate: {
            type: Sequelize.DATE
        },
        completedAt: {
            type: Sequelize.DATE
        },
        index: {
            type: Sequelize.NUMBER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(9),
            allowNull: false,
            defaultValue: "checkList"
        }
    },
    {
        timestamps: true,
        tableName: "todoChecklist",
        freezeTableName: true,
    }
)

const Todo = sequelize.define(
    'todo',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        todoListId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            references: "todoList",
            referencesKey: "id",
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING(255),
        },
        dueDate: {
            type: Sequelize.DATE
        },
        startDate: {
            type: Sequelize.DATE
        },
        completedAt: {
            type: Sequelize.DATE
        },
        index: {
            type: Sequelize.NUMBER,
            allowNull: false
        },
        labels: {
            type: Sequelize.STRING(255)
        },
        type: {
            type: Sequelize.STRING(4),
            allowNull: false,
            defaultValue: "todo"
        }
    },
    {
        timestamps: true,
        tableName: "todo",
        freezeTableName: true,
    }
)

const TodoList = sequelize.define(
    'todoList',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        boardId: {
            type: Sequelize.CHAR(32),
            references: "user",
            referencesKey: "id",
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        index: {
            type: Sequelize.NUMBER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(4),
            allowNull: false,
            defaultValue: "list"
        }
    },
    {
        timestamps: true,
        tableName: "todolist",
        freezeTableName: true,
    }
)

const TodoBoards = sequelize.define(
    'todoBoards',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
    },
    {
        timestamps: true,
        tableName: "todoBoards",
        freezeTableName: true,
    }
)

const UserTodoBoards = sequelize.define(
    'userTodoBoards',
    {
        boardId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        rule: {
            type: Sequelize.INTEGER
        },
        backgroundImage: {
            type: Sequelize.CHAR(2550),
        }
    },
    {
        timestamps: true,
        tableName: "userTodoBoards",
        freezeTableName: true,
    }
)

export {
    TodoChecklist,
    Todo,
    TodoList,
    TodoBoards,
    UserTodoBoards
}