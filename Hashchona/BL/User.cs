using Hashchona.DAL;

namespace Hashchona.BL
{
    public class User
    {
        int userId;
        string firstName;
        string lastName;
        string phoneNum;
        string password;
        char gender;
        string city;
        string street;
        int homeNum;
        DateTime birthDate;
        string description;        
        string profilePicture;
        int score;
        double rating;
        char isActive;


        public int UserId { get => userId; set => userId = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string PhoneNum { get => phoneNum; set => phoneNum = value; }
        public string Password { get => password; set => password = value; }
        public char Gender { get => gender; set => gender = value; }
        public string City { get => city; set => city = value; }
        public string Street { get => street; set => street = value; }
        public int HomeNum { get => homeNum; set => homeNum = value; }
        public DateTime BirthDate { get => birthDate; set => birthDate = value; }
        public string Description { get => description; set => description = value; }
        public int Score { get => score; set => score = value; }
        public double Rating { get => rating; set => rating = value; }
        public char IsActive { get => isActive; set => isActive = value; }
        public string ProfilePicture { get => profilePicture; set => profilePicture = value; }

        //  public List<Community> CommuniyList { get => communiyList; set => communiyList = value; }

        public User() { }

        public User(int userId, string firstName, string lastName, string phoneNum, string password, char gender, string city, string street,
                    int homeNum, DateTime birthDate, string description, int score, double rating, char isActive, string profilePicture)
        {
            UserId = userId;
            FirstName = firstName;
            LastName = lastName;
            PhoneNum = phoneNum;
            Password = password;
            Gender = gender;
            City = city;
            Street = street;
            HomeNum = homeNum;
            BirthDate = birthDate;
            Description = description;
            Score = score;
            Rating = rating;
            IsActive = isActive;
            ProfilePicture = profilePicture;

        }

       



        //Insert new user
        public int Insert(int communityID)
        {
            DBservices db = new DBservices();
            return db.InsertUser(this, communityID);
        }

        //Read all users
        public List<User> ReadAllUsers() 
        {
            DBservices db = new DBservices();

            return db.ReadAllUsers(); 
        } 
        
        //Get all the managers of the community 
        public List<User> ReadManagersCommunity(int CommunityID) 
        {
            DBservices db = new DBservices();

            return db.ReadManagersCommunity(CommunityID); 
        }

        //Read User Community
        public List<Community> ReadUsercommunity(int userID)
        {
            DBservices dB = new DBservices();
            return dB.ReadUsercommunities(userID);
        }

        //Read all users that approved in the community
        public List<User> ReadApprovedUsersForCommunity(int communityID) 
        {
            DBservices db = new DBservices();

            return db.ReadAllApprovedUsersForCommunity(communityID); 
        }
        
        //Read all users that waiting to be approved
        public List<User> ReadAllPendingUsersForCommunity(int communityID) 
        {
            DBservices db = new DBservices();

            return db.ReadAllPendingUsersForCommunity(communityID); 
        }

       

        //Update user deatils
        public int UpdateUserDetails() 
        {
            DBservices db = new DBservices();
            return db.UpdateUserDetails(this);
        }
        //Delete user
        public int DeleteForGood(string phoneNum) 
        { 
            DBservices dB = new DBservices();
            return dB.DeleteUser(phoneNum); 
        }

    
        //Login to community
        public UserDetails Login(string phoneNum, string password, int communityId)
        {
            DBservices db = new DBservices();
            return db.Login(phoneNum, password, communityId);
        }

        //Login to community
        //public string Login(string phoneNum, string password, int communityId)
        //{
        //    DBservices db = new DBservices();
        //    return db.Login(phoneNum, password, communityId);
        //}

        //Update User Approval Status
        public int UpdateUserApprovalStatus(int userId, int communityId, string approvalStatus) 
        {
            DBservices db = new DBservices();
           int NumEffected =  db.UpdateUserApprovalStatus(userId, communityId, approvalStatus);

            if (approvalStatus == "Approved")
            {
                Community community = new Community();
                community = db.ReadSpecificCommunity(communityId);
            }

            return NumEffected; 
        }

        public int insertUserCategories(int UserID, List<int> categoriesID)
        {
            DBservices db = new DBservices();
            int count = 0;

            db.DeleteUserCategory(UserID);

            for (int i = 0; i < categoriesID.Count; i++)
            {
                db.insertUserCategories(UserID, categoriesID[i]);
                count++;
            }
            return count;
        }

        //public int DeleteUserCategory(int UserID, int CategoryID)
        //{
        //    DBservices db = new DBservices();
        //    return db.DeleteUserCategory(UserID,CategoryID);
        //}

        public IEnumerable<Category> GetAllUserCategories(int UserID)
        {
            DBservices db = new DBservices();
            return db.GetAllUserCategories(UserID);
        }


    }

    public class UserLogin
    {
    
        public int CommunityID { get; set; }
        public string PhoneNum { get; set; }
        public string Password { get; set; }

    }

    public class InsertUser
    {
        public User userToRegister { get; set; }
        public int communityId { get; set; }
    }

    public class UserDetails
    {
        public User User { get; set; }

        public bool isManager { get; set; }
        public List<Category> Categories { get; set; } = new List<Category>();

        public UserDetails ReadUser(int UserID)
        {
            DBservices db = new DBservices();

            return db.ReadUser(UserID);
        }

        public List<UserDetails> ReadUsers(List<int> UserID)
        {
            List<UserDetails> UserDetailsList = new List<UserDetails>();

            for (int i = 0; i < UserID.Count; i++)
            {
                 DBservices db = new DBservices();

                UserDetailsList.Add(db.ReadUser(UserID[i]));    
            }

            return UserDetailsList;
           
        }
    }
}
