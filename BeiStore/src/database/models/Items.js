module.exports = (sequelize, dataTypes) =>{
    let alias = 'Items'
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: dataTypes.INTEGER
        },
        product_id:{
            type: dataTypes.INTEGER
        }
    };
    
    let config = {
        tableName: 'items',
        timestamps: false
    }

    let Item = sequelize.define(alias, cols, config);
    Item.associate = (models) => {
        Item.belongsTo(models.Products , {
            as: 'producto',
            foreignKey: 'product_id'
        })
    }

    return Item;
}