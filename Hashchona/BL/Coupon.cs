using Hashchona.DAL;

namespace Hashchona.BL
{
    public class Coupon
    {
        int couponID;
        string picture;
        double cost;
        string description;
        string businessAddress;
        string businessName;
        string businessNumber;
        int quantity;
        DateTime dueDate;
        int communityID;

        public Coupon() { }
        
        public Coupon(int couponID, string picture, double cost, string description, string businessAddress, string businessName,
                      string businessNumber, int quantity, DateTime dueDate, int communityID)
        {
            CouponID = couponID;
            Picture = picture;
            Cost = cost;
            Description = description;
            BusinessAddress = businessAddress;
            BusinessName = businessName;
            BusinessNumber = businessNumber;
            Quantity = quantity;
            DueDate = dueDate;
            CommunityID = communityID;
        }

        public int CouponID { get => couponID; set => couponID = value; }
        public string Picture { get => picture; set => picture = value; }
        public double Cost { get => cost; set => cost = value; }
        public string Description { get => description; set => description = value; }
        public string BusinessAddress { get => businessAddress; set => businessAddress = value; }
        public string BusinessName { get => businessName; set => businessName = value; }
        public string BusinessNumber { get => businessNumber; set => businessNumber = value; }
        public int Quantity { get => quantity; set => quantity = value; }
        public DateTime DueDate { get => dueDate; set => dueDate = value; }
        public int CommunityID { get => communityID; set => communityID = value; }

        public int insertNewCoupon()
        {
            DBservices db = new DBservices();
            return db.insertNewCoupon(this);
        }

        public List<Coupon> GetAllCouponsByCommunity(int CommunityID)
        {
            DBservices db = new DBservices();
            return db.GetAllCouponsByCommunity(CommunityID);
        }

        public int deleteCoupon(int couponID)
        {
            DBservices db = new DBservices();
            return db.deleteCoupon(couponID);
        }

    }


}
