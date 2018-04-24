using System.Collections.Generic;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using SampleBackend.Web.Models;
using SampleBackend.Web.Services;

namespace SampleBackend.Web.Controllers
{
    [Route("api")]
    public class ValuesController : Controller
    {
        private readonly IArticlesDataService _articlesDataService;
        private readonly ICommentsDataService _commentsDataService;

        public ValuesController(IArticlesDataService articlesDataService, ICommentsDataService commentsDataService)
        {
            _articlesDataService = articlesDataService;
            _commentsDataService = commentsDataService;
        }

        // GET api/articles
        [HttpGet("articles")]
        public IEnumerable<Article> GetArticles()
        {
            return _articlesDataService.GetArticles();
        }

        // GET api/articles/id
        [HttpGet("articles/{id}")]
        public Article GetArticles(string id)
        {
            return _articlesDataService.GetArticle(id);
        }

        // PUT api/articles/update-rating/id
        [HttpPut("articles/update-rating/{id}")]
        public IActionResult UpdateRating(string id, [FromBody] bool isIncrease)
        {
            _articlesDataService.ChangeRating(id, isIncrease);

            return NoContent();
        }

        // GET api/comments/articleId
        [HttpGet("comments/{articleId}")]
        public IEnumerable<Comment> GetComments(string articleId)
        {
            Thread.Sleep(1000);
            
            return _commentsDataService.GetComments(articleId);
        }

        // POST api/comments/articleId
        [HttpPost("comments/{articleId}")]
        public IActionResult AddComment(string articleId, [FromBody] Comment comment)
        {
            var id = _commentsDataService.AddComment(articleId, comment);

            Thread.Sleep(1000);
            
            return new JsonResult(new {id});
        }
    }
}