using System;
using System.Collections.Generic;
using System.Linq;
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
    public class AccountsController : ControllerBase
    {
        private readonly IAccountingRepository _repo;
        private readonly IMapper _mapper;
        public AccountsController(IAccountingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetAccounts()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;            
            var accounts = await _repo.GetObjects<Account>();
            accounts = accounts.Where(a => a.UserId.ToString() == userId);
            var accountToReturn = _mapper.Map<IEnumerable<AccountForListDto>>(accounts);            
            return Ok(accountToReturn);
        }

        [HttpGet("types")]         
        public async Task<IActionResult> GetTypes()
        {
            var types = await _repo.GetObjects<AccountingApp.API.Models.Type>();            
            return Ok(types);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccount(int id)
        {
            var account = await _repo.GetObject<Account>(id);

            var accountToReturn = _mapper.Map<AccountForDetailedDto>(account);
            return Ok(accountToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount(int id, AccountForUpdateDto accountForUpdateDto)
        {            
            var accountFromRepo = await _repo.GetObject<Account>(id);

            _mapper.Map(accountForUpdateDto, accountFromRepo);            

            if (await _repo.SaveAll())            
                return NoContent();

            throw new Exception($"Updating account {id} failed on save");
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccount(AccountForCreationDto accountForCreationDto)
        {
            var account = _mapper.Map<Account>(accountForCreationDto);            
            int uId = 0;
            Int32.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out uId);
            
            if(uId!=0)
            {
                account.UserId = uId;
                _repo.Add<Account>(account);
                
                if(await _repo.SaveAll())
                {
                    return Ok();
                }
            }
            return BadRequest("Could not add account");
        }
    }
}