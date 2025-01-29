import express from 'express';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';

// Helpers
//import apiResponse from './helpers/apiResponse.js'

// Routers
import apiRouting from './routes/api.js'

// Handlers

// =========================================================
// Setup express
// ---------------------------------------------------------
const app = express();
// we export the app object so that we can access when needed from other files
export default app;



// modern way not __dirname!
import { fileURLToPath } from 'node:url';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, 'public')));

//To allow cross-origin requests
//app.use(cors());

// ---------------------------------------------------------
// Route Prefixes
// ---------------------------------------------------------
// API calls from possible front end
apiRouting(app);


// default route for all request goes to /, ie provides the REACT frontend from public folder. ( Remember to build frontend and deploy to this folder)
app.use((req, res /* , next */) => {
  res.redirect('/');
});

// =========================================================
// Server components, 
// ---------------------------------------------------------
// Server
const server = http.createServer(app);
// azure will create a https server and give it a certificate so we dont need to const server = https.createServer(app);


// =========================================================
// Setup Sequelize based database
// ---------------------------------------------------------
/**
* Infrastructures: Sequelize storage
*/
import Storage from './storage/sql/MSSequelizeStorage.js'
await Storage.ConnectCreateAndSeed(app)


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// All setup, listen, connect and then run main
// Start to listen
server.listen(process.env.PORT || '80', () => {
  console.log('Listening on %d.', server.address().port);
});

const main = async () => {

}

// Run the application
main()
  .catch((ex) => {
    console.log("Exception when running the application: ", ex)
  });

console.log('server.js executed!');

