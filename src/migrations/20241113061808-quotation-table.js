module.exports = {
  async up(db, client) {
    await db.createCollection('quotations', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['user_id', 'pdf_path', 'status', 'created', 'updated'],
          properties: {
            user_id: {
              bsonType: 'int',
              description: 'User ID must be an integer and is required',
            },
            pdf_path: {
              bsonType: 'string',
              description: 'PDF path must be a string and is required',
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

    await db.collection('quotations').createIndex({ user_id: 1 }, { name: 'user_id_index' });
    await db.collection('quotations').createIndex({ _id: 1 }, { name: 'PRIMARY', unique: true });
  },

  async down(db, client) {
    await db.collection('quotations').drop();
  }
};
