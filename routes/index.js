const companyController = require('../controllers').company;
const employeeControler = require('../controllers').employee

module.exports = (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Todo API!'
  }));

  app.post('/api/company', companyController.create);
  app.put('/api/company/:id', companyController.edit);
  app.delete('/api/company/:id', companyController.delete);
  app.get('/api/company', companyController.list);
  app.get('/api/company/:id', companyController.getCompany);

  //employee routes
  app.post('/api/employee', employeeControler.create); // add new employee
  app.put('/api/employee/:id', employeeControler.edit); // edit employee
  app.delete('/api/employee/:id', employeeControler.delete); // delete employee
  app.get('/api/employee', employeeControler.list); // get all employees
  app.get('/api/employee/:id', employeeControler.getEmployee); // get individual employee by {ID}

}