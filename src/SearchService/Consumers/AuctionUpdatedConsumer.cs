using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers
{
    public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
    {
        private readonly IMapper _mapper;
        public AuctionUpdatedConsumer(IMapper mapper)
        {
            _mapper = mapper;
            
        }

        public async Task Consume(ConsumeContext<AuctionUpdated> context)
        {   
            // shape data 
            var item = _mapper.Map<Item>(context.Message);
            Console.WriteLine($"Consuming an update for Item ID: {item.ID}");
            //we need to consume from mq
              var result = await DB.Update<Item>()
                 .Match(a => a.ID == context.Message.Id)
                 .ModifyOnly(i => new 
                 { 
                 i.Color, 
                 i.Mileage, 
                 i.Model, 
                 i.Year, 
                 i.Make  
                 }, item)
                 .ExecuteAsync();

            if(!result.IsAcknowledged) throw new MessageException(typeof(AuctionUpdated), " Problem updating mongodb");
        }
    }
}