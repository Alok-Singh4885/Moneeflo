module.exports = {
  async up(db, client) {
    await db.createCollection('products', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['product_name', 'quantity', 'rate', 'status', 'created', 'updated'],
          properties: {
            product_name: {
              bsonType: 'string',
              description: 'Product name must be a string and is required',
              maxLength: 100,
            },
            user_id: {
              bsonType: 'int',
              description: 'User ID must be an integer and is required',
            },
            quantity: {
              bsonType: 'int',
              description: 'Quantity must be an integer and is required',
            },
            rate: {
              bsonType: 'double',
              description: 'Rate must be a decimal number and is required',
            },
            gst: {
              bsonType: 'double',
              description: 'GST is optional, but if present, must be a decimal number',
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

    await db.collection('products').createIndex({ user_id: 1 }, { name: 'user_id_index' });
    await db.collection('products').createIndex({ product_name: 1 }, { name: 'product_name_index' });
  },

  async down(db, client) {
    await db.collection('products').drop();
  }
};
