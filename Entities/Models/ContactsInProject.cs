using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entities.Models
{
    public class ContactsInProject
    {
        [Key]
        public Guid ContactId { get; set; }
        public Contact Contact { get; set; }
        [Key]
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
