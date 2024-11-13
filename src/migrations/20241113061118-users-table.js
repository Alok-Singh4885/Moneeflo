module.exports = {
  async up(db, client) {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'email', 'password', 'status', 'created', 'updated'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'Name must be a string and is required',
              maxLength: 100,
            },
            email: {
              bsonType: 'string',
              description: 'Email must be a string, unique, and is required',
              maxLength: 100,
            },
            password: {
              bsonType: 'string',
              description: 'Password must be a string and is required',
              maxLength: 255,
            },
            status: {
              enum: ['0', '1'],
              description: 'Status can be either "0" (inactive) or "1" (active) and is required',
            },
            created: {
              bsonType: 'date',
              description: 'Creation date must be a date type and is required',
            },
            updated: {
              bsonType: 'date',
              description: 'Updated date must be a date type and is required',
            },
          },
        },
      },
    });

    await db.collection('users').createIndex({ email: 1 }, { unique: true, name: 'email_index' });
  },

  async down(db, client) {
    await db.collection('users').drop();
  }
};
