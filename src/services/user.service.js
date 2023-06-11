const boom = require('@hapi/boom');
const pool = require('./../database');

class User {

  async getUserById(id) {
    const [user] = await pool.query('select * from users where id=?', [id]);
    return user;
  }

  async insertUser(data) {
    const [infoInsert] = await pool.query('insert into users set ?', [data]);
    return {message: 'success', newId: infoInsert.insertId};
  }

  async getPostsByUserId(id) {
    const [posts] = await pool.query('select * from favorites_posts where user_id=?', [id]);
    return posts;
  }

  async insertPostFavorite(data) {
    const [infoInsert] = await pool.query('insert into favorites_posts set ?', [data]);
    return {message:'success', newId:infoInsert.insertId};
  }

  async deletePostFavorite(id) {
    const [infoDelete] = await pool.query('delete from favorites_posts where id=?', [id]);
    if(infoDelete.affectedRows==0) throw boom.notFound('Id inexistente');
    return{message:'success', deletedId: id};
  }
}

module.exports = User;