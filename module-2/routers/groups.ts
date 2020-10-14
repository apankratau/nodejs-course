import express from 'express';
import GroupService from '../services/GroupService';
import validators from '../middlewares/validators';
import { GroupSchema } from '../schema';
import asyncCatch from '../core/utils/asyncCatch';

const router = express.Router();

router.get(
  '/',
  asyncCatch(async (req, res) => {
    res.send(await GroupService.getAll());
  }),
);

router.get(
  '/:id',
  validators(GroupSchema.groupId, 'params'),
  asyncCatch(async (req, res) => {
    const group = await GroupService.getById(req.params.id);
    group ? res.send(group) : res.status(404).send({ message: 'Group not found!' });
  }),
);

router.post(
  '/',
  validators(GroupSchema.group, 'body'),
  asyncCatch(async (req, res) => {
    res.send(await GroupService.create(req.body));
  }),
);

router.put(
  '/:id',
  validators(GroupSchema.groupId, 'params'),
  validators(GroupSchema.group, 'body'),
  asyncCatch(async (req, res) => {
    const group = await GroupService.update(req.params.id, req.body);
    group ? res.send(group) : res.status(404).send({ message: 'Group not found!' });
  }),
);

router.delete(
  '/:id',
  validators(GroupSchema.groupId, 'params'),
  asyncCatch(async (req, res) => {
    const group = await GroupService.delete(req.params.id);

    group ? res.send({ message: 'Group has been deleted' }) : res.status(404).send({ message: 'Group not found!' });
  }),
);

router.post(
  '/:id/addUsers',
  validators(GroupSchema.groupId, 'params'),
  validators(GroupSchema.userIds, 'body'),
  asyncCatch(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userGroup = await GroupService.addUsersToGroup(req.params.id, req.body.userIds);

    userGroup
      ? res.send({ message: 'Users have been added to group' })
      : res.status(404).send({ message: 'Group and/or Users not found!' });
  }),
);

export default router;
