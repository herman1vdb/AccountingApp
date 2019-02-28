using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AccountingApp.API.Data;
using AccountingApp.API.Dtos;
using AccountingApp.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AccountingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TypesController : ControllerBase
    {
        private readonly IAccountingRepository _repo;
        private readonly IMapper _mapper;
        public TypesController(IAccountingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }
       
        [HttpGet]         
        public async Task<IActionResult> GetTypes()
        {
            var types = await _repo.GetObjects<AccountingApp.API.Models.Type>();            
            return Ok(types);
        }       
    }
}