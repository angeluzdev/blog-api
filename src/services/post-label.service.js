const boom = require('@hapi/boom');
const pool = require('./../database');
const Post = require('./post.service');

class PostLabel {
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
    return {message:'success', deletedId:id};
  }

  async insertPostLabels(data) {
    const [infoInsert] = await pool.query('insert into posts_labels set ?', [data]);
    return {message: 'succes', newId: infoInsert.insertId};
  }
}

module.exports = PostLabel;

/*{
  post_id:2,
  labels: [1,2,4,5]
}*/