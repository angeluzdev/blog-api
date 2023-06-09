const boom = require('@hapi/boom');
const pool = require('./../database');

class Writer {
  async getWriters() {
    const [writers] = await pool.query('select * from writers');
    return writers;
  }

  async getWriterById(id) {
    const [writer] = await pool.query('select * from writers where id=?', [id]);
    return writer;
  }

  async insertWriter(data) {
    const [infoUser] = await pool.query('insert into users set ?', [data.user]);
    const [infoWriter] = await pool.query('insert into writers set ?', [data.writer])

    return {message: 'success', newWriterId: infoWriter.insertId, newUserId: infoUser.insertId};
  }

  async deleteWriter(id) {
    const [infoWriter] = await pool.query('delete from writers where id=?', [id]);
    if(infoWriter.affectedRows==0) throw boom.notFound('Id inexistente');
    return {message: 'successs', deletedId: id};
  }

  /*async updateWriter(data, id) {
    const [infoUpdate] = await pool.query('upadte writers set ? where id=?', [data, id]);
    if(infoUpdate.affectedRows==0) throw boom.notFound('Id inexistente');
    return {message:'success'};
  }*/
}

module.exports = Writer;