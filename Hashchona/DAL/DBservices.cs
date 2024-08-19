
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using System.Xml.Linq;
using Hashchona.BL;
using System.IO;
using System.Reflection;
using System.Reflection.PortableExecutable;
using System.ComponentModel.Design;


namespace Hashchona.DAL
{
    public class DBservices
    {
        public DBservices() {}

        //--------------------------------------------------------------------------------------------------
        // This method creates a connection to the database according to the connectionString name in the web.config 
        //--------------------------------------------------------------------------------------------------
        public SqlConnection connect(String conString)
        {

            // read the connection string from the configuration file
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json").Build();
            string cStr = configuration.GetConnectionString("myProjDB");
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }

              
        //---------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure (2)
        //---------------------------------------------------------------------------------
        private SqlCommand SelectUserByEmailWithStoredProcedureWithParameters(String spName, SqlConnection con,  string email)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

  
            cmd.Parameters.AddWithValue("@email", email);

            return cmd;
        }

     


        //---------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure (4)
        //---------------------------------------------------------------------------------
        private SqlCommand CreateCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }





        //------------------//
        //     User:        //
        //------------------//
        //--------------------------------------------------------------------------------------------------
        // read all users
        //--------------------------------------------------------------------------------------------------
        public List<User> ReadAllUsers()
        {

            SqlConnection con;
            SqlCommand cmd;
            List<User> usersList = new List<User>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = buildReadStoredProcedureCommand("spReadAllUsers", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    User s = new User();                
                   
                    
                    s.UserId = Convert.ToInt32(dataReader["UserID"]);
                    s.FirstName = dataReader["FirstName"].ToString();
                    s.LastName = dataReader["LastName"].ToString();
                    s.PhoneNum = dataReader["PhoneNumber"].ToString();
                    s.Password = dataReader["uPassword"].ToString();
                    s.Gender = Convert.ToChar(dataReader["Gender"]);
                    s.City = dataReader["City"].ToString();
                    s.Street = dataReader["Street"].ToString();
                    s.HomeNum = Convert.ToInt16(dataReader["HomeNumber"]);
                    s.BirthDate = Convert.ToDateTime(dataReader["BirthDate"]);
                    s.Description = dataReader["uDescription"].ToString();
                    s.ProfilePicture = dataReader["ProfilePic"].ToString();
                    s.Score = Convert.ToInt32(dataReader["Score"]);
                    s.Rating = Convert.ToDouble(dataReader["Rating"]);
                    s.Password = dataReader["uPassword"].ToString();
                    s.IsActive = Convert.ToChar( dataReader["isInHold"]);
                    //s.IsActive = Convert.ToBoolean(dataReader["IsActive"]);
                    usersList.Add(s);
                   
               
                }
                return usersList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand buildReadStoredProcedureCommand(String spName, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // read all users
        //--------------------------------------------------------------------------------------------------
        public List<User> ReadManagersCommunity(int CommunityID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<User> usersList = new List<User>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = buildReadByStatusUsersForCommunityStoredProcedureCommand("spReadAllManagersCommunity", con, CommunityID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    User s = new User();


                    s.UserId = Convert.ToInt32(dataReader["UserID"]);
                    s.FirstName = dataReader["FirstName"].ToString();
                    s.LastName = dataReader["LastName"].ToString();
                    s.PhoneNum = dataReader["PhoneNumber"].ToString();
                    s.Password = dataReader["uPassword"].ToString();
                    s.Gender = Convert.ToChar(dataReader["Gender"]);
                    s.City = dataReader["City"].ToString();
                    s.Street = dataReader["Street"].ToString();
                    s.HomeNum = Convert.ToInt16(dataReader["HomeNumber"]);
                    s.BirthDate = Convert.ToDateTime(dataReader["BirthDate"]);
                    s.Description = dataReader["uDescription"].ToString();
                    s.ProfilePicture = dataReader["ProfilePic"].ToString();
                    s.Score = Convert.ToInt32(dataReader["Score"]);
                    s.Rating = Convert.ToDouble(dataReader["Rating"]);
                    s.Password = dataReader["uPassword"].ToString();
                    s.IsActive = Convert.ToChar(dataReader["isInHold"]);
                    //s.IsActive = Convert.ToBoolean(dataReader["IsActive"]);
                    usersList.Add(s);


                }
                return usersList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }


        //--------------------------------------------------------------------------------------------------
        // read all users that got approved to the community
        //--------------------------------------------------------------------------------------------------
        public List<User> ReadAllPendingUsersForCommunity(int CommunityID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<User> usersList = new List<User>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = buildReadByStatusUsersForCommunityStoredProcedureCommand("spGetAllUsersPendingToCommunity", con, CommunityID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    User s = new User();


                    s.UserId = Convert.ToInt32(dataReader["UserID"]);
                    s.FirstName = dataReader["FirstName"].ToString();
                    s.LastName = dataReader["LastName"].ToString();
                    s.PhoneNum = dataReader["PhoneNumber"].ToString();
                    s.Password = dataReader["uPassword"].ToString();
                    s.Gender = Convert.ToChar(dataReader["Gender"]);
                    s.City = dataReader["City"].ToString();
                    s.Street = dataReader["Street"].ToString();
                    s.HomeNum = Convert.ToInt16(dataReader["HomeNumber"]);
                    s.BirthDate = Convert.ToDateTime(dataReader["BirthDate"]);
                    s.Description = dataReader["uDescription"].ToString();
                    s.ProfilePicture = dataReader["ProfilePic"].ToString();
                    s.Score = Convert.ToInt32(dataReader["Score"]);
                    s.Rating = Convert.ToDouble(dataReader["Rating"]);
                    s.Password = dataReader["uPassword"].ToString();
                    s.IsActive = Convert.ToChar(dataReader["isInHold"]);
                    //s.IsActive = Convert.ToBoolean(dataReader["IsActive"]);
                    usersList.Add(s);


                }
                return usersList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        //--------------------------------------------------------------------------------------------------
        // read all users that got approved to the community
        //--------------------------------------------------------------------------------------------------
        public List<User> ReadAllApprovedUsersForCommunity(int CommunityID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<User> usersList = new List<User>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = buildReadByStatusUsersForCommunityStoredProcedureCommand("spGetAllUsersAcceptedToCommunity", con, CommunityID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    User s = new User();


                    s.UserId = Convert.ToInt32(dataReader["UserID"]);
                    s.FirstName = dataReader["FirstName"].ToString();
                    s.LastName = dataReader["LastName"].ToString();
                    s.PhoneNum = dataReader["PhoneNumber"].ToString();
                    s.Password = dataReader["uPassword"].ToString();
                    s.Gender = Convert.ToChar(dataReader["Gender"]);
                    s.City = dataReader["City"].ToString();
                    s.Street = dataReader["Street"].ToString();
                    s.HomeNum = Convert.ToInt16(dataReader["HomeNumber"]);
                    s.BirthDate = Convert.ToDateTime(dataReader["BirthDate"]);
                    s.Description = dataReader["uDescription"].ToString();
                    s.ProfilePicture = dataReader["ProfilePic"].ToString();
                    s.Score = Convert.ToInt32(dataReader["Score"]);
                    s.Rating = Convert.ToDouble(dataReader["Rating"]);
                    s.Password = dataReader["uPassword"].ToString();
                    s.IsActive = Convert.ToChar(dataReader["isInHold"]);
                    //s.IsActive = Convert.ToBoolean(dataReader["IsActive"]);
                    usersList.Add(s);


                }
                return usersList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand buildReadByStatusUsersForCommunityStoredProcedureCommand(String spName, SqlConnection con, int CommunityID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@CommunityID", CommunityID);


            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // read specific User
        //--------------------------------------------------------------------------------------------------
        public UserDetails ReadUser(int UserID)
        {

            SqlConnection con;
            SqlCommand cmd;
            UserDetails userDetails = new UserDetails();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadUserStoredProcedureCommand("spReadUser", con, UserID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                User s = new User();

                if (dataReader.HasRows)
                {

                    while (dataReader.Read())
                    {

                        s.UserId = Convert.ToInt32(dataReader["UserID"]);
                        s.FirstName = dataReader["FirstName"].ToString();
                        s.LastName = dataReader["LastName"].ToString();
                        s.PhoneNum = dataReader["PhoneNumber"].ToString();
                        s.Password = "000000000";
                        s.Gender = Convert.ToChar(dataReader["Gender"]);
                        s.City = dataReader["City"].ToString();
                        s.Street = dataReader["Street"].ToString();
                        s.HomeNum = Convert.ToInt16(dataReader["HomeNumber"]);
                        s.BirthDate = Convert.ToDateTime(dataReader["BirthDate"]);
                        s.Description = dataReader["uDescription"].ToString();
                        s.ProfilePicture = dataReader["ProfilePic"].ToString();
                        s.Score = Convert.ToInt32(dataReader["Score"]);
                        s.Rating = Convert.ToDouble(dataReader["Rating"]);
                        s.IsActive = Convert.ToChar(dataReader["isInHold"]);

                        userDetails.User = s;

                        
                    }
                }
                if (dataReader.NextResult())
                {
                    while (dataReader.Read())
                    {
                        Category category = new Category();

                        category.CategroyID = Convert.ToInt32(dataReader["CategoryID"]);
                        category.CatName = dataReader["catName"].ToString();
                        category.MaxScore = Convert.ToInt32(dataReader["MaxScore"]);
                        category.IconName = dataReader["IconName"].ToString();
                        userDetails.Categories.Add(category);
                    }


                }
                return userDetails;


            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand ReadUserStoredProcedureCommand(String spName, SqlConnection con, int UserID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@UserID", UserID);

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // read specific Manager for specific community 
        //--------------------------------------------------------------------------------------------------
        public User ReadManagerForSpecificCommunity(int communityId)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadManagerForSpecificCommunityProcedureCommand("spReadManagerForSpecificCommunity", con, communityId);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                User s = new User();

                while (dataReader.Read())
                {


                    s.UserId = Convert.ToInt32(dataReader["UserID"]);
                    s.FirstName = dataReader["FirstName"].ToString();
                    s.LastName = dataReader["LastName"].ToString();
                    s.PhoneNum = dataReader["PhoneNumber"].ToString();
                    s.Password = dataReader["uPassword"].ToString();
                    s.Gender = Convert.ToChar(dataReader["Gender"]);
                    s.City = dataReader["City"].ToString();
                    s.Street = dataReader["Street"].ToString();
                    s.HomeNum = Convert.ToInt16(dataReader["HomeNumber"]);
                    s.BirthDate = Convert.ToDateTime(dataReader["BirthDate"]);
                    s.Description = dataReader["uDescription"].ToString();
                    s.ProfilePicture = dataReader["ProfilePic"].ToString();
                    s.Score = Convert.ToInt32(dataReader["Score"]);
                    s.Rating = Convert.ToDouble(dataReader["Rating"]);
                    s.Password = dataReader["uPassword"].ToString();
                    s.IsActive = Convert.ToChar(dataReader["isInHold"]);
                    //s.IsActive = Convert.ToBoolean(dataReader["IsActive"]);



                }
                return s;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand ReadManagerForSpecificCommunityProcedureCommand(String spName, SqlConnection con, int communityID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@communityID", communityID);

            return cmd;
        }


        //--------------------------------------------------------------------------------------------------
        // Registration --> This method Inserts a user to the users table 
        //--------------------------------------------------------------------------------------------------
        public int InsertUser(User user, int communityId)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateUserInsertCommandWithStoredProcedure("spInsertNewUser", con, user, communityId); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure (1-Registration & Details update)
        //----------------------------------------------------------------------------------------
        private SqlCommand CreateUserInsertCommandWithStoredProcedure(String spName, SqlConnection con, User user, int communityId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@FirstName", user.FirstName);

            cmd.Parameters.AddWithValue("@LastName", user.LastName);

            cmd.Parameters.AddWithValue("@PhoneNumber", user.PhoneNum);
            cmd.Parameters.AddWithValue("@uPassword", user.Password);
            cmd.Parameters.AddWithValue("@Gender", user.Gender);
            cmd.Parameters.AddWithValue("@City", user.City);
            cmd.Parameters.AddWithValue("@Street", user.Street);
            cmd.Parameters.AddWithValue("@HomeNumber", user.HomeNum);
            cmd.Parameters.AddWithValue("@BirthDate", user.BirthDate);
            cmd.Parameters.AddWithValue("@uDescription", user.Description);
            cmd.Parameters.AddWithValue("@ProfilePic", user.ProfilePicture);
            cmd.Parameters.AddWithValue("@CommunityId", communityId);

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        //Get all user categories 
        //--------------------------------------------------------------------------------------------------
        public IEnumerable<Category> GetAllUserCategories(int UserID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<Category> categories = new List<Category>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadAllUserCategoriesCommandWithStoredProcedure("spGetAllUserCategories", con, UserID); // create the command

            try
            {
                SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (reader.Read())
                {
                    Category category = new Category();

                    category.CategroyID = Convert.ToInt32(reader["CategoryID"]);
                    category.CatName = reader["catName"].ToString();
                    category.MaxScore = Convert.ToInt32(reader["MaxScore"]);
                    category.IconName = reader["IconName"].ToString();
                    categories.Add(category);
                }
                
                
                return categories;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand ReadAllUserCategoriesCommandWithStoredProcedure(String spName, SqlConnection con, int UserID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@UserID", UserID);

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        //insert user categories 
        //--------------------------------------------------------------------------------------------------
        public int insertUserCategories(int UserID,int categoryID)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = insertUserCategoriesCommandWithStoredProcedure("spInsertUserCategory", con, UserID, categoryID); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        //--------------------------------------------------------------------------------------------------
        //Delete user categories 
        //--------------------------------------------------------------------------------------------------
        public int DeleteUserCategory(int UserID)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = deleteUserCategoriesCommandWithStoredProcedure("spDeleteUserCategories", con, UserID); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure (1-Registration & Details update)
        //----------------------------------------------------------------------------------------
        private SqlCommand insertUserCategoriesCommandWithStoredProcedure(String spName, SqlConnection con, int UserID, int CategoryID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@UserID", UserID);

            cmd.Parameters.AddWithValue("@CategoryID", CategoryID);


            return cmd;
        }
        
        //----------------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure (1-Registration & Details update)
        //----------------------------------------------------------------------------------------
        private SqlCommand deleteUserCategoriesCommandWithStoredProcedure(String spName, SqlConnection con, int UserID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@UserID", UserID);


            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // LogIn --> This method reads user by phoneNum and password from the database 
        //--------------------------------------------------------------------------------------------------
        public UserDetails Login(string phoneNum, string password, int communityId)
        {

            SqlConnection con;
            SqlCommand cmd;

            UserDetails userDetails = new UserDetails();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = SelectUserToLogInWithStoredProcedureWithParameters("spLoginUserActiveUserU", con, phoneNum, password,communityId);   // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                User s = new User();

                if (dataReader.HasRows)
                {

                    while (dataReader.Read())
                    {

                        s.UserId = Convert.ToInt32(dataReader["UserID"]);
                        s.FirstName = dataReader["FirstName"].ToString();
                        s.LastName = dataReader["LastName"].ToString();
                        s.PhoneNum = dataReader["PhoneNumber"].ToString();
                        s.Password = dataReader["uPassword"].ToString();
                        s.Gender = Convert.ToChar(dataReader["Gender"]);
                        s.City = dataReader["City"].ToString();
                        s.Street = dataReader["Street"].ToString();
                        s.HomeNum = Convert.ToInt16(dataReader["HomeNumber"]);
                        s.BirthDate = Convert.ToDateTime(dataReader["BirthDate"]);
                        s.Description = dataReader["uDescription"].ToString();
                        s.ProfilePicture = dataReader["ProfilePic"].ToString();
                        s.Score = Convert.ToInt32(dataReader["Score"]);
                        s.Rating = Convert.ToDouble(dataReader["Rating"]);
                        s.Password = dataReader["uPassword"].ToString();
                        s.IsActive = Convert.ToChar(dataReader["isInHold"]);

                        userDetails.User = s;

                        string isManager = dataReader["IsAdmin"].ToString();

                        if (isManager == "TRUE")
                        {
                            userDetails.isManager = true; 
                        }
                        else
                        {
                            userDetails.isManager = false;
                        }

                        
                    }
                }
                if (dataReader.NextResult())
                {
                    while (dataReader.Read())
                    {
                        Category category = new Category();                                   

                         category.CategroyID = Convert.ToInt32(dataReader["CategoryID"]);
                         category.CatName = dataReader["catName"].ToString();
                         category.MaxScore = Convert.ToInt32(dataReader["MaxScore"]);
                        category.IconName = dataReader["IconName"].ToString();
                         userDetails.Categories.Add(category);
                    }
                        
                    
                }
                return userDetails;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand SelectUserToLogInWithStoredProcedureWithParameters(String spName, SqlConnection con, string phoneNum, string password, int communityId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@PhoneNumber", phoneNum);
            cmd.Parameters.AddWithValue("@Password", password);
            cmd.Parameters.AddWithValue("@CommunityID", communityId);
            

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // Details update --> This method Inserts a user to the users table 
        //--------------------------------------------------------------------------------------------------
        public int UpdateUserDetails(User user) //(CCEC)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = UpdateUserDetailsCommandWithStoredProcedure("spUpdateUserDetails", con, user); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        private SqlCommand UpdateUserDetailsCommandWithStoredProcedure(String spName, SqlConnection con, User user)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@UserId", user.UserId);
            cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
            cmd.Parameters.AddWithValue("@LastName", user.LastName);
            cmd.Parameters.AddWithValue("@PhoneNumber", user.PhoneNum);
            cmd.Parameters.AddWithValue("@uPassword", user.Password);
            cmd.Parameters.AddWithValue("@Gender", user.Gender);
            cmd.Parameters.AddWithValue("@City", user.City);
            cmd.Parameters.AddWithValue("@Street", user.Street);
            cmd.Parameters.AddWithValue("@HomeNumber", user.HomeNum);
            cmd.Parameters.AddWithValue("@BirthDate", user.BirthDate);
            cmd.Parameters.AddWithValue("@uDescription", user.Description);
            cmd.Parameters.AddWithValue("@ProfilePic", user.ProfilePicture);

            return cmd;
        }


        //--------------------------------------------------------------------------------------------------
        // updat user approval to specific community, if this is only community and get deny the user will be delete
        //--------------------------------------------------------------------------------------------------
        public int UpdateUserApprovalStatus(int userId, int communityId, string approvalStatus)  
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = UpdateUserApprovalStatusWithStoredProcedure("spUpdateUserApprovalStatus", con, userId, communityId, approvalStatus); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        private SqlCommand UpdateUserApprovalStatusWithStoredProcedure(String spName, SqlConnection con, int userId, int communityId, string approvalStatus)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@UserID", userId);
            cmd.Parameters.AddWithValue("@CommunityID", communityId);
            cmd.Parameters.AddWithValue("@ApprovalStatus", approvalStatus);
           
            return cmd;
        }


        //--------------------------------------------------------------------------------------------------
        // Delete a user 
        //--------------------------------------------------------------------------------------------------
        public int DeleteUser(string phoneNum)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = DeleteUserCommandWithStoredProcedure("spDeleteUserFromUsers", con, phoneNum ); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure (1-Registration & Details update)
        //----------------------------------------------------------------------------------------
        private SqlCommand DeleteUserCommandWithStoredProcedure(String spName, SqlConnection con, string phoneNum)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text       

            cmd.Parameters.AddWithValue("@PhoneNum", phoneNum);
         
            return cmd;
        }


        //--------------------------------------------------------------------------------------------------
        // read all users Communities
        //--------------------------------------------------------------------------------------------------
        public List<Community> ReadUsercommunities(int userID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<Community> communityList = new List<Community>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadAllUserCommunitiesStoredProcedureCommand("spReadAllUserCommunities", con, userID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    Community s = new Community();


                    s.CommunityId = Convert.ToInt32(dataReader["CommunityID"]);
                    s.Name = dataReader["cName"].ToString();
                    s.City = dataReader["City"].ToString();
                    s.Location = dataReader["cLocation"].ToString();
                    s.Description = dataReader["CommunityDescription"].ToString();
                    s.PrimaryPic = dataReader["PrimaryPic"].ToString();
                    communityList.Add(s);

                }
                return communityList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand ReadAllUserCommunitiesStoredProcedureCommand(String spName, SqlConnection con, int userID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@userID", userID);


            return cmd;
        }

        //---------------------------------------------
        //Community
        //---------------------------------------------

        //--------------------------------------------------------------------------------------------------
        // read all Communitis
        //--------------------------------------------------------------------------------------------------
        public List<Community> ReadAllCommunitis()
        {

            SqlConnection con;
            SqlCommand cmd;
            List<Community> communityList = new List<Community>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadAllCommunitisStoredProcedureCommand("spReadAllCommunitis", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    Community s = new Community();


                    s.CommunityId = Convert.ToInt32(dataReader["CommunityID"]);
                    s.Name = dataReader["cName"].ToString();
                    s.City = dataReader["City"].ToString();
                    s.Location = dataReader["cLocation"].ToString();
                    s.Description = dataReader["CommunityDescription"].ToString();
                    s.PrimaryPic = dataReader["PrimaryPic"].ToString();
                    s.Status = dataReader["CommunityStatus"].ToString();
                    communityList.Add(s);

                }
                return communityList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand ReadAllCommunitisStoredProcedureCommand(String spName, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // read all Accepted Communities
        //--------------------------------------------------------------------------------------------------
        public List<Community> ReadAllApprovedCommunitis()
        {

            SqlConnection con;
            SqlCommand cmd;
            List<Community> communityList = new List<Community>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadAllCommunitisStoredProcedureCommand("spReadAcceptedCommunities", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    Community s = new Community();


                    s.CommunityId = Convert.ToInt32(dataReader["CommunityID"]);
                    s.Name = dataReader["cName"].ToString();
                    s.City = dataReader["City"].ToString();
                    s.Location = dataReader["cLocation"].ToString();
                    s.Description = dataReader["CommunityDescription"].ToString();
                    s.PrimaryPic = dataReader["PrimaryPic"].ToString();
                    s.Status = dataReader["CommunityStatus"].ToString();
                    communityList.Add(s);

                }
                return communityList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        //--------------------------------------------------------------------------------------------------
        // read all Pending  Communities
        //--------------------------------------------------------------------------------------------------
        public List<Community> ReadAllPendingCommunities()
        {

            SqlConnection con;
            SqlCommand cmd;
            List<Community> communityList = new List<Community>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadAllCommunitisStoredProcedureCommand("spReadPendingCommunities", con);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    Community s = new Community();


                    s.CommunityId = Convert.ToInt32(dataReader["CommunityID"]);
                    s.Name = dataReader["cName"].ToString();
                    s.City = dataReader["City"].ToString();
                    s.Location = dataReader["cLocation"].ToString();
                    s.Description = dataReader["CommunityDescription"].ToString();
                    s.PrimaryPic = dataReader["PrimaryPic"].ToString();
                    s.Status = dataReader["CommunityStatus"].ToString();

                    communityList.Add(s);

                }
                return communityList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        //--------------------------------------------------------------------------------------------------
        // read specific  Community
        //--------------------------------------------------------------------------------------------------
        public Community ReadSpecificCommunity(int communityId)
        {

            SqlConnection con;
            SqlCommand cmd;
            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadSpecificCommunitisStoredProcedureCommand("spGetSpecificCommunity", con, communityId);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                Community s = new Community();
                while (dataReader.Read())
                {


                    s.CommunityId = Convert.ToInt32(dataReader["CommunityID"]);
                    s.Name = dataReader["cName"].ToString();
                    s.City = dataReader["City"].ToString();
                    s.Location = dataReader["cLocation"].ToString();
                    s.Description = dataReader["CommunityDescription"].ToString();
                    s.PrimaryPic = dataReader["PrimaryPic"].ToString();
                    s.Status = dataReader["CommunityStatus"].ToString();



                }
                return s;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand ReadSpecificCommunitisStoredProcedureCommand(String spName, SqlConnection con, int communityID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@communityID", communityID);


            return cmd;
        }


        //--------------------------------------------------------------------------------------------------
        // read all managers of the community
        //--------------------------------------------------------------------------------------------------
        public IEnumerable<User> ReadCommunityManager(int communityID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<User> users = new List<User>();
            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadCommunityManagerStoredProcedureCommand("spReadCommunityManager", con, communityID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                
                while (dataReader.Read())
                {
                    User s = new User();

                    s.UserId = Convert.ToInt32(dataReader["UserID"]);
                    s.FirstName = dataReader["FirstName"].ToString();
                    s.LastName = dataReader["LastName"].ToString();
                    s.PhoneNum = dataReader["PhoneNumber"].ToString();
                    s.Password = dataReader["uPassword"].ToString();
                    s.Gender = Convert.ToChar(dataReader["Gender"]);
                    s.City = dataReader["City"].ToString();
                    s.Street = dataReader["Street"].ToString();
                    s.HomeNum = Convert.ToInt16(dataReader["HomeNumber"]);
                    s.BirthDate = Convert.ToDateTime(dataReader["BirthDate"]);
                    s.Description = dataReader["uDescription"].ToString();
                    s.ProfilePicture = dataReader["ProfilePic"].ToString();
                    s.Score = Convert.ToInt32(dataReader["Score"]);
                    s.Rating = Convert.ToDouble(dataReader["Rating"]);
                    s.Password = dataReader["uPassword"].ToString();

                    users.Add(s);
                }
                return users;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand ReadCommunityManagerStoredProcedureCommand(String spName, SqlConnection con, int communityID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@communityID", communityID);


            return cmd;
        }
        //--------------------------------------------------------------------------------------------------
        // insert new Community
        //--------------------------------------------------------------------------------------------------

        public int insertNewCommunity(Community community, User user)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateCommunityInsertCommandWithStoredProcedure("spInsertNewCommunity", con, community, user); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        //  SqlCommand using a stored procedur
        //----------------------------------------------------------------------------------------
        private SqlCommand CreateCommunityInsertCommandWithStoredProcedure(String spName, SqlConnection con, Community community ,User user)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
            cmd.Parameters.AddWithValue("@LastName", user.LastName);
            cmd.Parameters.AddWithValue("@PhoneNumber", user.PhoneNum);
            cmd.Parameters.AddWithValue("@uPassword", user.Password);
            cmd.Parameters.AddWithValue("@Gender", user.Gender);
            cmd.Parameters.AddWithValue("@CityUser", user.City);
            cmd.Parameters.AddWithValue("@Street", user.Street);
            cmd.Parameters.AddWithValue("@HomeNumber", user.HomeNum);
            cmd.Parameters.AddWithValue("@BirthDate", user.BirthDate);
            cmd.Parameters.AddWithValue("@uDescription", user.Description);
            cmd.Parameters.AddWithValue("@ProfilePic", user.ProfilePicture);

            cmd.Parameters.AddWithValue("@cName", community.Name);
            cmd.Parameters.AddWithValue("@City", community.City);
            cmd.Parameters.AddWithValue("@cLocation", community.Location);
            cmd.Parameters.AddWithValue("@CommunityDescription", community.Description);
            cmd.Parameters.AddWithValue("@PrimaryPic", community.PrimaryPic);
          

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // updat community approval 
        //--------------------------------------------------------------------------------------------------
        public int UpdateCommunityApprovalStatus (int communityId, string approvalStatus)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = UpdateCommunityApprovalStatusWithStoredProcedure("spUpdateCommunityApprovalStatus", con, communityId, approvalStatus); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        private SqlCommand UpdateCommunityApprovalStatusWithStoredProcedure(String spName, SqlConnection con, int communityId, string approvalStatus)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@CommunityID", communityId);
            cmd.Parameters.AddWithValue("@ApprovalStatus", approvalStatus);

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // insert Community Picture 
        //--------------------------------------------------------------------------------------------------
        public int InsertCommunityPictures(int communityID, string image)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = InsertCommunityPicturesWithStoredProcedure("spInsertCommunityPicture", con, communityID, image); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        private SqlCommand InsertCommunityPicturesWithStoredProcedure(String spName, SqlConnection con, int CommunityID, string image)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@CommunityID", CommunityID);
            cmd.Parameters.AddWithValue("@image", image);

            return cmd;
        }



        //--------------------------------------------------------------------------------------------------
        // update community Details 
        //--------------------------------------------------------------------------------------------------
        public int UpdateCommunityDetails(Community community)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = UpdateCommunityDetailsWithStoredProcedure("spUpdateCommunityDetails", con, community); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        private SqlCommand UpdateCommunityDetailsWithStoredProcedure(String spName, SqlConnection con, Community community)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@CommunityID", community.CommunityId);
            cmd.Parameters.AddWithValue("@cName", community.Name);
            cmd.Parameters.AddWithValue("@City", community.City);
            cmd.Parameters.AddWithValue("@cLocation", community.Location);
            cmd.Parameters.AddWithValue("@CommunityDescription", community.Description);
            cmd.Parameters.AddWithValue("@PrimaryPic", community.PrimaryPic);

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // insert new community manager 
        //--------------------------------------------------------------------------------------------------
        public string InsertNewManager(int UserID, int CommunityID)
        {
            SqlConnection con;
            SqlCommand cmd;
            StringBuilder infoMessages = new StringBuilder();
            try
            {
                con = connect("myProjDB"); // create the connection
                con.InfoMessage += (sender, e) =>
                {
                    foreach (SqlError error in e.Errors)
                    {
                        infoMessages.AppendLine(error.Message);
                    }
                };
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = InsertNewManagerWithStoredProcedure("AddManagerToCommunity", con, UserID, CommunityID); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return infoMessages.ToString();
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }

        private SqlCommand InsertNewManagerWithStoredProcedure(String spName, SqlConnection con, int UserID, int CommunityID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@UserID", UserID);
            cmd.Parameters.AddWithValue("@CommunityID", CommunityID);
           

            return cmd;
        }


        //--------------------------------------------------------------------------------------------------
        // Delete a Community manager
        //--------------------------------------------------------------------------------------------------
        public int DeleteCommunityManager(int UserID, int CommunityID)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = InsertNewManagerWithStoredProcedure("spDeleteCommunityManager", con, UserID, CommunityID); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure to delete a community
        //----------------------------------------------------------------------------------------
    
        //--------------------------------------------------------------------------------------------------
        // Delete a Community 
        //--------------------------------------------------------------------------------------------------
        public int deleteCommunity(int CommunityID)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = DeleteCommunityCommandWithStoredProcedure("spDeleteCommunity", con, CommunityID); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        // Create the SqlCommand using a stored procedure to delete a community
        //----------------------------------------------------------------------------------------
        private SqlCommand DeleteCommunityCommandWithStoredProcedure(String spName, SqlConnection con, int CommunityID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text       

            cmd.Parameters.AddWithValue("@CommunityID", CommunityID);

            return cmd;
        }


        //----------------------------
        //Request for help
        //----------------------------

        //--------------------------------------------------------------------------------------------------
        // insert new Request
        //--------------------------------------------------------------------------------------------------

        public List<object> InsertNewReq(RequestForHelp request)
        {

            SqlConnection con;
            SqlCommand cmd;

            List<object> list = new List<object>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReqInsertCommandWithStoredProcedure("spInsertRequest", con, request); // create the command

            try
            {


                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);


                while (dataReader.Read())
                {
                   
                    int UserId = Convert.ToInt32(dataReader["UserID"]);
                    float TotalScore = Convert.ToSingle(dataReader["TotalScore"]);
                    int ReqID = Convert.ToInt32(dataReader["ReqID"]);

                    var result = new { UserId = UserId, ratingScore = TotalScore, ReqID = ReqID};

                    list.Add(result);
                }
                return list;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        //  SqlCommand using a stored procedur
        //----------------------------------------------------------------------------------------
        private SqlCommand ReqInsertCommandWithStoredProcedure(String spName, SqlConnection con, RequestForHelp request)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            //cmd.Parameters.AddWithValue("@PostDate", request.PostDate);
            //cmd.Parameters.AddWithValue("@PostTime", request.PostTime);
            cmd.Parameters.AddWithValue("@DueDate", request.DueDate);
            cmd.Parameters.AddWithValue("@DueTime", Convert.ToDateTime(request.DueDate.ToString("HH:mm")).TimeOfDay);
            cmd.Parameters.AddWithValue("@ReqDescription", request.Description);
            cmd.Parameters.AddWithValue("@CategoryID", request.CategoryId);
            cmd.Parameters.AddWithValue("@UserID", request.UserReqID);   
            cmd.Parameters.AddWithValue("@CommunityID", request.CommunityID);   


            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // Delete Request
        //--------------------------------------------------------------------------------------------------

        public int DeleteReq(int requestId)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReqDeletCommandWithStoredProcedure("spDeleteSpecificReq", con, requestId); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        //  SqlCommand using a stored procedur
        //----------------------------------------------------------------------------------------
        private SqlCommand ReqDeletCommandWithStoredProcedure(String spName, SqlConnection con, int reqID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@ReqID", reqID);   



            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // read Active Req by category
        //--------------------------------------------------------------------------------------------------
        public List<RequestForHelp> readAllActiveCategoryReq(int CategoryID, int CommunityID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<RequestForHelp> ReqList = new List<RequestForHelp>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadActiveReqByCategoryStoredProcedureCommand("spFilterRequestsByCategoryID", con, CategoryID, CommunityID);

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    RequestForHelp request = new RequestForHelp();

                    request.ReqID = Convert.ToInt32(dataReader["ReqID"]);
                    request.CommunityID = Convert.ToInt32(dataReader["CommunityID"]);
                    request.DueDate = Convert.ToDateTime(dataReader["DueDate"]);
                    request.DueTime = dataReader["DueTime"].ToString(); 
                    request.PostDate = Convert.ToDateTime(dataReader["PostDate"]);
                    request.PostTime = dataReader["PostTime"].ToString();
                    request.Description = dataReader["ReqDescription"].ToString();
                    request.CategoryId = Convert.ToInt32(dataReader["CategoryID"]);
                    request.UserReqID = Convert.ToInt32(dataReader["UserID"]);
                    if (dataReader["GotHelp"].ToString() == "t")
                    {
                        request.GotHelp = true;
                    }
                    else
                    {
                        request.GotHelp = false;
                    }




                    ReqList.Add(request);

                }
                return ReqList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand ReadActiveReqByCategoryStoredProcedureCommand(String spName, SqlConnection con, int categoryID, int CommunityID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@CategoryID", categoryID);
            cmd.Parameters.AddWithValue("@CommunityID", CommunityID);


            return cmd;
        }    
        
        
        //--------------------------------------------------------------------------------------------------
        // read All user request for help
        //--------------------------------------------------------------------------------------------------
        public List<RequestForHelp> GetAllUserRequests(int UserID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<RequestForHelp> ReqList = new List<RequestForHelp>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = GetAllUserRequestsStoredProcedureCommand("spGetAllUserRequests", con, UserID);

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    RequestForHelp request = new RequestForHelp();

                    request.ReqID = Convert.ToInt32(dataReader["ReqID"]);
                    request.CommunityID = Convert.ToInt32(dataReader["CommunityID"]);
                    request.DueDate = Convert.ToDateTime(dataReader["DueDate"]);
                    request.DueTime = dataReader["DueTime"].ToString(); 
                    request.PostDate = Convert.ToDateTime(dataReader["PostDate"]);
                    request.PostTime = dataReader["PostTime"].ToString();
                    request.Description = dataReader["ReqDescription"].ToString();
                    request.CategoryId = Convert.ToInt32(dataReader["CategoryID"]);
                    request.UserReqID = Convert.ToInt32(dataReader["UserID"]);

                    if (dataReader["GotHelp"].ToString() == "t")
                    {
                        request.GotHelp = true;
                    }
                    else
                    {
                        request.GotHelp = false;
                    }




                    ReqList.Add(request);

                }
                return ReqList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand GetAllUserRequestsStoredProcedureCommand(String spName, SqlConnection con, int UserID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@UserID", UserID);
          


            return cmd;
        }
          //--------------------------------------------------------------------------------------------------
        // read All user request for help by community
        //--------------------------------------------------------------------------------------------------
        public List<RequestForHelp> GetAllUserRequestsByCommunity(int UserID, int CommunityID) 
        { 

            SqlConnection con;
            SqlCommand cmd;
            List<RequestForHelp> ReqList = new List<RequestForHelp>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = GetAllUserRequestsByCommunityStoredProcedureCommand("spGetAllUserRequestsByCommunity", con, UserID, CommunityID);

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    RequestForHelp request = new RequestForHelp();

                    request.ReqID = Convert.ToInt32(dataReader["ReqID"]);
                    request.CommunityID = Convert.ToInt32(dataReader["CommunityID"]);
                    request.DueDate = Convert.ToDateTime(dataReader["DueDate"]);
                    request.DueTime = dataReader["DueTime"].ToString(); 
                    request.PostDate = Convert.ToDateTime(dataReader["PostDate"]);
                    request.PostTime = dataReader["PostTime"].ToString();
                    request.Description = dataReader["ReqDescription"].ToString();
                    request.CategoryId = Convert.ToInt32(dataReader["CategoryID"]);
                    request.UserReqID = Convert.ToInt32(dataReader["UserID"]);
                    
                    if (dataReader["GotHelp"].ToString() == "t")
                    {
                        request.GotHelp = true;
                    }
                    else
                    {
                        request.GotHelp = false;
                    }





                    ReqList.Add(request);

                }
                return ReqList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand GetAllUserRequestsByCommunityStoredProcedureCommand(String spName, SqlConnection con, int UserID, int CommunityID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@UserID", UserID);
            cmd.Parameters.AddWithValue("@CommunityID", CommunityID);
          


            return cmd;
        }
        
        
        //--------------------------------------------------------------------------------------------------
        // read Active Req by category
        //--------------------------------------------------------------------------------------------------
        public List<RequestForHelp> GetAllRequests()
        {

            SqlConnection con;
            SqlCommand cmd;
            List<RequestForHelp> ReqList = new List<RequestForHelp>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = GetAllRequestsStoredProcedureCommand("spGetAllRequests", con);

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    RequestForHelp request = new RequestForHelp();

                    request.ReqID = Convert.ToInt32(dataReader["ReqID"]);
                    request.CommunityID = Convert.ToInt32(dataReader["CommunityID"]);
                    request.DueDate = Convert.ToDateTime(dataReader["DueDate"]);
                    request.DueTime = dataReader["DueTime"].ToString(); 
                    request.PostDate = Convert.ToDateTime(dataReader["PostDate"]);
                    request.PostTime = dataReader["PostTime"].ToString();
                    request.Description = dataReader["ReqDescription"].ToString();
                    request.CategoryId = Convert.ToInt32(dataReader["CategoryID"]);
                    request.UserReqID = Convert.ToInt32(dataReader["UserID"]);

                    if (dataReader["GotHelp"].ToString() == "t")
                    {
                         request.GotHelp = true;
                    }
                    else
                    {
                        request.GotHelp = false;
                    }




                    ReqList.Add(request);

                }
                return ReqList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand GetAllRequestsStoredProcedureCommand(String spName, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            


            return cmd;
        }
        //--------------------------------------------------------------------------------------------------
        // read all categories
        //--------------------------------------------------------------------------------------------------
        public List<Category> GetAllCategories()
        {

            SqlConnection con;
            SqlCommand cmd;
            List<Category> CategoryList = new List<Category>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadAllCategoryStoredProcedureCommand("spReadAllCategories", con);

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    Category category = new Category();

                    category.CategroyID = Convert.ToInt32(dataReader["CategoryID"]);
                    category.CatName = dataReader["catName"].ToString();
                    category.MaxScore = Convert.ToInt32(dataReader["MaxScore"]);
                    category.IconName = dataReader["IconName"].ToString();

                    CategoryList.Add(category);

                }
                return CategoryList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand ReadAllCategoryStoredProcedureCommand(String spName, SqlConnection con)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

          

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // read All Active Req 
        //--------------------------------------------------------------------------------------------------
        public List<object> GetAllActiveReqInCommunity(int communityID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<object> ReqList = new List<object>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            cmd = ReadActiveReqStoredProcedureCommand("spGetActiveRequests", con, communityID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    RequestForHelp request = new RequestForHelp();

                    request.ReqID = Convert.ToInt32(dataReader["ReqID"]);
                    request.CommunityID = Convert.ToInt32(dataReader["CommunityID"]);
                    
                    request.DueDate = Convert.ToDateTime(dataReader["DueDate"]);
                    request.DueTime = dataReader["DueTime"].ToString();
                    request.PostDate = Convert.ToDateTime(dataReader["PostDate"]);
                    request.PostTime = dataReader["PostTime"].ToString(); 
                    request.Description = dataReader["ReqDescription"].ToString();
                    request.CategoryId = Convert.ToInt32(dataReader["CategoryID"]);
                    request.UserReqID = Convert.ToInt32(dataReader["UserID"]);

                    string FullName = dataReader["FullName"].ToString();
                    string ProfilePic = dataReader["ProfilePic"].ToString();

                    var result = new { Request = request, FullNameOfReq = FullName, ProfilePicture= ProfilePic };

                    ReqList.Add(result);

                }

                return ReqList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand ReadActiveReqStoredProcedureCommand(String spName, SqlConnection con, int communityID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@communityID", communityID);


            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // read specific Req 
        //--------------------------------------------------------------------------------------------------
        public object GetSpecificReq(int ReqID)

        {

            SqlConnection con;
            SqlCommand cmd;
            object result = null;
            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            cmd = GetSpecificReqStoredProcedureCommand("spGetSpecificRequest", con, ReqID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
              


                while (dataReader.Read())
                {
                    RequestForHelp request = new RequestForHelp();

                    request.ReqID = Convert.ToInt32(dataReader["ReqID"]);
                    request.CommunityID = Convert.ToInt32(dataReader["CommunityID"]);

                    request.DueDate = Convert.ToDateTime(dataReader["DueDate"]);
                    request.DueTime = dataReader["DueTime"].ToString();
                    request.PostDate = Convert.ToDateTime(dataReader["PostDate"]);
                    request.PostTime = dataReader["PostTime"].ToString();
                    request.Description = dataReader["ReqDescription"].ToString();
                    request.CategoryId = Convert.ToInt32(dataReader["CategoryID"]);
                    request.UserReqID = Convert.ToInt32(dataReader["UserID"]);

                    string FullName = dataReader["FullName"].ToString();
                    string ProfilePic = dataReader["ProfilePic"].ToString();

                    result = new { Request = request, FullNameOfReq = FullName, ProfilePicture = ProfilePic };


                }

                return result;

                

                

            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand GetSpecificReqStoredProcedureCommand(String spName, SqlConnection con, int ReqID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@ReqID", ReqID);


            return cmd;
        } 
        
        //--------------------------------------------------------------------------------------------------
        // read All Active Req if the user does not submit to help them 
        //--------------------------------------------------------------------------------------------------
        public List<object> GetActiveRequestsByUser(int communityID, int userID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<object> ReqList = new List<object>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            cmd = GetActiveRequestsByUserStoredProcedureCommand("spGetActiveRequestsByUser", con, communityID, userID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    RequestForHelp request = new RequestForHelp();

                    request.ReqID = Convert.ToInt32(dataReader["ReqID"]);
                    request.CommunityID = Convert.ToInt32(dataReader["CommunityID"]);
                    
                    request.DueDate = Convert.ToDateTime(dataReader["DueDate"]);
                    request.DueTime = dataReader["DueTime"].ToString();
                    request.PostDate = Convert.ToDateTime(dataReader["PostDate"]);
                    request.PostTime = dataReader["PostTime"].ToString(); 
                    request.Description = dataReader["ReqDescription"].ToString();
                    request.CategoryId = Convert.ToInt32(dataReader["CategoryID"]);
                    request.UserReqID = Convert.ToInt32(dataReader["UserID"]);
                    char IsActive = Convert.ToChar(dataReader["GotHelp"]);
                    if (IsActive == 't')
                    {
                        request.GotHelp = true;
                    }
                    else
                    {
                        request.GotHelp = false;

                    }
                    string FullName = dataReader["FullName"].ToString();
                    string ProfilePic = dataReader["ProfilePic"].ToString();

                    var result = new { Request = request, FullNameOfReq = FullName, ProfilePicture = ProfilePic };

                    ReqList.Add(result);

                }

                return ReqList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }   
        
        //--------------------------------------------------------------------------------------------------
        // read All Active Req if the user is submit to help them 
        //--------------------------------------------------------------------------------------------------
        public List<object> GetActiveRequestsByUserInProgress(int communityID, int userID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<object> ReqList = new List<object>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            cmd = GetActiveRequestsByUserStoredProcedureCommand("spGetActiveRequestsByUserInProgress", con, communityID, userID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    RequestForHelp request = new RequestForHelp();

                    request.ReqID = Convert.ToInt32(dataReader["ReqID"]);
                    request.CommunityID = Convert.ToInt32(dataReader["CommunityID"]);
                    
                    request.DueDate = Convert.ToDateTime(dataReader["DueDate"]);
                    request.DueTime = dataReader["DueTime"].ToString();
                    request.PostDate = Convert.ToDateTime(dataReader["PostDate"]);
                    request.PostTime = dataReader["PostTime"].ToString(); 
                    request.Description = dataReader["ReqDescription"].ToString();
                    request.CategoryId = Convert.ToInt32(dataReader["CategoryID"]);
                    request.UserReqID = Convert.ToInt32(dataReader["UserID"]);

                    string FullName = dataReader["FullName"].ToString();
                    string WantToAsisstStatus = dataReader["WantToAsisstStatus"].ToString();
                    string ProfilePic = dataReader["ProfilePic"].ToString();

                    var result = new { Request = request, FullNameOfReq = FullName, Status = WantToAsisstStatus, ProfilePicture = ProfilePic };

                    ReqList.Add(result);

                }

                return ReqList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand GetActiveRequestsByUserStoredProcedureCommand(String spName, SqlConnection con, int communityID, int userID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@communityID", communityID);
            cmd.Parameters.AddWithValue("@UserID", userID);


            return cmd;
        }



        //--------------------------------------------------------------------------------------------------
        // read All The requests that this user was halped to other users
        //--------------------------------------------------------------------------------------------------
        public List<object> GetAllNeedToRate(int UserID, int CommunityID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<object> NeedToRanking = new List<object>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            cmd = InsertNewManagerWithStoredProcedure("spGetAllNeedToRate", con, UserID, CommunityID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    int categoryID = Convert.ToInt32(dataReader["CategoryID"]);
                    string catName = dataReader["catName"].ToString();

                    int ReqID = Convert.ToInt32(dataReader["ReqID"]);
                    DateTime DueDate = Convert.ToDateTime(dataReader["DueDate"]);
                    string DueTime = dataReader["DueTime"].ToString();

                    string AssistantFullName = dataReader["AssistantFullName"].ToString();
                    string ProfilePic = dataReader["ProfilePic"].ToString();
                    int AssistantUserID = Convert.ToInt32(dataReader["UserID"]);
                    char Gender = Convert.ToChar(dataReader["Gender"]);


                    var result = new { categoryID = categoryID, categoryName = catName, ReqID = ReqID,
                        DueDateReq = DueDate, DueTimeReq = DueTime, AssistantFullName = AssistantFullName, ProfilePic = ProfilePic,
                        AssistantUserID = AssistantUserID, Gender = Gender
                    };

                    NeedToRanking.Add(result);

                }

                return NeedToRanking;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        } 
        
        //--------------------------------------------------------------------------------------------------
        // read All The requests that this user was halped to other users
        //--------------------------------------------------------------------------------------------------
        public List<object> GetAllTheReqThatUserHelped(int UserID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<object> ReqList = new List<object>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            cmd = GetAllTheReqThatUserHelpedStoredProcedureCommand("spGetHelpersForUser", con, UserID);             // create the command

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    RequestForHelp request = new RequestForHelp();

                    request.ReqID = Convert.ToInt32(dataReader["ReqID"]);
                    request.CommunityID = Convert.ToInt32(dataReader["CommunityID"]);                    
                    request.DueDate = Convert.ToDateTime(dataReader["DueDate"]);
                    request.DueTime = dataReader["DueTime"].ToString();
                    request.PostDate = Convert.ToDateTime(dataReader["PostDate"]);
                    request.PostTime = dataReader["PostTime"].ToString(); 
                    request.Description = dataReader["ReqDescription"].ToString();
                    request.CategoryId = Convert.ToInt32(dataReader["CategoryID"]);
                    request.UserReqID = Convert.ToInt32(dataReader["UserID"]);
                     char IsActive = Convert.ToChar(dataReader["GotHelp"]);
                    if (IsActive == 't')
                    {
                        request.GotHelp = true;
                    }
                    else
                    {
                        request.GotHelp = false;

                    }
                    string FullName = dataReader["FullName"].ToString();
                    string ProfilePic = dataReader["RequesterProfilePic"].ToString();

                    var result = new { Request = request, FullNameOfReq = FullName, ProfilePicture = ProfilePic };

                    ReqList.Add(result);

                }

                return ReqList;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand GetAllTheReqThatUserHelpedStoredProcedureCommand(String spName, SqlConnection con, int UserID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@UserID", UserID);


            return cmd;
        }



        //--------------------------------------------------------------------------------------------------
        // Details update of the request
        //--------------------------------------------------------------------------------------------------
        public int UpdateRequestDetails(RequestForHelp request) //(CCEC)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReqUpdateCommandWithStoredProcedure("spUpdateRequest", con, request); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        private SqlCommand ReqUpdateCommandWithStoredProcedure(String spName, SqlConnection con, RequestForHelp request)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            //cmd.Parameters.AddWithValue("@PostDate", request.PostDate);
            cmd.Parameters.AddWithValue("@ReqID", request.ReqID);
            cmd.Parameters.AddWithValue("@DueDate", request.DueDate);
            cmd.Parameters.AddWithValue("@DueTime", Convert.ToDateTime(request.DueDate.ToString("HH:mm")).TimeOfDay);
            cmd.Parameters.AddWithValue("@ReqDescription", request.Description);
            cmd.Parameters.AddWithValue("@CategoryID", request.CategoryId);
            cmd.Parameters.AddWithValue("@CommunityID", request.CommunityID);


            return cmd;
        }


        //--------------------------------------------------------------------------------------------------
        // Details update user status: Reject', 'accepted', 'closed'. reject-delete from wantToAsisst table, accept-change the status,
        // closed- GotHelp in RequestForAssistanceApp tern to 't' and all the other people that want to asisst are delete exept the on
        // that close
        //--------------------------------------------------------------------------------------------------
        public int UpdateWantToAsisstStatus(int userId, int reqId, string approvalStatus) //(CCEC)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = UpdateWantToAsisstStatusCommandWithStoredProcedure("spUpdateWantToAsisstStatus", con, userId, reqId, approvalStatus); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }
        private SqlCommand UpdateWantToAsisstStatusCommandWithStoredProcedure(String spName, SqlConnection con, int userId, int reqId, string approvalStatus)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            //cmd.Parameters.AddWithValue("@PostDate", request.PostDate);
            cmd.Parameters.AddWithValue("@ReqID", reqId);
            cmd.Parameters.AddWithValue("@Status", approvalStatus);
            cmd.Parameters.AddWithValue("@UserID", userId);
         


            return cmd;
        }




        //--------------------------------------------------------------------------------------------------
        // insert new user who want to assist
        //--------------------------------------------------------------------------------------------------

        public int InsertNewUserWantToAssist(int UserID, int ReqID)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReqInsertNewUserWantToAssistCommandWithStoredProcedure("spInsertUsersWantToAssist", con, UserID, ReqID); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        //  Insert New User Want To Assist
        //----------------------------------------------------------------------------------------
        private SqlCommand ReqInsertNewUserWantToAssistCommandWithStoredProcedure(String spName, SqlConnection con, int UserID, int ReqID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@ReqID", ReqID);
            cmd.Parameters.AddWithValue("@UserID", UserID);
       

            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // read all the user that want to assist and waiting
        //--------------------------------------------------------------------------------------------------
        public List<User> GetAllWantToAssistPending(int reqID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<User> users = new List<User>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadAllUserWantToAssistStoredProcedureCommand("spReadAllPandingWantToAssist", con,reqID);

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    User s = new User();

                    s.UserId = Convert.ToInt32(dataReader["UserID"]);
                    s.FirstName = dataReader["FirstName"].ToString();
                    s.LastName = dataReader["LastName"].ToString();
                    s.PhoneNum = dataReader["PhoneNumber"].ToString();
                    s.Password = dataReader["uPassword"].ToString();
                    s.Gender = Convert.ToChar(dataReader["Gender"]);
                    s.City = dataReader["City"].ToString();
                    s.Street = dataReader["Street"].ToString();
                    s.HomeNum = Convert.ToInt16(dataReader["HomeNumber"]);
                    s.BirthDate = Convert.ToDateTime(dataReader["BirthDate"]);
                    s.Description = dataReader["uDescription"].ToString();
                    s.ProfilePicture = dataReader["ProfilePic"].ToString();
                    s.Score = Convert.ToInt32(dataReader["Score"]);
                    s.Rating = Convert.ToDouble(dataReader["Rating"]);
                    s.Password = dataReader["uPassword"].ToString();
                    s.IsActive = Convert.ToChar(dataReader["isInHold"]);
                    //s.IsActive = Convert.ToBoolean(dataReader["IsActive"]);
                    users.Add(s);




                }
                return users;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        private SqlCommand ReadAllUserWantToAssistStoredProcedureCommand(String spName, SqlConnection con, int reqID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@ReqID", reqID);
           


            return cmd;
        }
        //--------------------------------------------------------------------------------------------------
        //read all the user that want to assist and they accepted
        //--------------------------------------------------------------------------------------------------
        public List<User> AllWantToAssistAccepted(int reqID)
        {

            SqlConnection con;
            SqlCommand cmd;
            List<User> users = new List<User>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadAllUserWantToAssistStoredProcedureCommand("spReadAllAcceptedWantToAssist", con, reqID);

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {
                    User s = new User();
                    s.UserId = Convert.ToInt32(dataReader["UserID"]);
                    s.FirstName = dataReader["FirstName"].ToString();
                    s.LastName = dataReader["LastName"].ToString();
                    s.PhoneNum = dataReader["PhoneNumber"].ToString();
                    s.Password = dataReader["uPassword"].ToString();
                    s.Gender = Convert.ToChar(dataReader["Gender"]);
                    s.City = dataReader["City"].ToString();
                    s.Street = dataReader["Street"].ToString();
                    s.HomeNum = Convert.ToInt16(dataReader["HomeNumber"]);
                    s.BirthDate = Convert.ToDateTime(dataReader["BirthDate"]);
                    s.Description = dataReader["uDescription"].ToString();
                    s.ProfilePicture = dataReader["ProfilePic"].ToString();
                    s.Score = Convert.ToInt32(dataReader["Score"]);
                    s.Rating = Convert.ToDouble(dataReader["Rating"]);
                    s.Password = dataReader["uPassword"].ToString();
                    s.IsActive = Convert.ToChar(dataReader["isInHold"]);
                    //s.IsActive = Convert.ToBoolean(dataReader["IsActive"]);
                    users.Add(s);

                }
                return users;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }


        //--------------------------------------------------------------------------------------------------
        // insert new Request
        //--------------------------------------------------------------------------------------------------

        public int PostRankingForUser(int UserID, int ReqID, float Ranking, string Description)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = PostRankingForUserCommandWithStoredProcedure("spAddAndCalculateRating", con, UserID, ReqID, Ranking, Description); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        //  SqlCommand using a stored procedur
        //----------------------------------------------------------------------------------------
        private SqlCommand PostRankingForUserCommandWithStoredProcedure(String spName, SqlConnection con, int UserID, int ReqID, float Ranking, string Description)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

           
            cmd.Parameters.AddWithValue("@UserID", UserID);
            cmd.Parameters.AddWithValue("@ReqID", ReqID);
            cmd.Parameters.AddWithValue("@Ranking", Ranking);
            cmd.Parameters.AddWithValue("@Description", Description);        


            return cmd;
        }

        //--------------------------------------------------------------------------------------------------
        // read All what the user offers to want to assist 
        //--------------------------------------------------------------------------------------------------
        //public List<object> GetUserOffersToAssist(int userID, int communityID)
        //{

        //    SqlConnection con;
        //    SqlCommand cmd;
        //    List<object> ReqList = new List<object>();

        //    try
        //    {
        //        con = connect("myProjDB"); // create the connection
        //    }
        //    catch (Exception ex)
        //    {
        //        // write to log
        //        throw (ex);
        //    }
        //    cmd = GetUserOffersToAssistStoredProcedureCommand("spUserOffersToAssist", con, userID, communityID);             // create the command

        //    try
        //    {
        //        SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

        //        while (dataReader.Read())
        //        {
        //            RequestForHelp request = new RequestForHelp();

        //            request.ReqID = Convert.ToInt32(dataReader["ReqID"]);
        //            request.CommunityID = Convert.ToInt32(dataReader["CommunityID"]);
        //            request.DueDate = Convert.ToDateTime(dataReader["DueDate"]);
        //            request.DueTime = dataReader["DueTime"].ToString();
        //            request.PostDate = Convert.ToDateTime(dataReader["PostDate"]);
        //            request.PostTime = dataReader["PostTime"].ToString();
        //            request.Description = dataReader["ReqDescription"].ToString();
        //            request.CategoryId = Convert.ToInt32(dataReader["CategoryID"]);
        //            request.UserReqID = Convert.ToInt32(dataReader["UserID"]);

        //            string WantToAsisstStatus = dataReader["WantToAsisstStatus"].ToString();

        //            var result = new { Request = request, Status = WantToAsisstStatus };

        //            ReqList.Add(result);

        //        }

        //        return ReqList;
        //    }
        //    catch (Exception ex)
        //    {
        //        // write to log
        //        throw (ex);
        //    }

        //    finally
        //    {
        //        if (con != null)
        //        {
        //            // close the db connection
        //            con.Close();
        //        }
        //    }

        //}

        //private SqlCommand GetUserOffersToAssistStoredProcedureCommand(String spName, SqlConnection con,  int userID, int communityID)
        //{

        //    SqlCommand cmd = new SqlCommand(); // create the command object

        //    cmd.Connection = con;              // assign the connection to the command object

        //    cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        //    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        //    cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        //    cmd.Parameters.AddWithValue("@UserID", userID);
        //    cmd.Parameters.AddWithValue("@CommunityID", communityID);


        //    return cmd;
        //}



        //--------------------------------------
        //Coupon
        //--------------------------------------


        //--------------------------------------------------------------------------------------------------
        // insert new Coupon
        //--------------------------------------------------------------------------------------------------

        public int insertNewCoupon(Coupon coupon)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = InsertNewCouponWithStoredProcedure("spInsertNewCoupon", con, coupon); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        //  SqlCommand using a stored procedur
        //----------------------------------------------------------------------------------------
        private SqlCommand InsertNewCouponWithStoredProcedure(String spName, SqlConnection con, Coupon coupon)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@CouponPic", coupon.Picture);
            cmd.Parameters.AddWithValue("@CouponCost", coupon.Cost);
            cmd.Parameters.AddWithValue("@CouponDescription", coupon.Description);
            cmd.Parameters.AddWithValue("@BusinessAddress", coupon.BusinessAddress);
            cmd.Parameters.AddWithValue("@BusinessName", coupon.BusinessName);
            cmd.Parameters.AddWithValue("@BusinessNumber", coupon.BusinessNumber);
            cmd.Parameters.AddWithValue("@Quantity", coupon.Quantity);
            cmd.Parameters.AddWithValue("@CouponDueDate", coupon.DueDate);
            cmd.Parameters.AddWithValue("@CommunityID", coupon.CommunityID);
           


            return cmd;
        }


        //--------------------------------------------------------------------------------------------------
        // get all coupons by community
        //--------------------------------------------------------------------------------------------------


        public List<Coupon> GetAllCouponsByCommunity(int CommunityID)
        {
            SqlConnection con;
            SqlCommand cmd;
            List<Coupon> coupons = new List<Coupon>();

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = ReadAllCouponsStoredProcedureCommand("spReadAllCouponsByCommunity", con, CommunityID);

            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                while (dataReader.Read())
                {                    
                    Coupon coupon = new Coupon();


                    coupon.CouponID = Convert.ToInt32(dataReader["CouponID"]);
                    coupon.Picture = dataReader["CouponPic"].ToString();
                    coupon.Cost = Convert.ToInt32(dataReader["CouponCost"]);
                    coupon.Description = dataReader["CouponDescription"].ToString();
                    coupon.BusinessAddress = dataReader["BusinessAddress"].ToString();
                    coupon.BusinessName = dataReader["BusinessName"].ToString();
                    coupon.BusinessNumber = dataReader["BusinessNumber"].ToString();
                    coupon.Quantity = Convert.ToInt32(dataReader["Quantity"]);
                    coupon.DueDate = Convert.ToDateTime(dataReader["CouponDueDate"]);
                    coupon.CommunityID = Convert.ToInt32(dataReader["CommunityID"]);

                    coupons.Add(coupon);
                }

                return coupons;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        //  SqlCommand using a stored procedur
        //----------------------------------------------------------------------------------------
        private SqlCommand ReadAllCouponsStoredProcedureCommand(String spName, SqlConnection con, int CommunityID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

      
            cmd.Parameters.AddWithValue("@CommunityID", CommunityID);

            return cmd;
        }


        //--------------------------------------------------------------------------------------------------
        // insert new Coupon
        //--------------------------------------------------------------------------------------------------

        public int deleteCoupon(int couponID)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = deleteCouponWithStoredProcedure("spDeleteCoupon", con, couponID); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }
        //----------------------------------------------------------------------------------------
        //  SqlCommand using a stored procedur
        //----------------------------------------------------------------------------------------
        private SqlCommand deleteCouponWithStoredProcedure(String spName, SqlConnection con, int couponID)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

           
            cmd.Parameters.AddWithValue("@couponID", couponID);

            return cmd;
        }

    }
}
