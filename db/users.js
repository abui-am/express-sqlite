// crud knex db users table with javascript and nodejs

const knex = require('./knex');

module.exports = {
  getAll() {
    const knexQuery = knex('users');
    return knexQuery;
  },
  getOne(id) {
    return knex('users').where('id', id).first();
  },
  create(user) {
    return knex('users').insert(user);
  },
  update(id, user) {
    return knex('users').where('id', id).update(user, '*');
  },
  delete(id) {
    return knex('users').where('id', id).del();
  },
};
