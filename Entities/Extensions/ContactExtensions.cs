using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Extensions
{
    public static class ContactExtensions
    {
        public static void Map(this Contact dbContact, Contact contact)
        {
            dbContact.Name = contact.Name;
            dbContact.Email = contact.Email;
            dbContact.Address = contact.Address;
        }
    }
}
