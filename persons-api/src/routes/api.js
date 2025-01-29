import personsRouter from './persons.js';

const apiRouting = (app) => {
    // No router here, use chain them
    app.use("/api/persons", personsRouter)
    return app;
}

export default apiRouting;


