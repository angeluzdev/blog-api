const boom = require('@hapi/boom');
const pool = require('./../database');

class Post {
  async getPosts() {
    const [posts] = await pool.query('select p.id, p.title, p.content, p.likes, p.views, p.writer_id, p.category_id, p.created_at, c.name_category from posts p inner join categories c on(p.category_id=c.id)');
    return posts;
  }

  async getPostsByCategoryId(id) {
    const [posts] = await pool.query('select * from posts where category_id=?', [id]);
    return posts;
  }

  async getPostsBySearch(title) {
    const [posts] = await pool.query("select * from posts where title like concat('%',?,'%')", [title]);
    return posts;
  }

  async insertPost(data) {
    const [infoPost] = await pool.query('insert into posts set ?', [data]);
    return {message: 'success', newId: infoPost.insertId};
  }

  async deletePost(id) {
    const [infoPost] = await pool.query('delete from posts where id=?', [id]);
    if(infoPost.affectedRows==0) throw boom.notFound('Id inexistente');
    return {message: 'success', deletedId: id};
  }

  async getPostLabels() {
    const [postLabels] = await pool.query('select * from posts_labels');
    res.json(postLabels);
  }

  async getLabelsByPostId(id) {
    const [labels] = await pool.query('select label_id, name_label from posts_labels p inner join labels l on(p.label_id=l.id) where post_id=?;', [id]);
    if(labels.length == 0) throw boom.notFound('Id inexistente');
    return {post_id:id, labels};
  }

  async deleteLabelOfPostById(id) {
    const [infoDelete] = await pool.query('delete from posts_labels where label_id=?', [id]);
    if(infoDelete.affectedRows==0) throw boom.notFound('Id inexistente');
    return {message:'success', deletedLabelId:id};
  }

  async insertPostLabels(data) {
    const [infoInsert] = await pool.query('insert into posts_labels set ?', [data]);
    return {message: 'succes', newId: infoInsert.insertId};
  }
}

module.exports = Post;