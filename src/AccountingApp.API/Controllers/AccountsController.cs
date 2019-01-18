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
            var accounts = await _repo.GetObjects<Account>();
            var accountToReturn = _mapper.Map<IEnumerable<AccountForListDto>>(accounts);
            return Ok(accountToReturn);
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
            //var account = _mapper.Map<Account>(accountForCreationDto);
            var account = new Account();
            account.Description = "TESTING";
            account.Budget = 500;
            account.TypeId = 3;

            _repo.Add<Account>(account);

            if(await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not add account");
        }
    }
}