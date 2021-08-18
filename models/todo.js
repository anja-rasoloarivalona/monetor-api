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
            type: Sequelize.CHAR(9),
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
            references: "todoList",
            referencesKey: "id",
        },
        userId: {
            type: Sequelize.CHAR(32),
            references: "user",
            referencesKey: "id"
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
            type: Sequelize.CHAR(4),
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
            references: "todoBoards",
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
            type: Sequelize.CHAR(4),
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

const TodoLabels = sequelize.define(
    'todoLabels',
    {
        id: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true
        },
        boardId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            references: "todoBoards",
            referencesKey: "id"
        },
        title: {
            type: Sequelize.CHAR(255),
            allowNull: false
        },
        color: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        type: {
            type: Sequelize.CHAR(5),
            allowNull: false,
            defaultValue: "label"
        }
    },
    {
        timestamps: false,
        tableName: "todoLabels",
        freezeTableName: true,
    }
)

const TodoLabelsAssociation = sequelize.define(
    'todoLabelsAssociation',
    {
        todoId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true,
            references: "todo",
            referencesKey: "id"
        },
        labelId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true,
            references: "todoLabels",
            referencesKey: "id"
        }
    },
    {
        timestamps: false,
        tableName: "todolabelsassociation",
        freezeTableName: true,
    }
)

const UserTodoBoards = sequelize.define(
    'userTodoBoards',
    {
        boardId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true,
            references: "todoBoards",
            referencesKey: "id"
        },
        userId: {
            type: Sequelize.CHAR(32),
            allowNull: false,
            primaryKey: true,
            references: "user",
            referencesKey: "id"
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
    TodoLabels,
    TodoLabelsAssociation,
    UserTodoBoards
}