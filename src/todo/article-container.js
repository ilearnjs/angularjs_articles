require('./article-container.css');

angular.module('app')
	.component('articleContainerComponent', {
		controller: articleContainer,
		template: require('./article-container.html'),
		bindings: {
			filter: '<'
		}
	});

function articleContainer($scope, articleStore, articleFiltersConstant) {
	const self = this;
	const subs = {};

	self.noData = true;
	self.allArticles = [];
	self.articleList = {};
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
		subs['articleList'] = articleStore.allArticles$
			.subscribe(articleList => {
				self.allArticles = articleList;
				self.noData = !articleList.length;
				if (!self.noData) {
					self.articleList = getArticleList(self.allArticles, self.filter, self.sortField, self.pagination);
				}
			});
	};

	self.$onDestroy = () => {
		subs['articleList'].unsubscribe();
	};

	self.deleteArticle = event => {
		articleStore.deleteArticle(event.id);
	};

	self.sort = event => {
		if (self.sortField.field === event.sortField.field) {
			self.sortField.direction *= -1;
		} else {
			self.sortField = event.sortField;
		}

		self.articleList = getArticleList(self.allArticles, self.filter, self.sortField, self.pagination);
	};

	self.changePage = event => {
		self.pagination = Object.assign(self.pagination, event.pagination);
		self.articleList = getArticleList(self.allArticles, self.filter, self.sortField, self.pagination);
	};

	function getArticleList(allArticles, filter, sortField, pagination) {
		let articleList = getFilteredArticleList(allArticles, filter);
		let totalCount = articleList.length;
		articleList = getSortedArticleList(articleList);
		articleList = getPageItems(articleList, pagination.currentPage, pagination.itemsPerPage);

		return {
			articleList,
			totalCount
		}
	}

	function getFilteredArticleList(articleList, filter) {
		let predicates = {
			[articleFiltersConstant.all]: (articleItem) => true,
			[articleFiltersConstant.today]: (articleItem) => articleItem.created > addDays(-1),
			[articleFiltersConstant.lastWeek]: (articleItem) => articleItem.created > addDays(-7),
			[articleFiltersConstant.lastMonth]: (articleItem) => articleItem.created > addMonth(-1),
		};

		return articleList.filter(predicates[filter]);
	}

	function getSortedArticleList(articleList, sortField) {
		const field = self.sortField.field;
		const direction = self.sortField.direction;

		return articleList.sort((a, b) => ((a[field] > b[field]) - 0.5) * direction); // ¯\_(ツ)_/¯
	}

	function getPageItems(articleList, currentPage, itemsPerPage) {
		if (articleList.length < currentPage * itemsPerPage) {
			currentPage = 1;
		}

		return articleList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
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