require('./todo-list.css');

angular.module('app')
	.component('todoListComponent', {
		controller: todoList,
		template: require('./todo-list.html'),
		bindings: {
			list: '<',
			onDelete: '&',
			onToggle: '&',
			onSort: '&',
		}
	});

function todoList() {
	var self = this;

	self.deleteTodo = event => {
		self.onDelete({
			$event: {
				id: event.id
			}
		});
	};

	self.toggleTodo = event => {
		self.onToggle({
			$event: {
				id: event.id
			}
		});
	};

	self.sort = sortField => {
		self.onSort({
			$event: {
				sortField
			}
		});
	};
}