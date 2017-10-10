module.exports = class ModelController {
  create(req, res) {
    res.json(201, {
      success: true
    })
  }

  update(req, res) {
    res.json({
      success: true
    })
  }
}
