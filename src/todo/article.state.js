angular.module('app')
	.config($stateProvider => {
		$stateProvider
			.state('article', {
				abstract: true,
				url: '/',
				template: '<ui-view />'
			})
			.state('article.all', {
				url: '',
				component: 'articleContainerComponent',
				resolve: {
					filter: (articleFiltersConstant) => articleFiltersConstant.all
				}
			})
			.state('article.today', {
				url: 'today',
				component: 'articleContainerComponent',
				resolve: {
					filter: (articleFiltersConstant) => articleFiltersConstant.today
				}
			})
			.state('article.lastWeek', {
				url: 'lastWeek',
				component: 'articleContainerComponent',
				resolve: {
					filter: (articleFiltersConstant) => articleFiltersConstant.lastWeek
				}
			})
			.state('article.lastMonth', {
				url: 'lastMonth',
				component: 'articleContainerComponent',
				resolve: {
					filter: (articleFiltersConstant) => articleFiltersConstant.lastMonth
				}
			})
			.state('article.view', {
				url: 'view/{articleId:int}',
				component: 'articleViewComponent',
			})
			.state('article.new', {
				url: 'new',
				component: 'articleNewComponent'
			})
			.state('article.edit', {
				url: 'edit/{articleId:int}',
				component: 'articleEditComponent'
			});
	});
