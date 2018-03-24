require('./todo-view.css');

angular.module('app')
	.component('todoViewComponent', {
		controller: todoView,
		template: require('./todo-view.html')
	});

function todoView($scope, $state, $stateParams, todoStore) {
	const self = this;
	const id = $stateParams.todoId;

	self.$onInit = () => {
		self.todo = todoStore.getById(id);
	};

	self.submitForm = (isValid) => {
		self.submitted = true;
		if (!isValid) {
			return;
		}

		todoStore.editTodo(id, self.editTodo);
		$state.go('todo.all');
	};
}