using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Services
{
    public class AuctionServiceHttpClient
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        public AuctionServiceHttpClient(HttpClient httpClient, IConfiguration configuration)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }

        public async Task<List<Item>> GetItemsForSearchDB() {

            var lastUpdated = await DB.Find<Item, string>()
            .Sort(x=> x.Descending(x => x.UpdateAt))
            .Project(x => x.UpdateAt.ToString())
            .ExecuteFirstAsync();


            return await _httpClient.GetFromJsonAsync<List<Item>>(_configuration["AuctionServiceUrl"]+"/api/auctions?date="+lastUpdated);

        }
    }



}