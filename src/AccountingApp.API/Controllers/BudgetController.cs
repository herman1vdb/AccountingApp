using System;
using System.Linq;
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
    public class BudgetController : ControllerBase
    {
        private readonly IAccountingRepository _repo;
        private readonly IMapper _mapper;
        public BudgetController(IAccountingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetBudget()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;            
            var accounts = await _repo.GetObjects<Account>();
            accounts = accounts.Where(a => a.UserId.ToString() == userId);
            var transactions = await _repo.GetObjects<Transaction>();
            transactions = transactions.Where(a => a.UserId.ToString() == userId);
            List<BudgetForDisplayDto> budgetToReturn = new List<BudgetForDisplayDto>();
            foreach(var account in accounts)
            {
                BudgetForDisplayDto budgetForDisplay = new BudgetForDisplayDto();
                budgetForDisplay.Account = account;
                budgetForDisplay.Transactions = transactions
                    .Where(t => t.AccountDebitId == budgetForDisplay.Account.Id || t.AccountCreditId == budgetForDisplay.Account.Id);
                budgetToReturn.Add(budgetForDisplay);
            }                        
            return Ok(budgetToReturn);
        }
    }
}