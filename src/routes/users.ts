'use strict';

import Route from './route'


export default class UserRouter extends Route {

    constructor() {
        super();
    }
    
}

/* SUBROUTER */
/** 
userRouter.get('/', userController.getAll);
userRouter.get('/:userID', validators.get(USER.IS_ID_CORRECT), userController.getByID);
userRouter.post('/create', validators.get(USER.VALIDATION), userController.create);
userRouter.put('/:userID', validators.get(USER.MODIFICATION), userController.modifyByID);
userRouter.delete('/:userID', validators.get(USER.IS_ID_CORRECT), userController.deleteByID);

export default userRouter;
*/