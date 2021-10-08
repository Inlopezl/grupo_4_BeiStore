module.exports = (sequelize, dataTypes) =>{
    const alias = 'Products'
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
        off:{
            type: dataTypes.INTEGER
        },
        price:{
            type: dataTypes.INTEGER
        },
        sales:{
            type: dataTypes.INTEGER,
        },
        brand_id:{
            type: dataTypes.INTEGER,
        }
    };
    
    const config = {
        tableName: 'products',
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);
    
    Product.associate = (models) => {

        Product.belongsToMany(models.Categories , {
            as: 'categories',
            through: 'product_category',
            foreignKey: 'product_id',
            otherKey: 'category_id',
            timestamps: false
        })

        Product.belongsTo(models.Brands , {
            as: 'brand',
            foreignKey: 'brand_id'
        })

        Product.hasMany(models.Images, {
            as: 'images',
            foreignKey: 'product_id'
        })

    }

    return Product;
}