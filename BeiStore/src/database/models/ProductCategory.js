module.exports = (sequelize, dataTypes) =>{
    let alias = 'ProductCategory'
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        product_id:{
            type: dataTypes.INTEGER
        }
    };
    
    let config = {
        tableName: 'product_category',
        timestamps: false
    }
    let ProductCategory = sequelize.define(alias, cols, config);
    
    return ProductCategory;
}