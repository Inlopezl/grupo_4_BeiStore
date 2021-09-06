module.exports = (sequelize, dataTypes) =>{
    let alias = 'Users'
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING()
        },
        surName: {
            type: dataTypes.STRING()
        },
        avatar: {
            type: dataTypes.STRING()
        },
        email: {
            type: dataTypes.STRING()
        },
        password : {
            type: dataTypes.STRING()
        },
        type_id: {
            type: dataTypes.INTEGER
        },

    };
    
    let config = {
        tableName: 'users',
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);
    
    

    return User;
}