const UsersRouter = require('express').Router();
const {
    getAllusers,
    getUserById,
    addUser,
    deleteUser,
    addSold,
    updateUser,
} =  require('../controllers/UsersController');
const {
    userLogIn,
    userRefresh,
    userLogOut,
    addRole,
    setRole,
    removeRole
} = require('../controllers/logsRolesController');
const {verifyJWT} = require('../../middlewares/verifyJWT');
const {verifyRoles} = require('../../middlewares/verifyRoles');

// logs routes
UsersRouter.post('/logIn', userLogIn);
UsersRouter.put('/logOut', userLogOut);
UsersRouter.get('/refresh', userRefresh);
// Users routes
const adminStaff = ["Admin", "Staff"];
const admin = ["Admin"];
UsersRouter.route('')
    .get(verifyJWT, verifyRoles(adminStaff), getAllusers)
    .post(addUser, addRole);
UsersRouter.route('/:id')
    .get(verifyJWT, verifyRoles(adminStaff), getUserById)
    .put(verifyJWT, verifyRoles(adminStaff), addSold)
    .delete(verifyJWT, verifyRoles(admin),deleteUser);
// Roles routes
UsersRouter.route('/:id/role')
    .post(verifyJWT, verifyRoles(admin), setRole)
    .delete(verifyJWT, verifyRoles(admin), removeRole);

module.exports = UsersRouter;
