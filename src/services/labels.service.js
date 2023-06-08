const boom = require('@hapi/boom');
const pool = require('./../database');

class Label {
  async getLabels() {
    const [labels] = await pool.query('select * from labels');
    return labels;
  }

  async insertLabel(data) {
    const [infoLabel] = await pool.query('insert into labels set ?', [data]);
    return {message: 'Success', newId: infoLabel.insertId};
  }

  async deleteLabel(id) {
    const [infoLabel] = await pool.query('delete from labels where id=?', [id]);

    if(infoLabel.affectedRows == 0) throw boom.notFound('Id inexistente');

    return {message: 'success', deletedId: id};
  }
}

module.exports = Label;