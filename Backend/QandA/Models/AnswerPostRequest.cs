using System.ComponentModel.DataAnnotations;

namespace QandA.Models
{
    public class AnswerPostRequest
    {
        [Required]
        public int? QuestionId { get; set; }
        [Required]
        public string? Content { get; set; }
    }
}
