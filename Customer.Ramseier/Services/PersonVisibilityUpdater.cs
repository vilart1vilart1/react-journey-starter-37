namespace Customer.Ramseier.Services
{
    using Crm.Library.BaseModel;
    using Crm.Library.Model;
    using Crm.Model;
    using System.Linq;

    public class PersonVisibilityUpdater
    {
        public PersonVisibilityUpdater()
        {
      
        }
        public void UpdatePersonVisibility(Person person,IQueryable<Usergroup> userGroups)
        {
            person.Visibility = Visibility.UserGroups;
            foreach (var userUserGroup in userGroups)
            {
                person.VisibleToUsergroupIds.Add(userUserGroup.Id);
            }
        }
    }
}