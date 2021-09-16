module.exports = (sequelize, dataTypes) =>{
    let alias = 'Categories'
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: dataTypes.STRING()
        }
    };
    
    let config = {
        tableName: 'categories',
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config);
    
    // Category.associate = (models) => {
    //     Category.hasMany(models.Products , {
    //         as: 'products',
    //         foreignKey: 'category_id'
    //     })
    // }
    return Category;
}