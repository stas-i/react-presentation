using SampleBackend.Web.Models;

namespace SampleBackend.Web.Services
{
    public interface IArticlesDataService
    {
        Article[] GetArticles();
        Article GetArticle(string articleId);
        void ChangeRating(string articleId, bool isIncrease);
    }
}