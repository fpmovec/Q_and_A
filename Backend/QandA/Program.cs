using DbUp;
using QandA.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using QandA.Authorization;

var builder = WebApplication.CreateBuilder(args);
var connectionString = ConfigurationExtensions.GetConnectionString(builder.Configuration, "DefaultConnection");

EnsureDatabase.For.SqlDatabase(connectionString);

var upgrader = DeployChanges.To
    .SqlDatabase(connectionString, null)
    .WithScriptsEmbeddedInAssembly(
    System.Reflection.Assembly.GetExecutingAssembly())
    .WithTransaction()
    .Build();

if (upgrader.IsUpgradeRequired())
{
    upgrader.PerformUpgrade();
}
// Add services to the container.

builder.Services.AddScoped<IDataRepository, DataRepository>();
builder.Services.AddControllers();
builder.Services.AddMemoryCache();
builder.Services.AddSingleton<IQuestionCache, QuestionCache>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    //options.Authority = builder.Configuration.Get["Auth0:Authority"];
    options.Authority = "https://dev-v4jqb57mv0ngbs43.us.auth0.com/";
    options.Audience = "https://qanda";
});
builder.Services.AddHttpClient();
builder.Services.AddAuthorization(options => 
     options.AddPolicy("MustBeQuestionAuthor", policy => 
     policy.Requirements
     .Add(new MustBeQuestionAuthorRequirement())));
builder.Services.AddScoped<IAuthorizationHandler, MustBeQuestionAuthorHandler>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options => 
options.AddPolicy("CorsPolicy", builder => 
builder.AllowAnyMethod()
       .AllowAnyHeader()
       .WithOrigins("http://localhost:3000")
       .WithOrigins("https://resttesttest.com")
));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
   app.UseHttpsRedirection();
}

app.UseRouting();
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
