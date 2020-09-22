'use strict';
var { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('Group', [
      {
        id: uuidv4(),
        name: 'Managers',
        permissions: ['READ', 'SHARE'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Developers',
        permissions: ['READ', 'WRITE', 'DELETE'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Admins',
        permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Group', null, {});
  },
};
