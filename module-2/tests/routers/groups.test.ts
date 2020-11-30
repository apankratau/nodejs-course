import request from 'supertest';
import { Request, Response, NextFunction } from 'express';
import GroupService from '../../services/GroupService';
import { mockGroups } from '../../services/__mocks__/GroupService';
import { app } from '../../app';

jest.mock('../../middlewares/check-jwt', () => jest.fn((req: Request, res: Response, next: NextFunction) => next()));
jest.mock('../../services/GroupService');
jest.mock('../../services/UserService');
jest.mock('../../app');

describe('Groups controller', () => {
  test('should test GET /groups', done => {
    void request(app)
      .get('/groups')
      .end((err, res) => {
        expect(GroupService.getAll).toHaveBeenCalled();
        expect(res.body).toMatchObject(mockGroups);

        done();
      });
  });

  test('should test GET /groups/:id', done => {
    const id = '4d49113c-c0b0-4d21-bf2f-b4bc62d7bc06';
    void request(app)
      .get('/groups/' + id)
      .end(() => {
        expect(GroupService.getById).toHaveBeenCalledWith(id);

        done();
      });
  });

  test('should test POST /groups', done => {
    const group = { name: 'Somegroup', permissions: ['READ'] };
    void request(app)
      .post('/groups')
      .send(group)
      .end(() => {
        expect(GroupService.create).toHaveBeenCalledWith(group);

        done();
      });
  });

  test('should test PUT /groups/:id', done => {
    const group = { name: 'Somegroup', permissions: ['READ'] };
    const id = '4d49113c-c0b0-4d21-bf2f-b4bc62d7bc06';
    void request(app)
      .put('/groups/' + id)
      .send(group)
      .end(() => {
        expect(GroupService.update).toHaveBeenCalledWith(id, group);

        done();
      });
  });

  test('should test DELETE /groups/:id', done => {
    const id = '4d49113c-c0b0-4d21-bf2f-b4bc62d7bc06';
    void request(app)
      .delete('/groups/' + id)
      .end(() => {
        expect(GroupService.delete).toHaveBeenCalledWith(id);

        done();
      });
  });
});
