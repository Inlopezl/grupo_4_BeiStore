module.exports = (sequelize, dataTypes) =>{
    let alias = 'Brands'
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
        tableName: 'brands',
        timestamps: false
    }

    let Brand = sequelize.define(alias, cols, config);
    Brand.associate = (models) => {
        Brand.hasMany(models.Products , {
            as: 'productos',
            foreignKey: 'brand_id'
        })
    }

    return Brand;
}