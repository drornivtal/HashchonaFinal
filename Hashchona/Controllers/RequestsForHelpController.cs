using Hashchona.BL;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hashchona.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsForHelpController : ControllerBase
    {

        // GET api/<AssimentsController>/5
        [HttpGet]
        [Route("GetSpecificReq")]
        public object GetSpecificReq(int ReqID)
        {
            RequestForHelp assistance = new RequestForHelp();

            return assistance.GetSpecificReq(ReqID);
        }  
        
        // GET api/<AssimentsController>/5
        [HttpGet]
        [Route("GetAllTheReqThatUserHelped")]
        public List<object> GetAllTheReqThatUserHelped(int UserID)
        {
            RequestForHelp assistance = new RequestForHelp();

            return assistance.GetAllTheReqThatUserHelped(UserID);
        } 
        
        [HttpGet]
        [Route("GetAllNeedToRate")]
        public List<object> GetAllNeedToRate(int UserID, int CommunityID)
        {
            RequestForHelp assistance = new RequestForHelp();

            return assistance.GetAllNeedToRate(UserID, CommunityID);
        }

        // GET: api/<AssimentsController>
        [HttpPost]
        [Route("ActiveReqByCommunity")]
        public IEnumerable<object> GetAllActiveReqInCommunity(JsonElement jsonElement)
        {
            int communityID = Convert.ToInt32(jsonElement.GetProperty("CommunityID").GetInt32());
            RequestForHelp assistance = new RequestForHelp();

            return assistance.GetAllActiveReqInCommunity(communityID);
        }    
        
        // GET: api/<AssimentsController>
        [HttpPost]
        [Route("ActiveReqByCommunityByUser")]
        public IEnumerable<object> GetActiveRequestsByUser(JsonElement jsonElement)
        {
            int communityID = Convert.ToInt32(jsonElement.GetProperty("CommunityID").GetInt32());
            int UserID = Convert.ToInt32(jsonElement.GetProperty("UserID").GetInt32());
            RequestForHelp assistance = new RequestForHelp();

            return assistance.GetActiveRequestsByUser(communityID, UserID);
        }
        
        // GET: api/<AssimentsController>
        [HttpGet]
        [Route("GetActiveRequestsByUserInProgress")]
        public IEnumerable<object> GetActiveRequestsByUserInProgress(int communityID, int UserID)
        {
           
            RequestForHelp assistance = new RequestForHelp();

            return assistance.GetActiveRequestsByUserInProgress(communityID, UserID);
        }

        // GET api/<AssimentsController>/5
        [HttpGet]
        [Route("GetAllCategories")]
        public IEnumerable<Category> GetAllCategories()
        {
            RequestForHelp assistance = new RequestForHelp();

            return assistance.GetAllCategories();
        } 
        
        
        [HttpGet]
        [Route("GetAllUserRequests")]
        public IEnumerable<RequestForHelp> GetAllUserRequests(int UserID)
        {
            RequestForHelp assistance = new RequestForHelp();

            return assistance.GetAllUserRequests(UserID);
        } 
        
        [HttpGet]
        [Route("GetAllUserRequestsByCommunity")]
        public IEnumerable<RequestForHelp> GetAllUserRequestsByCommunity(int UserID, int CommunityID)
        {
            RequestForHelp assistance = new RequestForHelp();

            return assistance.GetAllUserRequestsByCommunity(UserID, CommunityID);
        }
          
        // GET api/<AssimentsController>/5
        //[HttpGet]
        //[Route("UserOffersToAssist")]
        //public IEnumerable<object> GetUserOffersToAssist(int UserID, int communityID)
        //{
        //    RequestForHelp assistance = new RequestForHelp();

        //    return assistance.GetUserOffersToAssist(UserID, communityID);
        //} 
        
        [HttpGet]
        [Route("GetAllRequests")]
        public IEnumerable<RequestForHelp> GetAllRequests()
        {
            RequestForHelp assistance = new RequestForHelp();

            return assistance.GetAllRequests();
        }


        //// GET api/<AssimentsController>/5
        //[HttpGet]
        //[Route("ActiveCategoryReq")]
        //public IEnumerable<RequestForHelp> GetAllActiveCategoryReq(int CategoryID, int CommunityID)
        //{

        //    RequestForHelp assistance = new RequestForHelp();
        //    return assistance.readAllActiveCategoryReq(CategoryID, CommunityID);
        //}
        
        // GET api/<AssimentsController>/5
        [HttpPost]
        [Route("ActiveCategoryReq")]
        public IEnumerable<RequestForHelp> GetAllActiveCategoryReq(JsonElement jsonElement)
        {
            int CategoryID = Convert.ToInt32(jsonElement.GetProperty("CategoryID").GetInt32());
            int CommunityID = Convert.ToInt32(jsonElement.GetProperty("CommunityID").GetInt32());
            RequestForHelp assistance = new RequestForHelp();
            return assistance.readAllActiveCategoryReq(CategoryID, CommunityID);
        } 
        
        
        [HttpPost]
        [Route("PostRankingForUser")]
        public int PostRankingForUser(JsonElement jsonElement)
        {
            int UserID = Convert.ToInt32(jsonElement.GetProperty("UserID").GetInt32());
            int ReqID = Convert.ToInt32(jsonElement.GetProperty("ReqID").GetInt32());
         //   float Ranking = Convert.(jsonElement.GetProperty("Ranking").GetInt32());
            float Ranking = jsonElement.GetProperty("Ranking").GetSingle();
            string Description = jsonElement.GetProperty("Description").ToString();

            RequestForHelp assistance = new RequestForHelp();
            return assistance.PostRankingForUser(UserID, ReqID, Ranking, Description);
        }


        // GET api/<AssimentsController>/5
        [HttpGet]
        [Route("AllWantToAssistPending")]
        public IEnumerable<User> GetAllWantToAssistPending(int reqID)
        {
            RequestForHelp assistance = new RequestForHelp();
            return assistance.GetAllWantToAssistPending(reqID);
        }  
        // GET api/<AssimentsController>/5
        [HttpGet]
        [Route("AllWantToAssistAccepted")]
        public IEnumerable<User> AllWantToAssistAccepted(int reqID)
        {
            RequestForHelp assistance = new RequestForHelp();
            return assistance.AllWantToAssistAccepted(reqID);
        }

        // POST api/<AssimentsController>
        [HttpPost]
        [Route("postNewReq")]
        public List<object> PostNewReq([FromBody] RequestForHelp request)
        {

            return request.InsertNewReq(request);
        }
        
        
        // POST api/<AssimentsController>
        [HttpPost]
        [Route("usersWantToAssist")]
        public int PostNewAssistUser([FromBody] UsersWantToAssist usersWantToAssist)
        {
            return usersWantToAssist.InsertNewUserWantToAssist(usersWantToAssist.UserID, usersWantToAssist.RequestForHelpID);
        }

        // PUT api/<AssimentsController>/5
        [HttpPut]
        [Route("updateUserStatusToReq")]
        public IActionResult PutUserStatusToReq(StatusUpdateToReq statusUpdateToReq)
        {
            int res = statusUpdateToReq.UpdateUserStatusToReq(statusUpdateToReq.UserID, statusUpdateToReq.RequestForHelpID, statusUpdateToReq.StatusApproval);
            if (res == 0)
            {
                return NotFound("Failed to update details,Try again!");
            }
            else
                return Ok(res);
        }

          // PUT api/<AssimentsController>/5
        [HttpPut]
        [Route("updateReqDeatails")]
        public IActionResult PutReq(RequestForHelp request)
        {
            int res = request.UpdateRequest();

            if (res == 0)
            {
                return NotFound("Failed to update details,Try again!");
            }
            else
                return Ok(res);
        }

        // DELETE api/<AssimentsController>/5
        [HttpDelete]
        [Route("DeleteReq")]
        public int DeleteReq(int requestID)
        {
            RequestForHelp request = new RequestForHelp();

            return request.DeleteReq(requestID);
        }
    }
}
