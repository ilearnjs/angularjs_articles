require('./todo-edit.css');

angular.module('app')
	.component('todoEditComponent', {
		controller: todoEdit,
		template: require('./todo-edit.html')
	});

function todoEdit($scope, $state, $stateParams, todoStore) {
	const self = this;
	const id = $stateParams.todoId;

	self.$onInit = () => {
		self.editTodo = Object.assign({}, todoStore.getById(id));
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