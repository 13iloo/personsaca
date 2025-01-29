import dotenv from "dotenv";
dotenv.config();
import Sequelize from "sequelize";
import Person from "../../models/Person.js"; // still hard coded, how would you do to break the dependency?

export default class MSSequelizeStorage {
  constructor({
    database,
    domain,
    username,
    password,
    host,
    port,
    dialect,
    dialectOptions,
  }) {
    this.database = database;
    this.domain = domain;
    this.username = username;
    this.password = password;
    this.host = host;
    this.port = port;
    this.dialect = dialect;
    this.dialectOptions = dialectOptions;
    this.sequelize = null;
  }

  async initialize(app = null) {
    // return stats if somebody wants to check
    // Define the models
    Person.initialize(this.sequelize);

    // Setup associations
    Person.associate();

    // Forcefully migrate, in production mode make this an option
    await this.sequelize.sync();
    return true;
  }

  static async ConnectCreateAndSeed(app) {
    /**
     * Create the Sequelize connection and assign the service to the app if needed
     */
    try {
      // Either pick out from environment variables the settings or use local settings for you local sql
      app.sequelizeStorage = new MSSequelizeStorage({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "1433",
        database: process.env.DB_NAME || "PersonsDB",
        username: process.env.DB_USERNAME || "iotuser",
        password: process.env.DB_PASSWORD || "iotuser",
        dialect: "mssql",
        domain: process.env.DB_DOMAIN || null,
        dialectOptions: {
          options: {
            instanceName: "SQLDEVELOPER", // <= choose the right one
            encrypt: true,
            trustServerCertificate: true, // <= for self issued certificate
          },
        },
      });

      /**
       * Connect to the database
       */
      await app.sequelizeStorage.connect({}); // do not create or seed before, the sequelize instance need to be set !

      /**
       * Create the database
       */
      await app.sequelizeStorage.initialize(); // here we could check if all went well

      /**
       * Seed the database, if needed, with some default data.
       */
      await app.sequelizeStorage.seed();

    } catch (error) {
      console.log("sequelizeStorage error! Exiting program.");
      console.error(error);
      // Bail out if problems with the database connection
      return;
    }
  }
   
  async connect({ domain = null, database = null, username = null, password = null, host = null, port = null, dialect = null, dialectOptions=null }) {
    try {
        // Override if set
        if (domain)
            this.domain = domain;         
        if (database)
            this.database = database;
        if (username)
            this.username = username;
        if (password)
            this.password = password;
        if (host)
            this.host = host;
        if (port)
            this.port = port;
        if (dialect)
            this.dialect = dialect;
        if (dialectOptions)
            this.dialectOptions = dialectOptions;

   /***
             * Check if this is a domain based or direct mssql authentication
             */

if (this.domain) {
  // Pre-connect MS SQLServer 
  // To be able to check and possible create the none existing database we first have to initialize the Sequelize WITHOUT a specific database
  this.sequelize = new Sequelize('', null, null, {
      dialect: this.dialect,
      host: this.host,
      port: this.port,
      dialectOptions: {
          ...this.dialectOptions,
          authentication: {
              type: 'ntlm',
              options: {
                  domain: this.domain,
                  userName: this.username,
                  password: this.password
              }
          }
      }
  });

  // Create the database if it doesn't exist
  await this.sequelize.query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'${this.database}') CREATE DATABASE [${this.database}];`)

  // Now we know the database exists so continue with the real connection WITH a database
  // And after that initialize with the rest, ie table creation and so on

  this.sequelize = new Sequelize(this.database, null, null, {
      dialect: this.dialect,
      host: this.host,
      port: this.port,
      dialectOptions: {
          ...this.dialectOptions,
          authentication: {
              type: 'ntlm',
              options: {
                  domain: this.domain,
                  userName: this.username,
                  password: this.password
              }
          }
      }
  });
}/***
             * Check if this is a domain based or direct mssql authentication
             */

else {
  // Pre-connect MS SQLServer 
  // To be able to check and possible create the none existing database we first have to initialize the Sequelize WITHOUT a specific database
  this.sequelize = new Sequelize('', this.username, this.password, {
      dialect: this.dialect,
      host: this.host,
      port: this.port,
  });

  // Create the database if it doesn't exist
  await this.sequelize.query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'${this.database}') CREATE DATABASE [${this.database}];`)

  // Now we know the database exists so continue with the real connection WITH a database
  // And after that initialize with the rest, ie table creation and so on

  this.sequelize = new Sequelize(this.database, this.username, this.password, {
      dialect: this.dialect,
      host: this.host,
      port: this.port,
  });
}
}catch (error) {
  console.log('Unable to connect to the database:', error);
  throw new Error('Unable to connect to the database');
};
    }
async seed() {
  // default entities into database
}
};
