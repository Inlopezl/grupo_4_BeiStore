module.exports = (sequelize, dataTypes) =>{
    const alias = 'Users'
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(30)
        },
        description:{
            type: dataTypes.STRING(30)
        },
        category:{
            type: dataTypes.STRING(30)
        },
        off:{
            type: dataTypes.INTEGER
        },
        price:{
            type: dataTypes.INTEGER
        },
        brand_id:{
            foreignKey: true,
            type: dataTypes.INTEGER,
        },
        category_id:{
            foreignKey: true,
            type: dataTypes.INTEGER,
        },
    };
    
    const config = {
        tableName: 'users',
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);
    
    return Product;
}