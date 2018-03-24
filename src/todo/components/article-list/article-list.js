require('./article-list.css');

angular.module('app')
	.component('articleListComponent', {
		controller: articleList,
		template: require('./article-list.html'),
		bindings: {
			list: '<',
			sortField: '<',
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

	self.getClasses = (field) => {
		if (self.sortField.field === field) {
			const direction = self.sortField.direction > 0
				? 'acs'
				: 'desc';

			return `active ${direction}`;
		}
	}
}