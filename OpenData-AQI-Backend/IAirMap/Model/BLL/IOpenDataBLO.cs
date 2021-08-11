using IAirMap.ViewModel.In;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IAirMap.Model.BLL
{
    public interface IOpenDataBLO
    {
         Task<Out_OpenDataAQI> GetOpenData_AQIAsync();
    }
}
