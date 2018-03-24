require('./pagination.css');

angular.module('app')
	.component('paginationComponent', {
		controller: pagination,
		template: require('./pagination.html'),
		bindings: {
			currentPage: '<',
			itemsPerPage: '<',
			totalCount: '<',
			onPageChange: '&',
		}
	});

function pagination() {
	const self = this;

	self.$onChanges = () => {
		self.showPagination = self.totalCount > self.itemsPerPage;

		const pagesCount = Math.ceil(self.totalCount / self.itemsPerPage);
		self.showPrev = self.currentPage > 1;
		self.showNext = self.currentPage < pagesCount;

		const navPagesCount = 5;
		const from = Math.max(1, self.currentPage - Math.floor(navPagesCount / 2));
		const to = Math.min(pagesCount, self.currentPage + Math.floor(navPagesCount / 2));

		self.pages = Array.from(new Array(to - from + 1), (x, i) => i + 1);
	};

	self.prev = () => {
		self.onPageChange({
			$event: {
				pagination: {
					currentPage: self.currentPage - 1,
				}
			}
		});
	}

	self.next = () => {
		self.onPageChange({
			$event: {
				pagination: {
					currentPage: self.currentPage + 1,
				}
			}
		});
	}

	self.gotoPage = currentPage => {
		self.onPageChange({
			$event: {
				pagination: {
					currentPage
				}
			}
		});
	}
}