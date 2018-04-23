using System;

namespace SampleBackend.Web.Models
{
    public class Article
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string[] CommentsIds { get; set; }
        public int Rating { get; set; }
    }
}