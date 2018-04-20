import React, {Component} from 'react';
import Filter from './filter/Filter';
import ArticlesList from './list/ArticlesList';
import ArticleDetails from './details';
import {getArticlesList} from "../../data-mocks/api";

class ArticlesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            selectedArticleId: null,
            filter: {
                filterText: '',
                showOnlyPopular: false
            }
        }
    }

    componentDidMount() {
        const articles = getArticlesList();
        setTimeout(() => this.setState({articles}), 1000);
        //this.setState({articles});
    }

    updateRating = (articleId, isIncrease) => {
        this.setState(state => {
            const article = state.articles.find(x => x.id === articleId);
            const newRating = article.rating + (isIncrease ? 1 : -1);
            const updatedArticle = Object.assign({}, article, {rating: newRating });

            return { articles: [ ...state.articles.filter(x => x.id !== articleId), updatedArticle ]}
        })
    };

    toggleShowOnlyPopularHandler = () => {
        this.setState(state => ({
            filter: Object.assign({}, state.filter, {showOnlyPopular: !state.filter.showOnlyPopular})
        }))
    };

    filterTextChangeHandler = (filterText) => {
        this.setState(state => ({
            filter: {...state.filter, filterText}
        }))
    };

    selectArticle = (id) => {
        this.setState({selectedArticleId: id});
    };

    showPopularFilter = (item) => item.rating > 0;
    searchFilter = (searchText) => (item) => item.title.includes(searchText);

    getFilteredItems() {
        const emptyFilterFunction = () => true;
        let isFilteringRequired = false;
        let popularFilter = emptyFilterFunction;
        let textFilter = emptyFilterFunction;
        if (this.state.filter.showOnlyPopular) {
            popularFilter = this.showPopularFilter;
            isFilteringRequired = true;
        }
        if (this.state.filter.filterText.length > 0) {
            textFilter = this.searchFilter(this.state.filter.filterText);
            isFilteringRequired = true;
        }

        if (isFilteringRequired) {
            return this.state.articles.filter(article => popularFilter(article) && textFilter(article));
        }

        return this.state.articles
    }

    render() {
        const filteredArticles = this.getFilteredItems();
        const selectedArticle = this.state.articles.find(x => x.id === this.state.selectedArticleId);

        return (
            <div className="d-flex flex-row w-100">
                <div className="p-2 w-50">
                    <Filter
                        filterText={this.state.filter.filterText}
                        showOnlyPopular={this.state.filter.showOnlyPopular}
                        toggleShowOnlyPopular={this.toggleShowOnlyPopularHandler}
                        onFilterTextChange={this.filterTextChangeHandler}
                    />
                    <ArticlesList
                        articles={filteredArticles}
                        selectedArticleId={this.state.selectedArticleId}
                        selectArticle={this.selectArticle}
                    />
                </div>
                <div className="p-2 w-50">
                    <ArticleDetails article={selectedArticle} updateRating={this.updateRating}/>
                </div>
            </div>
        )
    }
}

export default ArticlesScreen;