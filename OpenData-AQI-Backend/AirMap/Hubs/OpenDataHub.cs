using IAirMap.Enum;
using IAirMap.Model.BCL;
using IAirMap.ViewModel.In;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;

namespace AirMap.Hubs
{
    // 這些方法是用來接收 Client 發出的 Message
    public class OpenDataHub : Hub<IClient>
    {
        private readonly IHubContext<OpenDataHub> _hubContext;
        private IOpenDataBCO _iOpenDataBCO;

        public OpenDataHub(
            IHubContext<OpenDataHub> hubContext,
            IOpenDataBCO iOpenDataBCO
        )
        {
            _hubContext = hubContext;
            _iOpenDataBCO = iOpenDataBCO;
        }


        /// <summary>
        /// 任務:每秒傳送資訊給client
        /// </summary>
        /// <returns></returns>
        public void GetAQIData()
        {
            var aTimer = new Timer(1200000);
            aTimer.Elapsed += GetOpenData;
            aTimer.Interval = 3000;
            aTimer.Enabled = true;

        }


        public async void GetOpenData(object sender, System.Timers.ElapsedEventArgs e)
        {
            Out_OpenDataAQI out_OpenDataAQI = await _iOpenDataBCO.GetOpenData_AQIAsync();
            await _hubContext.Clients.All.SendAsync(E_SignalRHub.FeedOpenData, out_OpenDataAQI);
            //await Clients.All.FeedOpenData(out_OpenDataAQI);
        }



    }
}
