module.exports = (sequelize, dataTypes) =>{
    let alias = 'Types'
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
        tableName: 'types',
        timestamps: false
    }

    let Type = sequelize.define(alias, cols, config);
    
    Type.associate = (models) => {
        Type.hasMany(models.Users , {
            as: 'Types',
            foreignKey: 'type_id'
        })
    }

    return Type;
}