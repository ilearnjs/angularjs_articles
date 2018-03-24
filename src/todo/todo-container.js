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
	self.allTodos = [];
	self.todoList = {};
	self.filter = {};

	self.sortField = {
		field: 'created',
		direction: -1
	};

	self.pagination = {
		currentPage: 1,
		itemsPerPage: 1
	};

	self.$onInit = () => {
		subs['todoList'] = todoStore.allTodos$
			.subscribe(todoList => {
				self.allTodos = todoList;
				self.noData = !todoList.length;
				if (!self.noData) {
					self.todoList = getTodoList(self.allTodos, self.filter, self.sortField, self.pagination);
				}
			});
	};

	self.$onDestroy = () => {
		subs['todoList'].unsubscribe();
	};

	self.deleteTodo = event => {
		todoStore.deleteTodo(event.id);
	};

	self.sort = event => {
		if (self.sortField.field === event.sortField.field) {
			self.sortField.direction *= -1;
		} else {
			self.sortField = event.sortField;
		}

		self.todoList = getTodoList(self.allTodos, self.filter, self.sortField, self.pagination);
	};

	self.changePage = event => {
		self.pagination = Object.assign(self.pagination, event.pagination);
		self.todoList = getTodoList(self.allTodos, self.filter, self.sortField, self.pagination);
	};

	function getTodoList(allTodos, filter, sortField, pagination) {
		let todoList = getFilteredTodoList(allTodos, filter);
		let totalCount = todoList.length;
		todoList = getSortedTodoList(todoList);
		todoList = getPageItems(todoList, pagination.currentPage, pagination.itemsPerPage);

		return {
			todoList,
			totalCount
		}
	}

	function getFilteredTodoList(todoList, filter) {
		let predicates = {
			[todoFiltersConstant.all]: (todoItem) => true,
			[todoFiltersConstant.today]: (todoItem) => todoItem.created > addDays(-1),
			[todoFiltersConstant.lastWeek]: (todoItem) => todoItem.created > addDays(-7),
			[todoFiltersConstant.lastMonth]: (todoItem) => todoItem.created > addMonth(-1),
		};

		return todoList.filter(predicates[filter]);
	}

	function getSortedTodoList(todoList, sortField) {
		const field = self.sortField.field;
		const direction = self.sortField.direction;

		return todoList.sort((a, b) => ((a[field] > b[field]) - 0.5) * direction); // ¯\_(ツ)_/¯
	}

	function getPageItems(todoList, currentPage, itemsPerPage) {
		if (todoList.length < currentPage * itemsPerPage) {
			currentPage = 1;
		}

		return todoList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
	}

	function addDays(daysCount) {
		const date = new Date();
		date.setDate(date.getDate() + daysCount);
		return date;
	}

	function addMonth(monthCount) {
		const date = new Date();
		date.setMonth(date.getMonth() + monthCount);
		return date;
	}
}