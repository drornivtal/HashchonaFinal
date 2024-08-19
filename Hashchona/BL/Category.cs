namespace Hashchona.BL
{
    public class Category
    {
        int categoryID;
        string catName;
        int maxScore;
        string iconName;

        public Category() { }

        public Category(int categroyID, string catName, int maxScore, string iconName)
        {
            CategroyID = categroyID;
            CatName = catName;
            MaxScore = maxScore;
            IconName = iconName;
        }

        public int CategroyID { get => categoryID; set => categoryID = value; }
        public string CatName { get => catName; set => catName = value; }
        public int MaxScore { get => maxScore; set => maxScore = value; }
        public string IconName { get => iconName; set => iconName = value; }
    }
}
