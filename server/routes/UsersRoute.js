const UsersRouter = require('express').Router();
const {
    getAllusers,
    getUserById,
    addUser,
    userLogIn,
    deleteUser,
    addSold
} =  require('../controllers/UsersController');

// users manipulation
UsersRouter.get('/', getAllusers);
UsersRouter.get('/:id', getUserById);
UsersRouter.post('/addUser', addUser);
UsersRouter.post('/logIn', userLogIn);
UsersRouter.delete('/:id/deleteUser', deleteUser);
UsersRouter.put('/:id/addSold', addSold);

module.exports = UsersRouter;
