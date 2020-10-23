module.exports = function (fn, db) {
    return (req, res, next) => {
      req.db = db
      const routePromise = fn(req, res, next)
      if (routePromise.catch) {
        routePromise.catch(err => next(err))
      }
    }
}