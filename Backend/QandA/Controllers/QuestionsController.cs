using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text.Json;
using QandA.Data;
using QandA.Models;

namespace QandA.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;
        private readonly IQuestionCache _questionCache;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string? _auth0UserInfo;

        public QuestionsController(IDataRepository dataRepository,
            IQuestionCache questionCache,
            IHttpClientFactory httpClientFactory)
        {
            _dataRepository = dataRepository;
            _questionCache = questionCache;
            _httpClientFactory = httpClientFactory;
            _auth0UserInfo = $"https://dev-v4jqb57mv0ngbs43.us.auth0.com/userinfo";
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<QuestionGetManyResponse>> GetQuestions(string? search, bool includeAnswers, int page = 1, int pageSize = 20)
        {

            if (string.IsNullOrEmpty(search))
            {
                if (includeAnswers)
                {
                    return await _dataRepository.GetQuestionsWithAnswers();
                }
                else
                {
                    return await _dataRepository.GetQuestions();
                }
                
            }
            else
            {
                return await _dataRepository.GetQuestionsBySearchWithPaging(
                    search,
                    page,
                    pageSize
                    );
            }
        }

        [AllowAnonymous]
        [HttpGet("unanswered")]
        public async Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestions()
        {
            return await _dataRepository.GetUnansweredQuestionsAsync();
        }

        [AllowAnonymous]
        [HttpGet("{questionId}")]
        public async Task<ActionResult<QuestionGetSingleResponse>> GetQuestion(int questionId)
        {
            var question = _questionCache.Get(questionId);
            if (question == null)
            {
                   question = await _dataRepository.GetQuestion(questionId);
                if (question == null)
                {
                   return NotFound();
                }
                _questionCache.Set(question);
            }
            
            return Ok(question);
        }


        [HttpPost]
        public async Task<ActionResult<QuestionGetSingleResponse>> PostQuestion(QuestionPostRequest questionPostRequest)
        {
            var savedQuestion = await _dataRepository.PostQuestion(new QuestionPostFullRequest
            {
                Title = questionPostRequest.Title,
                Content = questionPostRequest.Content,
                UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value,
                UserName = await GetUserName(),
                Created = DateTime.UtcNow
            });

            return CreatedAtAction(nameof(GetQuestion),
                new { questionId = savedQuestion.QuestionId },
                savedQuestion);
        }

        [Authorize(Policy = "MustBeQuestionAuthor")]
        [HttpPut("{questionId}")]
        public async Task<ActionResult<QuestionGetSingleResponse>> PutQuestion(int questionId, QuestionPutRequest questionPutRequest)
        {
            var question = await _dataRepository.GetQuestion(questionId);

            if (question == null)
                return NotFound();
            questionPutRequest.Title = string.IsNullOrEmpty(questionPutRequest.Title)
                ? question.Title : questionPutRequest.Title;
            questionPutRequest.Content = string.IsNullOrEmpty(questionPutRequest.Content)
                ? question.Content : questionPutRequest.Content;

            var savedQuestion = await _dataRepository.PutQuestion(questionId, questionPutRequest);

            _questionCache.Remove(savedQuestion.QuestionId);

            return Ok(savedQuestion);
        }

        [Authorize(Policy = "MustBeQuestionAuthor")]
        [HttpDelete("{questionId}")]
        public async Task<ActionResult> DeleteQuestion(int questionId)
        {
            var question = await _dataRepository.GetQuestion(questionId);
            if (question == null)
                return NotFound();

           await _dataRepository.DeleteQuestion(questionId);
            _questionCache.Remove(questionId);
            return NoContent();
        }


        [HttpPost("{questionId}/answer")]
        public async Task<ActionResult<AnswerGetResponse>> PostAnswer(int questionId, AnswerPostRequest answerPostRequest)
        {
            var questionExists = await _dataRepository.QuestionExists(answerPostRequest.QuestionId.Value);
            if (!questionExists) 
                return NotFound();

            var savedAnswer = await _dataRepository.PostAnswer(new AnswerPostFullRequest
            {
                QuestionId = answerPostRequest.QuestionId.Value,
                Content = answerPostRequest.Content,
                UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value,
                UserName = await GetUserName(),
                Created = DateTime.UtcNow
            });

            _questionCache.Remove(answerPostRequest.QuestionId.Value);

            return Ok(savedAnswer);
        }

        private async Task<string?> GetUserName()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, _auth0UserInfo);
            request.Headers.Add("Authorization", Request.Headers["Authorization"].First());

            var client = _httpClientFactory.CreateClient();
            var response = await client.SendAsync(request);

            if (!response.IsSuccessStatusCode)
                return "";

            var jsonContent = await response.Content.ReadAsStringAsync();
            var user = JsonSerializer.Deserialize<User>(jsonContent, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return user.Name;
        }
    }
}
