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
    return comp.findAll()
      .then(comp => res.status(200).send(comp))
      .catch(error => res.status(400).send(error));
  },
  getCompany(req, res) {
    return comp.findById(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(400).send({
            message: "No company found"
          })
        }
        res.send(data)
      })
      .catch(error => res.status(400).send(error))
  },
  edit(req, res) {
    return comp.findById(req.params.id)
      .then(cmp => {
        if (!cmp) {
          return res.status(404).send({
            message: 'Company not found'
          })
        }

        return cmp.update({
            name: req.body.name || cmp.name
          })
          .then(() => res.status(200).send(cmp))
          .catch(error => res.status(400).send(error))

      })
      .catch()
  },
  delete(req, res) {
    return comp.findById(req.params.id)
      .then(cmp => {
        if (!cmp) {
          return res.status(404).send({
            message: 'Company not found!'
          });
        }
        return cmp.destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  }
}