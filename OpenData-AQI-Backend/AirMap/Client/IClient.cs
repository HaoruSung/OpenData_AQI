using IAirMap.ViewModel.In;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirMap.Hubs
{
    // 這些方法是用來發出 Message 給 Client
    public interface IClient
    {

        Task FeedOpenData(Out_OpenDataAQI message);
        

    }
}
