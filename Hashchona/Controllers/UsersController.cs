using Hashchona.BL;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hashchona.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET: api/<UsersController>
        [HttpGet]
        [Route("ReadAllUsers")]
        public IEnumerable<User> Get()
        {
            User user = new User();
            return user.ReadAllUsers();
        }  
        
        [HttpGet]
        [Route("GetAllUserCategoies")]
        public IEnumerable<Category> GetAllUserCategories(int UserID)
        {
            User user = new User();
            return user.GetAllUserCategories(UserID);
        }

        [HttpGet]
        [Route("ReadAllApprovedUsersForCommunity")]
        public IEnumerable<User> ApprovedUsersForCommunity(int CommunityID)        {

            User user = new User();
            return user.ReadApprovedUsersForCommunity(CommunityID);
        }

        [HttpGet]
        [Route("ReadAllPendingUsers")]
        public IEnumerable<User> GetAllPendingUsers(int CommunityID)        {

            User user = new User();
            return user.ReadAllPendingUsersForCommunity(CommunityID);
        }

        [HttpGet]
        [Route("GetSpecificUser")]
        public UserDetails GetSpecificUser(int UserID)
        {
            UserDetails userDetails = new UserDetails();
            return userDetails.ReadUser(UserID);
        }


        //[HttpPost]
        //[Route("GetSpecificUsers")]
        //public List<UserDetails> GetSpecificUsers(JsonElement jsonElement)
        //{
        //    List<int> UserID = Convert.???

        //    UserDetails userDetails = new UserDetails();
        //    return userDetails.ReadUsers(UserID);
        //}
        
        [HttpPost]
        [Route("GetSpecificUsers")]
        public List<UserDetails> GetSpecificUsers(JsonElement jsonElement)
        {
            if (jsonElement.TryGetProperty("UserID", out JsonElement userIdElement))
            {
                // Deserialize the "UserID" property to a List<int>
                List<int> userIDs = JsonSerializer.Deserialize<List<int>>(userIdElement.GetRawText());

                UserDetails userDetails = new UserDetails();
                return userDetails.ReadUsers(userIDs);
            }
            else
            {
                // Handle the case where "UserID" property is not found
                throw new ArgumentException("The JSON does not contain a 'UserID' property.");
            }

           
        } 
        
        [HttpPost]
        [Route("GetAllUserCommunity")]
        public IEnumerable<Community> GetUserCommunity(JsonElement jsonElement)
        {
            int UserId = Convert.ToInt32(jsonElement.GetProperty("UserId").GetInt32());

            User user = new User();
            return user.ReadUsercommunity(UserId);
        }  
        
        [HttpPost]
        [Route("ManagersCommunity")]
        public IEnumerable<User> GetManagersCommunity(JsonElement jsonElement)
        {
            int CommunityID = Convert.ToInt32(jsonElement.GetProperty("CommunityID").GetInt32());

            User user = new User();
            return user.ReadManagersCommunity(CommunityID);
        }


        //POST api/<UsersController>
        [HttpPost]
        [Route("InsertNewUser")]
        public int Post(InsertUser insertUser)
        {           
            int numEffected = insertUser.userToRegister.Insert(insertUser.communityId);
            return numEffected;
        }

       

        //[HttpPost]
        //[Route("insertUserCategories")]
        //public int insertUserCategories(int UserID, List<int> categoriesID)
        //{
        //    User user = new User();            
        //    return user.insertUserCategories(UserID, categoriesID);
        //}

        [HttpPost]
        [Route("insertUserCategories")]
        public int insertUserCategories(JsonElement jsonElement)
        {
            // Extract UserID
            int UserID = jsonElement.GetProperty("UserID").GetInt32();

            // Extract categoriesID as a List<int>
            List<int> categoriesID = jsonElement.GetProperty("categoriesID")
                                                .EnumerateArray()
                                                .Select(category => category.GetInt32())
                                                .ToList();

            User user = new User();
            return user.insertUserCategories(UserID, categoriesID);
        }




        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            User resUser = new User();

            UserDetails Res = resUser.Login(userLogin.PhoneNum, userLogin.Password, userLogin.CommunityID);

            if (Res.User.UserId == 0)
            {
                return NotFound("The user is not registered in the system,try again!");               
            }            
            else
                return Ok(Res);

        }

        // PUT api/<UsersController>/5
        [HttpPut]
        [Route("UpdateUserDetails")]
        public IActionResult Put([FromBody]User user)
        {
            int res = user.UpdateUserDetails();
            if (res == 0)
            {
                return NotFound("Failed to update details,Try again!");
            }
            else
                return Ok(res);
        }  
        
      

       
        // PUT api/<UsersController>/5
        //[HttpPut] 
        //[Route("UpdateUserApproval")]
        //public IActionResult Put(int userId, int communityId, string approvalStatus)
        //{

        //    User user = new User();
        //    int res = user.UpdateUserApprovalStatus(userId, communityId, approvalStatus);
        //    if (res == 0)
        //    {
        //        return NotFound("Failed to update Status,Try again!");
        //    }
        //    else
        //        return Ok(res);
        //} 
        
        [HttpPut] 
        [Route("UpdateUserApproval")]
        public IActionResult Put(JsonElement jsonElement)
        {
            int userId = Convert.ToInt32(jsonElement.GetProperty("userId").GetInt32());
            int communityId = Convert.ToInt32(jsonElement.GetProperty("communityID").GetInt32());
            string approvalStatus = jsonElement.GetProperty("approvalStatus").GetString();

            User user = new User();

            int res = user.UpdateUserApprovalStatus(userId, communityId, approvalStatus);

            if (res == 0)
            {
                return NotFound("Failed to update Status,Try again!");
            }
            else
                return Ok(res);
        }

        // DELETE api/<UsersController>/5
        [HttpDelete]
        [Route("DeleteUserForGood")]
        public int Delete(JsonElement jsonElement)
        {
            string phoneNum = Convert.ToString(jsonElement.GetProperty("phoneNum").GetString());

            User user = new User();
            return user.DeleteForGood(phoneNum);
        } 
        
        // DELETE api/<UsersController>/5
        //[HttpDelete]
        //[Route("DeleteUserCategory")]
        //public int DeleteUserCategory(int UserID, int CategoryID)
        //{
        //    User user = new User();
        //    return user.DeleteUserCategory(UserID, CategoryID);
        //}

    
    }
}
