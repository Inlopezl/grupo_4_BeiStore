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
            type: dataTypes.INTEGER,
        },
        category_id:{
            type: dataTypes.INTEGER,
        },
    };
    
    const config = {
        tableName: 'products',
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);
    
    Product.associate = (models) => {

        // Product.belongsToMany(models.Images , {
        //     as: 'images',
        //     through: 'product_images',
        //     foreignKey: 'product_id',
        //     otherKey: 'image_id',
        //     timestamps: false
        // })

        // Product.belongsTo(models.Brands , {
        //     as: 'brand',
        //     foreignKey: 'brand_id'
        // })
        // Product.belongsTo(models.Categories , {
        //     as: 'categories',
        //     foreignKey: 'category_id'
        // })
    }

    return Product;
}