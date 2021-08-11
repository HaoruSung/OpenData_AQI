using AirMap.Factory;
using IAirMap.Model.BCL;
using IAirMap.Model.BLL;
using IAirMap.ViewModel.In;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace AirMap.Models.BCL
{
    [DependencyInjection]
    public class OpenDataBCO : IOpenDataBCO
    {
        private IOpenDataBLO _iOpenDataBLO;

        public OpenDataBCO(
            IOpenDataBLO iOpenDataBLO
        )
        {
            _iOpenDataBLO = iOpenDataBLO;
        }

        /// <summary>
        /// 取得空氣品質指標(AQI)
        /// OpenData:https://data.gov.tw/dataset/40448
        /// </summary>
        /// <returns></returns>
        public async Task<Out_OpenDataAQI> GetOpenData_AQIAsync()
        {
            Out_OpenDataAQI _out_OpenDataAQI = new Out_OpenDataAQI();
            _out_OpenDataAQI = await _iOpenDataBLO.GetOpenData_AQIAsync();
            return _out_OpenDataAQI;
        }
    }
}
