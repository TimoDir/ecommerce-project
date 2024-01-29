const UsersRouter = require('express').Router();
const {
    getAllusers,
    getUserById,
    addUser,
    deleteUser,
    addSold,
    updateUser,
    userLogIn,
    userRefresh,
    setUserRole,
    userLogOut
} =  require('../controllers/UsersController');
const {verifyJWT} = require('../../middlewares/verifyJWT');

// users manipulation

UsersRouter.post('/addUser', addUser);
UsersRouter.post('/logIn', userLogIn);
UsersRouter.put('/logOut', userLogOut);
UsersRouter.get('/refresh', userRefresh);
UsersRouter.delete('/:id/deleteUser', verifyJWT, deleteUser);
UsersRouter.put('/:id/addSold', verifyJWT, addSold);
UsersRouter.get('/', verifyJWT, getAllusers);
UsersRouter.get('/:id', verifyJWT, getUserById);

module.exports = UsersRouter;
