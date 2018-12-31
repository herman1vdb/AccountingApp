using AccountingApp.API.Dtos;
using AccountingApp.API.Models;
using AutoMapper;

namespace AccountingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Account, AccountForListDto>();
            CreateMap<Account, AccountForDetailedDto>();
        }
        
    }
}