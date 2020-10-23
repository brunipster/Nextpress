const taskController = require('@Controllers/Tasks')

module.exports = {
    task: [
      {
        methods: 'POST',
        path: '/create',
        controller: taskController.create
      },
      {
        methods: 'GET',
        path: '/all',
        controller: taskController.getAll
      },
      {
        methods: 'POST',
        path: '/complete',
        controller: taskController.complete
      },
    ]
  }