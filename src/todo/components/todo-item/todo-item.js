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
}