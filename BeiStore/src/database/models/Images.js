module.exports = (sequelize, dataTypes) =>{
    let alias = 'Images'
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image: {
            type: dataTypes.STRING()
        }
    };
    
    let config = {
        tableName: 'images',
        timestamps: false
    }

    let Images = sequelize.define(alias, cols, config);
    
    return Images;
}