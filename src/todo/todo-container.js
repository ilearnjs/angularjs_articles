require('./todo-container.css');

angular.module('app')
	.component('todoContainerComponent', {
		controller: todoContainer,
		template: require('./todo-container.html'),
		bindings: {
			filter: '<'
		}
	});

function todoContainer($scope, todoStore, todoFiltersConstant) {
	const self = this;
	const subs = {};

	self.noData = true;
	self.todoList = [];
	self.filter = '';
	self.sortField = {};

	self.$onInit = () => {
		subs['todoList'] = todoStore.allTodos$
			.subscribe(todoList => {
				self.noData = !todoList.length;
				self.todoList = getFilteredTodoList(todoList, self.filter);
				self.todoList = getSortedTodoList(self.todoList);
			});
	};

	self.$onDestroy = () => {
		subs['todoList'].unsubscribe();
	};

	self.deleteTodo = event => {
		todoStore.deleteTodo(event.id);
	};

	self.toggleTodo = event => {
		todoStore.toggleTodo(event.id);
	};

	self.sort = event => {
		self.todoList = getSortedTodoList(self.todoList, event.sortField);
	};

	function getFilteredTodoList(todoList, filter) {
		let predicates = {
			[todoFiltersConstant.all]: (todoItem) => true,
			[todoFiltersConstant.active]: (todoItem) => !todoItem.completed,
			[todoFiltersConstant.completed]: (todoItem) => todoItem.completed,
		};

		return todoList.filter(predicates[filter]);
	}

	function getSortedTodoList(todoList, sortField) {
		if (sortField == null) {
			self.sortField = {
				field: 'created',
				direction: -1,
			};
		} else if (self.sortField.field === sortField.field) {
			self.sortField.direction *= -1;
		} else {
			self.sortField = sortField;
		}

		const field = self.sortField.field;
		const direction = self.sortField.direction;

		return todoList.sort((a, b) => ((a[field] > b[field]) - 0.5) * direction); // ¯\_(ツ)_/¯
	}
}