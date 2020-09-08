'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('Users', [
      {
        login: 'JohnDoe',
        password: 'qwerty123',
        age: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'BoomBoom',
        password: 'qwerty123',
        age: 33,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'HeyHo',
        password: 'qwerty123',
        age: 44,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
