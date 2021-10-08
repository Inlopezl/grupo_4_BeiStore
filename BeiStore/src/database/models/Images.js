module.exports = (sequelize, dataTypes) =>{
    let alias = 'Images'
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING()
        },
        product_id:{
            type: dataTypes.INTEGER,
        }
    };
    
    let config = {
        tableName: 'images',
        timestamps: false
    }
    let Images = sequelize.define(alias, cols, config);
    
    Images.associate = (models) => {
        Images.belongsTo(models.Products , {
            as: 'product',
            foreignKey: 'product_id'
        })
    }
    return Images;
}