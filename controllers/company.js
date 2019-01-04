const comp = require('../models').Company;

module.exports = {
  create(req, res) {
    return comp.create({
        name: req.body.name,
      })
      .then(comp => res.status(200).send(comp))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return comp.all({})
      .then(comp => res.status(200).send(comp))
      .catch(error => res.status(400).send(error));
  },
  getCompany(req, res) {
    return comp.findById(req.params.id)
      .then(data => res.send(data))
      .catch(error => res.send(error))
  },
  edit(req, res) {
    return comp.update({
        name: req.body.name
      }, {
        returning: true,
        where: {
          id: req.params.id
        }
      })
      .then((rowsUpdated) => console.log(rowsUpdated))
      .catch(error => console.log(error))
  },
  delete(req, res) {
    return comp.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(data => res.send(data))
      .catch(error => res.send(error))
  }
}