import request from 'supertest';
import { Request, Response, NextFunction } from 'express';
import UserService from '../../services/UserService';
import { mockUsers } from '../../services/__mocks__/UserService';
import { app } from '../../app';

jest.mock('../../middlewares/check-jwt', () => jest.fn((req: Request, res: Response, next: NextFunction) => next()));
jest.mock('../../services/UserService');
jest.mock('../../services/GroupService');
jest.mock('../../app');

describe('Users controller', () => {
  test('should test GET /users', done => {
    void request(app)
      .get('/users')
      .end((err, res) => {
        expect(UserService.getAll).toHaveBeenCalled();
        expect(res.body).toMatchObject(mockUsers);

        done();
      });
  });

  test('should test GET /users/autosuggest', done => {
    void request(app)
      .get('/users/autosuggest?login=burbur&limit=3')
      .end(() => {
        expect(UserService.getAutosuggested).toHaveBeenCalledWith('burbur', 3);

        done();
      });
  });

  test('should test GET /users/:id', done => {
    const id = '4d49113c-c0b0-4d21-bf2f-b4bc62d7bc06';
    void request(app)
      .get('/users/' + id)
      .end(() => {
        expect(UserService.getById).toHaveBeenCalledWith(id);

        done();
      });
  });

  test('should test POST /users', done => {
    const user = { login: 'login', password: 'abcd12fDA', age: 11 };
    void request(app)
      .post('/users')
      .send(user)
      .end(() => {
        expect(UserService.create).toHaveBeenCalledWith(user);

        done();
      });
  });

  test('should test PUT /users/:id', done => {
    const user = { login: 'login', password: 'abcd12fDA', age: 11 };
    const id = '4d49113c-c0b0-4d21-bf2f-b4bc62d7bc06';
    void request(app)
      .put('/users/' + id)
      .send(user)
      .end(() => {
        expect(UserService.update).toHaveBeenCalledWith(id, user);

        done();
      });
  });

  test('should test DELETE /users/:id', done => {
    const id = '4d49113c-c0b0-4d21-bf2f-b4bc62d7bc06';
    void request(app)
      .delete('/users/' + id)
      .end(() => {
        expect(UserService.delete).toHaveBeenCalledWith(id);

        done();
      });
  });
});
