const cds = require("@sap/cds");
const cov2ap = require("@sap/cds-odata-v2-adapter-proxy");
const cds_swagger = require ('cds-swagger-ui-express');
const express = require ('express');
cds.on("bootstrap", (app) => app.use(cov2ap()));

module.exports = async (o) => {
    const app = cds.app = o.app || express(); 
    app.use(cds_swagger());
    cds.emit('bootstrap', app);
    app.baseDir = o.baseDir
    o.app = app
    o.app.httpServer  = await cds.server(o);
    
    return o.app.httpServer 
}