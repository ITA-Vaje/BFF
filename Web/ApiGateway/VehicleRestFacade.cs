using Grpc.Core;
using Microsoft.AspNetCore.Mvc;               // For [ApiController] + attributes
using VehicleGrpc;                                // Generated from vehicle.proto

[ApiController]
public class VehicleRestFacade : ControllerBase
{
    private readonly VehicleService.VehicleServiceClient _client;

    public VehicleRestFacade(VehicleService.VehicleServiceClient client)
        => _client = client;

    // POST /api/vehicles
    [HttpPost("/api/vehicles")]
    public async Task<IActionResult> Add([FromBody] AddVehicleRequest req)
        => Ok(await _client.AddVehicleAsync(req));

    // GET /api/vehicles
    [HttpGet("/api/vehicles")]
    public async Task<IActionResult> List()
        => Ok(await _client.ListVehiclesAsync(new Google.Protobuf.WellKnownTypes.Empty()));

    // GET /api/vehicles/{id}
    [HttpGet("/api/vehicles/{id}")]
    public async Task<IActionResult> Get(string id)
        => Ok(await _client.GetVehicleAsync(new VehicleId { Id = id }));

    // PUT /api/vehicles/{id}
    [HttpPut("/api/vehicles/{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateVehicleRequest req)
    {
        req.Id = id;
        return Ok(await _client.UpdateVehicleAsync(req));
    }

    // DELETE /api/vehicles/{id}
    [HttpDelete("/api/vehicles/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        await _client.DeleteVehicleAsync(new VehicleId { Id = id });
        return NoContent();
    }
}
