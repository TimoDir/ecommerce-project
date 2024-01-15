const UsersRouter = require('express').Router();
const {
    getAllusers,
    getUserById,
    addUser,
    deleteUser,
    addSold
} =  require('./UsersQuerie');

// users manipulation
UsersRouter.get('/', getAllusers);
UsersRouter.get('/:id', getUserById);
UsersRouter.post('/addUser', addUser);
UsersRouter.delete('/:id/deleteUser', deleteUser);
UsersRouter.put('/:id/addSold', addSold);

module.exports = UsersRouter;
