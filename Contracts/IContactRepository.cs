using Entities.Models;
using System;
using System.Collections.Generic;

namespace Contracts
{
    public interface IContactRepository
    {
        IEnumerable<Contact> GetAllContacts();
        Contact GetContactById(Guid contactId);
        void CreateContact(Contact contact);
        void UpdateContact(Contact dbContact, Contact contact);
        void DeleteContact(Contact contact);
    }
}
