using SampleBackend.Web.Models;

namespace SampleBackend.Web.Services
{
    public interface ICommentsDataService
    {
        Comment[] GetComments(string articleId);
        string AddComment(string articleId, Comment comment);
    }
}