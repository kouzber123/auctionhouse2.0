FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /app
EXPOSE 80

# copy all .csproj files and restore as disctinct layers. use of the same COPY command
# for every dockerfile in the project to take advantage of docker caching

COPY auctionHouse.sln auctionHouse.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/BiddingService/BiddingService.csproj src/BiddingService/BiddingService.csproj
COPY src/NotificationService/NotificationService.csproj src/NotificationService/NotificationService.csproj
# restore åackege deps

RUN dotnet restore auctionHouse.sln

# copy the app folders over
COPY src/IdentityService src/IdentityService

#docker space
WORKDIR /app/src/IdentityService
RUN dotnet publish -c Release -o /app/src/out


# build run time image

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/src/out . 
ENTRYPOINT [ "dotnet", "IdentityService.dll" ]