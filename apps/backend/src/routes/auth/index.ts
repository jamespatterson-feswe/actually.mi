import { Router } from 'express';
import { PATHS as paths } from './auth.constants';

import login from './login/login.routes';
import logout from './logout/logout.routes';
import mi from './mi/mi.routes';
import register from './register/register.routes';

const router = Router();

router.use(paths.login, login);
router.use(paths.logout, logout);
router.use(paths.mi, mi);
router.use(paths.register, register);

export default router;
