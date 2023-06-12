const boom = require('@hapi/boom');
const pool = require('./../database');
const bcrypt = require('bcrypt');

class User {

  async getUserById(id) {
    const [user] = await pool.query('select * from users where id=?', [id]);
    return user[0];
  }

  async insertUser(data) {
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    const [infoInsert] = await pool.query('insert into users set ?', [data]);
    return {message: 'success', newId: infoInsert.insertId};
  }

  async getPostsByUserId(id) {
    const [posts] = await pool.query('select * from favorites_posts where user_id=?', [id]);
    return posts;
  }
  
  async getUserByEmail(email) {
    const [user] = await pool.query('select * from users where email=?', [email]);
    if(user.length==0) throw boom.unauthorized('Email no registrado');
    return user[0];
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