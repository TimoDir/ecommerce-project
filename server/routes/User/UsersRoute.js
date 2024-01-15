const UsersRouter = require('express').Router();
const {
    getAllusers,
    getUserById,
    addUser,
    deleteUsers,
    addSold
} =  require('./UsersQuerie');

// users manipulation
UsersRouter.get('/', getAllusers);
UsersRouter.get('/:id', getUserById);
UsersRouter.post('/addUser', addUser);
UsersRouter.delete('/:id/deleteUsers', deleteUsers);
UsersRouter.put('/:id/addSold', addSold);

module.exports = UsersRouter;
