using Microsoft.AspNetCore.Authorization;
using QandA.Data;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace QandA.Authorization
{
    public class MustBeQuestionAuthorHandler : AuthorizationHandler<MustBeQuestionAuthorRequirement>
    {
        private readonly IDataRepository _repository;
        private readonly IHttpContextAccessor _contextAccessor;

        public MustBeQuestionAuthorHandler(IDataRepository dataRepository, IHttpContextAccessor httpContextAccessor)
        {
            _contextAccessor = httpContextAccessor;
            _repository = dataRepository;
        }

        protected async override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                             MustBeQuestionAuthorRequirement requirement)
        {
            if (!context.User.Identity.IsAuthenticated)
            {
                context.Fail();
                return;
            }

            var questionId = _contextAccessor.HttpContext.Request.RouteValues["questionid"];
            int questionIdAsInt = Convert.ToInt32(questionId);

            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var question = await _repository.GetQuestion(questionIdAsInt); 
            if (question == null)
            {
                context.Succeed(requirement);
                return;
            }

            if (question.UserId != questionId)
            {
                context.Fail();
                return;
            }

            context.Succeed(requirement);
        }
    }
}
