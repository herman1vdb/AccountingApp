using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
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
    public class TransactionsController : ControllerBase
    {
        private readonly IAccountingRepository _repo;
        private readonly IMapper _mapper;
        public TransactionsController(IAccountingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetTransactions()
        {
            var transactions = await _repo.GetObjects<Transaction>();
             var accounts = await _repo.GetObjects<Account>();
             
            foreach(var transaction in transactions)
            {
                transaction.AccountDebit = accounts.FirstOrDefault(acc => acc.Id == transaction.AccountDebitId);
                transaction.AccountCredit = accounts.FirstOrDefault(acc => acc.Id == transaction.AccountCreditId);
            }                        
            
            //var transactionToReturn = _mapper.Map<IEnumerable<AccountForListDto>>(accounts);
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransaction(int id)
        {
            var transaction = await _repo.GetObject<Transaction>(id);

            //var accountToReturn = _mapper.Map<AccountForDetailedDto>(account);
            return Ok(transaction);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, TransactionForUpdateDto transactionForUpdateDto)
        {
            var transactionFromRepo = await _repo.GetObject<Transaction>(id);            

            _mapper.Map(transactionForUpdateDto, transactionFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating transaction {id} failed on save");
        }

         [HttpPost]
        public async Task<IActionResult> CreateTransaction(TransactionForCreationDto transactionForCreationDto)
        {
            var transaction = _mapper.Map<Transaction>(transactionForCreationDto);
            _repo.Add<Transaction>(transaction);
 
            if(await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not add transaction");
        }
        
    }
}