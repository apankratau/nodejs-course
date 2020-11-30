export const mockUsers = [{}, {}];

const mock = {
  getAll: jest.fn(() => mockUsers),
  getAutosuggested: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export default mock;
