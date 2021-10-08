module.exports = (sequelize, dataTypes) =>{
    let alias = 'Categories'
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING()
        }
    };
    
    let config = {
        tableName: 'categories',
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config);
    Category.associate = (models) => {
        Category.belongsToMany(models.Products , {
            as: 'products',
            through: 'product_category',
            foreignKey: 'category_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }
    return Category;
}