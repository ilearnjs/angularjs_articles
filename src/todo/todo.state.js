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
			.state('todo.active', {
				url: 'active',
				component: 'todoContainerComponent',
				resolve: {
					filter: (todoFiltersConstant) => todoFiltersConstant.active
				}
			})
			.state('todo.completed', {
				url: 'completed',
				component: 'todoContainerComponent',
				resolve: {
					filter: (todoFiltersConstant) => todoFiltersConstant.completed
				}
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
