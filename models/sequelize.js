import Sequelize from 'sequelize'
const sequelize = new Sequelize(process.env.JAWSDB_URL);
export default sequelize;