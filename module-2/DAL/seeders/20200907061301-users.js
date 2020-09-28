'use strict';
var { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('User', [
      {
        id: uuidv4(),
        login: 'JohnDoe',
        password: 'qwerty123',
        age: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        login: 'BoomBoom',
        password: 'qwerty123',
        age: 33,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        login: 'HeyHo',
        password: 'qwerty123',
        age: 44,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        login: 'OneTwo',
        password: '1212121212',
        age: 55,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        login: 'BeepBeep',
        password: 'fnsdjnfjskdfn',
        age: 66,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('User', null, {});
  },
};
