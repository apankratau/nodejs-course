export const mockGroups = [{}, {}];

const mock = {
  getAll: jest.fn(() => mockGroups),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export default mock;
