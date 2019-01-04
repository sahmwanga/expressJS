const empl = require('../models').Employee;
const company = require('../models').Company;

module.exports = {

  create(req, res) {
    return empl.create({
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary,
        companyId: req.body.companyId
      })
      .then(empl => res.json(empl))
      .catch(error => res.send(error))
  },
  list(req, res) {
    return empl.findAll({
        include: [{
          model: company,
          required: true,
        }]
      })
      .then(data => res.send(data))
      .catch(error => res.send(error))
  },
  getEmployee(req, res) {
    return empl.findById(req.params.id, {
        include: [{
          model: company,
          required: true
        }]
      })
      .then(data => res.send(data))
      .catch(error => res.send(error))
  },
  edit(req, res) {
    return empl.update({
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary,
        companyId: req.body.companyId
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(data => res.send(data))
      .catch(error => res.send(error))
  },
  delete(req, res) {
    return empl.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(data => res.send(data))
      .catch(error => res.send(error))
  }
}