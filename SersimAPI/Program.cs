using Microsoft.EntityFrameworkCore;
using SersimAPI.Data;
using FormDataApi.Services;

var builder = WebApplication.CreateBuilder(args);

// MSSQL bağlantısı
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services klasöründeki FormData.services fonksiyonu
builder.Services.AddSingleton<FormDataService>();

// CORS ayarlarını ekleyin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseHttpsRedirection();

// CORS middleware'ini ekleyin
app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();

app.Run();