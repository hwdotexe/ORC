using System;
using System.Text.Json.Serialization;
using BackendCore;
using BackendCore.Automation;
using BackendCore.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BackendWebAPI
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddJsonOptions(jsonOptions =>
            {
                jsonOptions.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                jsonOptions.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            });

            services.AddHttpLogging(logging =>
            {
                logging.LoggingFields = HttpLoggingFields.RequestProperties;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            Console.WriteLine("Loading Application...");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseCors(configurePolicy =>
                {
                    configurePolicy.AllowAnyOrigin();
                    configurePolicy.AllowAnyMethod();
                    configurePolicy.AllowAnyHeader();
                });
            }
            else
            {
                app.UseHsts();
                app.UseHttpsRedirection();
                app.UseCors();
            }

            app.UseRouting();
            app.UseAuthorization();
            app.UseHttpLogging();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseDefaultFiles();

            app.UseStaticFiles(new StaticFileOptions
            {
                ServeUnknownFileTypes = true
            });

            ConfigureSinglePageApplication(app);

            // Run initial setup.
            var connectionString = Configuration.GetConnectionString("mongoDB");
            var databaseName = Configuration.GetValue<string>("Database");
            var captchaSettings = Configuration.GetSection("Captcha");
            var captchaAPIKey = captchaSettings.GetValue<string>("APIKey");
            var captchaProjectID = captchaSettings.GetValue<string>("ProjectID");
            var captchaSiteKey = captchaSettings.GetValue<string>("SiteKey");

            App.Init(connectionString, databaseName, env.IsDevelopment());
            CaptchaService.Init(captchaAPIKey, captchaProjectID, captchaSiteKey);

            // Start threads and tasks.
            _ = new PruneExpiredSessions();
        }

        public void ConfigureSinglePageApplication(IApplicationBuilder app)
        {
            // If the route contains '.' then assume a file to be served
            // and try to serve using StaticFiles.
            // If the route is a spa route then let it fall through to the
            // spa index file and have it resolved by the spa application
            // https://tattoocoder.com/kestrel-as-a-static-server-for-angular/
            app.MapWhen(context =>
            {
                var path = context.Request.Path.Value;
                return !path.Contains(".");
            },
            spa =>
            {
                spa.Use((context, next) =>
                {
                    context.Request.Path = new PathString("/index.html");
                    return next();
                });

                spa.UseStaticFiles(new StaticFileOptions
                {
                    ServeUnknownFileTypes = true
                });
            });
        }
    }
}
