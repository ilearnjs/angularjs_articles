require('./todo-new.css');

angular.module('app')
	.component('todoNewComponent', {
		controller: todoNew,
		template: require('./todo-new.html')
	});

function todoNew($scope, $state, todoStore) {
	var self = this;

	self.submitted = false;

	self.$onInit = () => {
		self.newTodo = {
			title: '',
		};
	};

	self.submitForm = (isValid) => {
		self.submitted = true;
		if (!isValid) {
			return;
		}

		todoStore.addTodo(self.newTodo);
		$state.go('todo.all');
	};
}