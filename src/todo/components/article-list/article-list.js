require('./article-list.css');

angular.module('app')
	.component('articleListComponent', {
		controller: articleList,
		template: require('./article-list.html'),
		bindings: {
			list: '<',
			onDelete: '&',
			onSort: '&',
		}
	});

function articleList() {
	const self = this;

	self.deleteArticle = event => {
		self.onDelete({
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