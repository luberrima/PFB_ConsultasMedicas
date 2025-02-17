


export const usersRouter = express.Router();


ConsulRouter.delete('/consul/:id', authUserMiddleware,
    entryExistsMiddleware,
    canDoItMiddleware,
    editEntryController);