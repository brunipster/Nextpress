const taskController = require('@Controllers/Tasks')
const securityController = require('@Controllers/Security')

module.exports = {
    task: [
      {
        methods: 'POST',
        path: '/create',
        controller: taskController.create,
        permissions: ['admin']
      },
      {
        methods: 'GET',
        path: '/all',
        controller: taskController.getAll,
        permissions: []
      },
      {
        methods: 'POST',
        path: '/complete',
        controller: taskController.complete,
        permissions: ['admin']
      },
    ],
    security: [
      {
        methods: 'POST',
        path: '/register',
        controller: securityController.register,
        permissions: ['admin']
      },
      {
        methods: 'POST',
        path: '/auth',
        controller: securityController.authenticate,
        permissions: []
      }
    ]
  }