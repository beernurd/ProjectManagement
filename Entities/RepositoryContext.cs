using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Entities
{
    public class RepositoryContext: DbContext
    {
        public RepositoryContext(DbContextOptions options)
            :base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ContactsInProject>()
                .HasKey(e => new { e.ContactId, e.ProjectId });
            builder.Entity<ContactsInProject>()
                        .HasOne(e => e.Contact)
                        .WithMany(p => p.ContactsInProject)
                        .HasForeignKey(x => x.ContactId);
            builder.Entity<ContactsInProject>()
                        .HasOne(e => e.Project)
                        .WithMany(p => p.ContactsInProject)
                        .HasForeignKey(x => x.ProjectId);
            base.OnModelCreating(builder);
        }

    }
}
