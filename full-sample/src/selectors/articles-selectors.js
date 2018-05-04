export const getFilteredItems = (filter, articles) => {

    let isFilteringRequired = false;
    let popularFilter = emptyFilterFunction;
    let textFilter = emptyFilterFunction;
    if (filter.showOnlyPopular) {
        popularFilter = showPopularFilter;
        isFilteringRequired = true;
    }
    if (filter.filterText.length > 0) {
        textFilter = searchFilter(filter.filterText);
        isFilteringRequired = true;
    }

    if (isFilteringRequired) {
        return articles.filter(article => popularFilter(article) && textFilter(article));
    }

    return articles;
};

const showPopularFilter = (item) => item.rating > 0;
const searchFilter = (searchText) => (item) => item.title.includes(searchText);
const emptyFilterFunction = () => true;
