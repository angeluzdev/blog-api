const boom = require('@hapi/boom');
const pool = require('./../database');

class Coment {
  async getComentsByPostId(id) {
    const [coments] = await pool.query('select * from coments where post_id=?', [id]);
    return coments;
  }

  async insertComent(data) {
    const [info] = await pool.query('insert into coments set ?', [data]);
    return {message: 'success', newId: info.insertId};
  }

  async deleteComent(id) {
    const [info] = await pool.query('delete from coments where id=?', [id]);
    if(info.affectedRows==0) throw boom.notFound('Id inexistente'); 
    return {message: 'success', deletedId: id};
  }
}

module.exports = Coment;