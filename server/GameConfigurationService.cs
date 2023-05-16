using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System.IO;

public class GameConfigurationService
{
    private readonly IWebHostEnvironment _env;

    public GameConfigurationService(IWebHostEnvironment env)
    {
        _env = env;
    }

    public void ConfigureApp(IApplicationBuilder app)
    {
        // Configure static file serving for the Unity WebGL game
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider("E:/OMEGAme/server/wwwroot/uploads/136/index.html"),
            RequestPath = "/api/Game/play/136"
        });

        // Other configuration code...

        app.UseRouting();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();

            // Map the route for your Unity WebGL game
            endpoints.MapFallbackToFile("E:/OMEGAme/server/wwwroot/uploads/136/index.html");
        });
    }
}
