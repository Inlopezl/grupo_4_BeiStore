module.exports = (sequelize, dataTypes) =>{
    let alias = 'Cart'
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_id: {
            type: dataTypes.INTEGER
        },
        user_id:{
            type: dataTypes.INTEGER
        },
        paid:{
            type: dataTypes.INTEGER
        }
    };
    
    let config = {
        tableName: 'cart',
        timestamps: false
    }

    let Cart = sequelize.define(alias, cols, config);
    Cart.associate = (models) => {
        Cart.belongsTo(models.Users , {
            as: 'user',
            foreignKey: 'user_id'
        })

        Cart.belongsTo(models.Items , {
            as: 'item',
            foreignKey: 'item_id'
        })
    }

    return Cart;
}