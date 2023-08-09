const boom = require('@hapi/boom');
const pool = require('./../database');

class Post {
  async getPosts() {
    const [posts] = await pool.query('select p.id, p.title, p.content, p.likes, p.views, p.writer_id, p.category_id, p.created_at, c.name_category from posts p inner join categories c on(p.category_id=c.id) order by created_at desc');

    for(let i=0; i<posts.length; i++) {
      let [writer]= await pool.query('select * from writers where id=?', [posts[i].writer_id]);
      posts[i].writor = writer[0];
      let {labels} = await this.getLabelsByPostId(posts[i].id);
      posts[i].labels = labels;
    }
    return posts;
  }

  async getPostById(id, userId) {
    const [post] = await pool.query('select * from posts where id=?', [id]);
    if(post.length==0) throw boom.notFound('Id inexistente');

    const [writer] = await pool.query('select * from writers where id=?', [post[0].writer_id]);
    const {labels} = await this.getLabelsByPostId(id);
    post[0].writer = writer[0];
    post[0].labels = labels;

    if(userId) {
      const [posFav] = await pool.query('select * from favorites_posts where user_id=? and post_id=?', [userId, id]);
      posFav[0] ? post[0].isFav = true : post[0].isFav = false;
      const [postLike] = await pool.query('select * from like_posts where user_id=? and post_id=?', [userId, id]);
      postLike[0] ? post[0].isLike = true : post[0].isLike = false;
    }
    
    return post;
  }

  async getPostsByCategoryId(id) {
    let posts = await this.getPosts();
    posts = posts.filter(e => e.category_id==id);
    return posts;
  }

  async getPostsBySearch(title) {
    const [posts] = await pool.query("select * from posts where title like concat('%',?,'%')", [title]);

    for(let i=0; i<posts.length; i++) {
      let [writer]= await pool.query('select * from writers where id=?', [posts[i].writer_id]);
      posts[i].writor = writer[0];
      let {labels} = await this.getLabelsByPostId(posts[i].id);
      posts[i].labels = labels;
      let [category_name] = await pool.query('select c.name_category from posts p inner join categories c on(p.category_id=c.id) where p.id=?', [posts[i].id]);
      posts[i].name_category = category_name[0].name_category;
    }    
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
    const [post] = await pool.query('select * from posts where id=?', [id]);
    if(!post[0]) throw boom.notFound('ID inexistente'); 
    const [labels] = await pool.query('select label_id, name_label from posts_labels p inner join labels l on(p.label_id=l.id) where post_id=?;', [id]);
    
    return {post_id:id, labels};
  }

  async deleteLabelOfPostById(id,idPost) {
    const [infoDelete] = await pool.query('delete from posts_labels where label_id=? and post_id=?', [id,idPost]);
    if(infoDelete.affectedRows==0) throw boom.notFound('Id inexistente');
    return {message:'success', deletedLabelId:id};
  }

  async insertPostLabels(data) {
    const [infoInsert] = await pool.query('insert into posts_labels set ?', [data]);
    return {message: 'succes'};
  }

  async setViewsOfPost(id) {
    const [info] = await pool.query('update posts set views=views+1 where id=?', [id]);
  }
}

module.exports = Post;