using AirMap.Factory;
using IAirMap.Model.BLL;
using IAirMap.ViewModel.In;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace AirMap.Models.BLL
{
    [DependencyInjection]
    public class OpenDataBLO : IOpenDataBLO
    {
        // HttpClient is intended to be instantiated once per application, rather than per-use. See Remarks.
        static readonly HttpClient client = new HttpClient();

        public OpenDataBLO()
        {

        }


        /// <summary>
        /// 取得空氣品質指標(AQI)
        /// OpenData:https://data.gov.tw/dataset/40448
        /// </summary>
        /// <returns></returns>
        public async Task<Out_OpenDataAQI> GetOpenData_AQIAsync()
        {
            Out_OpenDataAQI _out_OpenDataAQI = new Out_OpenDataAQI();
            _out_OpenDataAQI = null;
            // Call asynchronous network methods in a try/catch block to handle exceptions.
            try
            {
                HttpResponseMessage response = await client.GetAsync("https://data.epa.gov.tw/api/v1/aqx_p_432?limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&format=json");
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                _out_OpenDataAQI = JsonConvert.DeserializeObject<Out_OpenDataAQI>(responseBody);

            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
            }

            return _out_OpenDataAQI;
        }


    }
}
