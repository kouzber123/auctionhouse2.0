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
    public class AuctionDeletedConsumer : IConsumer<AuctionDeleted>
    {
        private readonly IMapper _mapper;
        public AuctionDeletedConsumer(IMapper mapper)
        {
           _mapper = mapper;
        }

        public async Task Consume(ConsumeContext<AuctionDeleted> context)
        {
            // create item mapper
       
            // consume
           Console.WriteLine($"Consuming auction deleted for Item ID: {context.Message.Id}");

            // Map the AuctionDeleted message to an Item
    
            // Delete the item by ID
           var result = await DB.DeleteAsync<Item>(context.Message.Id);
           
           if(!result.IsAcknowledged) throw new MessageException(typeof(AuctionCreated), " Problem deleting auction");



        }
    }
}