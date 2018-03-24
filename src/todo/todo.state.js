angular.module('app')
	.config($stateProvider => {
		$stateProvider
			.state('todo', {
				abstract: true,
				url: '/',
				template: '<ui-view />'
			})
			.state('todo.all', {
				url: '',
				component: 'todoContainerComponent',
				resolve: {
					filter: (todoFiltersConstant) => todoFiltersConstant.all
				}
			})
			.state('todo.today', {
				url: 'today',
				component: 'todoContainerComponent',
				resolve: {
					filter: (todoFiltersConstant) => todoFiltersConstant.today
				}
			})
			.state('todo.lastWeek', {
				url: 'lastWeek',
				component: 'todoContainerComponent',
				resolve: {
					filter: (todoFiltersConstant) => todoFiltersConstant.lastWeek
				}
			})
			.state('todo.lastMonth', {
				url: 'lastMonth',
				component: 'todoContainerComponent',
				resolve: {
					filter: (todoFiltersConstant) => todoFiltersConstant.lastMonth
				}
			})
			.state('todo.view', {
				url: 'view/{todoId:int}',
				component: 'todoViewComponent',
			})
			.state('todo.new', {
				url: 'new',
				component: 'todoNewComponent'
			})
			.state('todo.edit', {
				url: 'edit/{todoId:int}',
				component: 'todoEditComponent'
			});
	});
