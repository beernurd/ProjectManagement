using System;
using System.Collections.Generic;
using System.Linq;
using Contracts;
using Entities;
using Entities.Models;
using Entities.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class ProjectRepository: RepositoryBase<Project>, IProjectRepository
    {
        public ProjectRepository(RepositoryContext repositoryContext)
            :base(repositoryContext)
        {
        }

        public IEnumerable<Project> GetAllProjects()
        {
            return FindAll()
                .OrderBy(proj => proj.Priority);
        }

        public IEnumerable<Contact> GetContactsById(Guid projectId)
        {
            Project proj = RepositoryContext.Projects
                .Include(p => p.ContactsInProject)
                .ThenInclude(cip => cip.Contact)
                .SingleOrDefault(p => p.Id == projectId);
            List<Contact> contacts = new List<Contact>();
            foreach (var cip in proj.ContactsInProject)
            {
                Contact contact = new Contact
                {
                    Id = cip.Contact.Id,
                    Name = cip.Contact.Name,
                    Email = cip.Contact.Email,
                    Address = cip.Contact.Address,
                };
                contacts.Add(contact);
            }
            
            return contacts;
        }

        public Project GetProjectById(Guid projectId)
        {
            return FindByCondition(project => project.Id.Equals(projectId))
                    .DefaultIfEmpty(new Project())
                    .FirstOrDefault();
        }

        public void AddContact(Guid projectId, IEnumerable<Contact> contacts)
        {

            Project proj = RepositoryContext.Projects
                .Include(p => p.ContactsInProject)
                .ThenInclude(cip => cip.Contact)
                .SingleOrDefault(p => p.Id == projectId);
            foreach (Contact contact in contacts)
            {
                var store = new ContactsInProject
                {
                    ProjectId = projectId,
                    ContactId = contact.Id
                };
                proj.ContactsInProject.Add(store);
            }
            Save();
        }

        public void CreateProject(Project project)
        {
            project.Id = Guid.NewGuid();
            Create(project);
            Save();
        }

        public void UpdateProject(Project dbProject, Project project)
        {
            dbProject.Map(project);
            Update(dbProject);
            Save();
        }

        public void DeleteProject(Project project)
        {
            Delete(project);
            Save();
        }

        public void DeleteContact(Guid projectId, IEnumerable<Contact> contacts)
        {
            Project proj = RepositoryContext.Projects
                .Include(p => p.ContactsInProject)
                .ThenInclude(cip => cip.Contact)
                .SingleOrDefault(p => p.Id == projectId);

            HashSet<Guid> guids = new HashSet<Guid>();
            foreach (var contact in contacts)
            {
                guids.Add(contact.Id);
            }

            var count = proj.ContactsInProject.Count;
            for (var i = count-1; i >= 0; i--)
            {
                if (guids.Contains(proj.ContactsInProject.ElementAt(i).ContactId))
                {
                    proj.ContactsInProject.Remove(proj.ContactsInProject.ElementAt(i));
                }
            }
            Save();
        }
    }
}
