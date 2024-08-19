using Hashchona.DAL;

namespace Hashchona.BL
{
    public class Community
    {
        int communityId;
        string name;
        string city;
        string location;
        string description;
        string primaryPic;
        string status;
        public int CommunityId { get => communityId; set => communityId = value; }
        public string Name { get => name; set => name = value; }
        public string City { get => city; set => city = value; }
        public string Location { get => location; set => location = value; }
        public string Description { get => description; set => description = value; }
        public string PrimaryPic { get => primaryPic; set => primaryPic = value; }
        public string Status { get => status; set => status = value; }

        public Community() { }

        public Community(int communityId, string name, string city, string location, string description, string primaryPic, string status)
        {
            CommunityId = communityId;
            Name = name;
            City = city;
            Location = location;
            Description = description;
            PrimaryPic = primaryPic;
            Status = status;
        }

      
        //Read all communities list
        public List<Community> ReadAllCommunities()
        {
            DBservices db = new DBservices();

            return db.ReadAllCommunitis();
        }
        //Read all the communities that got approved 
        public List<Community> ReadAllApprovedCommunities()
        {
            DBservices db = new DBservices();

            return db.ReadAllApprovedCommunitis();
        } 
        //Read all the communities that waiting to get approved 
        public List<Community> ReadAllPendingCommunities()
        {
            DBservices db = new DBservices();

            return db.ReadAllPendingCommunities();
        }

     
        public int InsertCommunityPictures(int communityID, List<string> images)
        {
            DBservices db = new DBservices();
            int count = 0;

            for (int i = 0; i < images.Count; i++)
            {
                count+= db.InsertCommunityPictures(communityID, images[i]);                
            }

            return count;
        }

        //Update Community Approval Status
        public int UpdateCommunityApprovalStatus(int communityId, string approvalStatus)
        {
            DBservices db = new DBservices();
            int NumEffected = db.UpdateCommunityApprovalStatus(communityId, approvalStatus);

            return NumEffected;
        }

        //Update Community details
        public int UpdateCommunityDetails()
        {
            DBservices db = new DBservices();
            int NumEffected = db.UpdateCommunityDetails(this);

            return NumEffected;
        }
               

        //Delete community
        public int deleteCommunity() 
        {
            DBservices db = new DBservices();
            return db.deleteCommunity(this.CommunityId);
        }

        public string InsertNewManager(int UserID, int CommunityID)
        {
            DBservices db = new DBservices();
            return db.InsertNewManager(UserID, CommunityID);

        }

        public int DeleteCommunityManager(int UserID, int CommunityID)
        {
            DBservices db = new DBservices();
            return db.DeleteCommunityManager(UserID, CommunityID);
        }


        public IEnumerable<User> ReadCommunityManager(int communityID)
        {
            DBservices db = new DBservices();
            return db.ReadCommunityManager(communityID);
        }



    }


    public class InsertCommunity
    {
        public User UserManager { get; set; }
        public Community Community { get; set; }

        //insert new Community and Manager
        public int Insert(User user, Community community)
        {
            DBservices db = new DBservices();

            return db.insertNewCommunity(community, user);
        }

    }



    public class CommunityApprovedStatus
    {
        public int communityID { get; set; }
        public string approvalStatus { get; set; }
    }
}
