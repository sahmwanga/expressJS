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
      .then(empl => res.send(empl))
      .catch(error => res.status(400).send(error))
  },
  list(req, res) {
    return empl.findAll({
        include: [{
          model: company,
          required: true,
        }]
      })
      .then(data => res.send(data))
      .catch(error => res.status(400).send(error))
  },
  getEmployee(req, res) {
    return empl.findById(req.params.id, {
        include: [{
          model: company,
          required: true
        }]
      })
      .then(data => res.send(data))
      .catch(error => res.status(400).send(error))
  },
  edit(req, res) {
    return empl.findById(req.params.id, {
        include: [{
          model: company
        }]
      })
      .then(emp => {
        if (!emp) {
          return res.status(404).send({
            message: "Employee not found"
          })
        }
        return emp.update({
            name: req.body.name || emp.name,
            designation: req.body.designation || emp.designation,
            salary: req.body.salary || emp.salary,
            companyId: req.body.companyId || emp.companyId
          })
          .then(() => res.status(200).send(emp))
          .catch(error => res.status(400).send(error))

      })
      .catch(error => res.status(400).send(error))
  },
  delete(req, res) {
    return empl.findById(req.params.id)
      .then(emp => {
        if (!emp) {
          return res.status(404).send({
            message: 'Employee not Found!'
          })
        }
        return emp.destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error))

      })
      .catch(errro => res.status(400).send(error))


  }
}