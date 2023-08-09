const boom = require('@hapi/boom');
const pool = require('./../database');
const bcrypt = require('bcrypt');
const PostService = require('./post.service');
const service = new PostService();

class User {

  async getUserById(id) {
    const [user] = await pool.query('select * from users where id=?', [id]);
    return user[0];
  }

  async insertUser(data) {
    const [user] = await pool.query('select * from users where email=?', [data.email]);
    
    if(user[0]) throw boom.badRequest('Email ya registrado');

    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    const [infoInsert] = await pool.query('insert into users set ?', [data]);
    return {message: 'success', newId: infoInsert.insertId};
  }

  async getPostsByUserId(id) {
    const [posts] = await pool.query('select * from favorites_posts where user_id=?', [id]);
    const postsInfo = [];
    for(let i=0; i<posts.length; i++) {
      const [postInfo] = await pool.query('select * from posts where id=?', posts[i].post_id)
      
      postsInfo.push(postInfo[0]);
    }
    return postsInfo;
  }

  async getLikePostsByUserId(id) {
    const [posts] = await pool.query('select * from like_posts where user_id=?', [id]);
    const postsInfo = [];
    for(let i=0; i<posts.length; i++) {
      const [postInfo] = await pool.query('select * from posts where id=?', posts[i].post_id);
      
      postsInfo.push(postInfo[0]);
    }
    return postsInfo;
  }

  async getUserByEmail(email) {
    const [user] = await pool.query('select * from users where email=?', [email]);
    if(user.length==0) throw boom.unauthorized('Email no registrado');
    return user[0];
  }

  async insertPostFavorite(data) {
    const [post] = await pool.query('select * from favorites_posts where post_id=? and user_id=?', [data.post_id, data.user_id]);
    
    if(post[0]) throw boom.badRequest('the post is already in favorites');

    const [infoInsert] = await pool.query('insert into favorites_posts set ?', [data]);
    return {message:'success', newId:infoInsert.insertId};
  }

  async insertPostLike(data) {
    const [post] = await pool.query('select * from like_posts where post_id=? and user_id=?', [data.post_id, data.user_id]);
    if(post[0]) throw boom.badRequest('the post is already in likes');

    await pool.query('insert into like_posts set ?', [data]);
    return {message: 'success'}
  }

  async deletePostFavorite(data) {
    const [infoDelete] = await pool.query('delete from favorites_posts where post_id=? and user_id=?', [data.post_id, data.user_id]);
    if(infoDelete.affectedRows==0) throw boom.notFound('Id inexistente');
    return{message:'success'};
  }

  async deleteLikePost(data) {
    const [info] = await pool.query('delete from like_posts where post_id=? and user_id=?', [data.postId, data.userId]);
    if(info.affectedRows == 0) throw boom.notFound('Id inexistente');
    return {message: 'success'};
  }

}

module.exports = User;