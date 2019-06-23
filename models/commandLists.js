'use strict';

module.exports = (seqConn, DataTypes) => {
    const commandLists = seqConn.define('commandLists',{
        id: { type: DataTypes.INTEGER, autoIncremet: true, primaryKey: true},
        name: { type: DataTypes.STRING(16), allowNull: false},
        commands: {type: DataTypes.STRING(255), allowNull: false}
    },{
        timestamps: false,
        freezeTableName: true,
        tableName: 'commandlists'
    });
    return commandLists;
}