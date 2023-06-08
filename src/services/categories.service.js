const boom = require('@hapi/boom');
const pool = require('./../database');

class Category {
  async getCategories() {
    const [categories] = await pool.query('select * from categories');
    return categories;
  }

  async insertCategory(data) {
    const [infoCategory] = await pool.query('insert into categories set ?', [data]);
    return {message: 'successful', newId: infoCategory.insertId};
  }

  async deleteCategory(id) {
    const [infoCategory] = await pool.query('delete from categories where id=?', [id]);

    if(infoCategory.affectedRows==0) throw boom.notFound('Id inexistente');

    return {message: 'successful', deleteId: id}
  }

}

module.exports = Category;