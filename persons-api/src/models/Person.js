import { DataTypes, Model } from 'sequelize';

export default class Person extends Model {
    constructor({ firstName, lastName }) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Obs: class static method, not for a specific instance!
    static initialize( sequelize ) {
        // Setup the database schema
        super.init(
            {
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                lastName: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
            },
            {
                // Other model options go here
                sequelize, // We need to pass the connection instance
                modelName: 'PersonModel', // We need to choose the model name
                tableName: 'Persons'
            },
        );
    }

    // Possible relationships between classes
    static associate() {
    }

}

