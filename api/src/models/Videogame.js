const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    // Obligatorios
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Opcionales
    released: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    playtime: {
      type: DataTypes.INTEGER,
    }

  }, {
    timestamps: false
  });
};
