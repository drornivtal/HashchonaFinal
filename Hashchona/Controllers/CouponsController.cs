using Hashchona.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hashchona.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponsController : ControllerBase
    {
        // GET: api/<CouponsController>
        [HttpGet]
        [Route("GetAllCouponsByCommunity")]
        public IEnumerable<Coupon> GetAllCouponsByCommunity(int CommunityID)
        {
            Coupon coupon = new Coupon();
            return coupon.GetAllCouponsByCommunity(CommunityID);
        }
         
        
        // GET: api/<CouponsController>
        //[HttpGet]
        //[Route("GetAllCouponsByUser")]
        //public IEnumerable<Coupon> GetAllCouponsByUser(int UserID)
        //{
        //    Coupon coupon = new Coupon();
        //    //return coupon.GetAllCouponsByUser(UserID);
            
        //}

        

        // POST api/<CouponsController>
        [HttpPost]
        public int Post(int CouponID, int UserID)
        {
            //return coupon.insertNewCoupon();
            return 1;
        }

        // PUT api/<CouponsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CouponsController>/5
        [HttpDelete]
        [Route("deleteCoupon")]
        public int deleteCoupon(int couponID)
        {
            Coupon coupon = new Coupon();
            return coupon.deleteCoupon(couponID);
        }
    }
}
