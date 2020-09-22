import express, { Request } from 'express';
import GroupService from '../services/GroupService';
import validators from '../middlewares/validators';
import { GroupSchema } from '../schema';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send(await GroupService.getAll());
});

router.get('/:id', validators(GroupSchema.groupId, 'params'), async (req, res) => {
  const group = await GroupService.getById(req.params.id);
  group ? res.send(group) : res.status(404).send({ message: 'Group not found!' });
});

router.post('/', validators(GroupSchema.group, 'body'), async (req, res) => {
  res.send(await GroupService.create(req.body));
});

router.put(
  '/:id',
  validators(GroupSchema.groupId, 'params'),
  validators(GroupSchema.group, 'body'),
  async (req, res) => {
    const group = await GroupService.update(req.params.id, req.body);
    group ? res.send(group) : res.status(404).send({ message: 'Group not found!' });
  },
);

router.delete('/:id', validators(GroupSchema.groupId, 'params'), async (req, res) => {
  const group = await GroupService.delete(req.params.id);

  group ? res.send({ messge: 'Group has been deleted' }) : res.status(404).send({ message: 'Group not found!' });
});

router.post(
  '/:id/addUsers',
  validators(GroupSchema.groupId, 'params'),
  validators(GroupSchema.userIds, 'body'),
  async (req: Request<{ id: string }, any, { userIds: string[] }>, res) => {
    const userGroup = await GroupService.addUsersToGroup(req.params.id, req.body.userIds);

    userGroup
      ? res.send({ messge: 'Users have been added to group' })
      : res.status(404).send({ message: 'Group and/or Users not found!' });
  },
);

export default router;
