using System.Collections.Generic;
using System.Linq;
using System;
using Contracts;
using Entities;
using Entities.Extensions;
using Entities.Models;

namespace Repository
{
    public class ContactRepository: RepositoryBase<Contact>, IContactRepository
    {
        public ContactRepository(RepositoryContext repositoryContext)
            :base(repositoryContext)
        {
        }

        public IEnumerable<Contact> GetAllContacts()
        {
            return FindAll()
                .OrderBy(con => con.Name);
        }

        public Contact GetContactById(Guid contactId)
        {
            return FindByCondition(contact => contact.Id.Equals(contactId))
                    .DefaultIfEmpty(new Contact())
                    .FirstOrDefault();
        }

        public void CreateContact(Contact contact)
        {
            contact.Id = Guid.NewGuid();
            Create(contact);
            Save();
        }

        public void UpdateContact(Contact dbContact, Contact contact)
        {
            dbContact.Map(contact);
            Update(dbContact);
            Save();
        }

        public void DeleteContact(Contact contact)
        {
            Delete(contact);
            Save();
        }
    }
}
