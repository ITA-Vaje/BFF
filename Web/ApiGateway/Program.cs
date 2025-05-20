// using Microsoft.AspNetCore.Grpc.JsonTranscoding;
// using Microsoft.AspNetCore.Builder;
// using Yarp.ReverseProxy;
// using VehicleGrpc;                

// var builder = WebApplication.CreateBuilder(args);

// // --- YARP for REST micro‑services ---
// builder.Services.AddReverseProxy()
//                 .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

// // --- gRPC client for VehicleService ---
// builder.Services
//        .AddGrpcClient<VehicleService.VehicleServiceClient>(o =>
//            o.Address = new Uri("grpc://localhost:50051"));

// // --- Enable JSON‑transcoding so REST calls can hit the gRPC façade ---
// builder.Services.AddGrpc();

// builder.Services.AddCors(o => o.AddPolicy("AllowAll", builder =>
// {
//     builder.AllowAnyOrigin()
//             .AllowAnyMethod()
//             .AllowAnyHeader()
//             .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
// }));

// var app = builder.Build();

// app.UseRouting();
// app.UseGrpcWeb();
// app.UseCors();

// app.MapControllers();
// builder.Services.AddControllers();
// app.MapReverseProxy();                     

// app.Run();

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using VehicleGrpc;

var builder = WebApplication.CreateBuilder(args);

// 🔧 Add this to support [ApiController] and route mapping
builder.Services.AddControllers();

builder.Services.AddReverseProxy()
                .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

// Register the gRPC client
builder.Services
    .AddGrpcClient<VehicleService.VehicleServiceClient>(o =>
        o.Address = new Uri("http://localhost:50051")); // grpc:// is not supported in HTTP clients

// Add CORS policy
builder.Services.AddCors(o => o.AddPolicy("AllowAll", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader()
           .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
}));

var app = builder.Build();

app.UseRouting();
app.UseGrpcWeb();
app.UseCors();

// 🧠 This maps your controller-based REST facade
app.MapControllers();

app.MapGet("/", () => "This gRPC gateway is up and running.");
app.MapReverseProxy();      

app.Run();

