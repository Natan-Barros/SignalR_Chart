using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WebApplication.DataStorage;
using WebApplication.Hubs;
using WebApplication.TimerFeatures;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    public class ChartController : ControllerBase
    {
        private readonly IHubContext<ChartHub> _hub;
        
        public ChartController(IHubContext<ChartHub> hub)
        {
            _hub = hub;
        }
        
        public IActionResult Get(string user)
        {
            var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync(user, DataManager.GetData()));
            return Ok(new { Message = "Request Completed" });
        }
    }
}