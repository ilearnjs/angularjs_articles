require('./article-item.css');

angular.module('app')
	.component('articleItemComponent', {
		controller: articleItem,
		template: require('./article-item.html'),
		bindings: {
			item: '<',
			completed: '<',
			onDelete: '&',
			onUpdate: '&',
		}
	});

function articleItem() {
	const self = this;

	self.deleteArticle = () => {
		self.onDelete({
			$event: {
				id: self.item.id
			}
		});
	};
}