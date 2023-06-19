import express from 'express'
const router = express.Router();
import UserController from '../controllers/UserController';

router.post('/user/create' , UserController.createUser);
router.post('/user/login' , UserController.loginUser)

/* rotas de criação */
// router.post('/user/create/default', UserController.createStudent)
// router.post('/user/create/adm', UserController.createADM)
// router.post('/user/create/tech', UserController.createTech)

/* rotas de atualização */
// router.post('/user/update/info', UserController.updateInfo)
// router.post('/user/update/credentials', UserController.updateCredentials)
// router.post('/user/update/activate', UserController.activateAccount)

/* rotas de deleção */
// router.post('/user/delete', UserController.deleteUser)

/* rotas de leitura */
 router.get('/user/read/info/all', UserController.getAllUsersInfo)
// router.get('/user/read/info/one', UserController.getUserInfo)

/* rotas de bloqueio */
// router.post('/user/block/newblock', UserController.blockUser)
// router.post('/user/block/unblock', UserController.unblockUser)
// router.post('/user/block/status', UserController.isBlocked)

export default router;