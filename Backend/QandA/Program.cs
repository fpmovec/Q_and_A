using DbUp;
using QandA.Data;

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
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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


app.UseAuthorization();

app.MapControllers();

app.Run();
