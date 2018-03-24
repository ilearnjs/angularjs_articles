require('./todo-item.css');

angular.module('app')
	.component('todoItemComponent', {
		controller: todoItem,
		template: require('./todo-item.html'),
		bindings: {
			item: '<',
			completed: '<',
			onDelete: '&',
			onUpdate: '&',
			onToggle: '&'
		}
	});

function todoItem() {
	var self = this;

	self.deleteTodo = () => {
		self.onDelete({
			$event: {
				id: self.item.id
			}
		});
	};

	self.toggleTodo = () => {
		self.onToggle({
			$event: {
				id: self.item.id
			}
		});
	};
}  