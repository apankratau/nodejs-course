'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  up: async queryInterface => {
    const passwords = await Promise.all(
      ['qwerty123', '1212121212', 'fnsdjnfjskdfn'].map(text => bcrypt.hash(text, 10)),
    );
    await queryInterface.bulkInsert('User', [
      {
        id: uuidv4(),
        login: 'JohnDoe',
        password: passwords[0],
        age: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        login: 'BoomBoom',
        password: passwords[1],
        age: 33,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        login: 'HeyHo',
        password: passwords[2],
        age: 44,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        login: 'OneTwo',
        password: passwords[0],
        age: 55,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        login: 'BeepBeep',
        password: passwords[1],
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
