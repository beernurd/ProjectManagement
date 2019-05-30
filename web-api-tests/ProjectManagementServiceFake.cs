using System;
using System.Collections.Generic;
using System.Linq;
using Entities;
using Entities.Models;
using Contracts;
using Repository;

namespace web_api_tests
{
    public class ProjectRepositoryFake : IProjectRepository
    {
        private readonly List<Project> _projects;
        private readonly List<Contact> _contacts1;
        private readonly List<Contact> _contacts2;
        private readonly List<Contact> _contacts3;
        private readonly Dictionary<Guid, List<Contact>> _projectWithContacts;

        public ProjectRepositoryFake()
        {
            _projects = new List<Project>()
            {
                new Project { Id = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200"),
                    Name = "project 1", Priority="High", Status = "On Track" },
                new Project { Id = new Guid("815accac-fd5b-478a-a9d6-f171a2f6ae7f"),
                    Name = "project 2", Priority="Medium", Status = "Off Track" },
                new Project { Id = new Guid("33704c4a-5b87-464c-bfb6-51971b4d18ad"),
                    Name = "project 3", Priority="Low", Status = "At Risk" }
            };

            _contacts1 = new List<Contact>()
            {
                new Contact { Id = new Guid("aa2bd817-98cd-4cf3-a80a-53ea0cd9c200"),
                    Name = "contact 1", Email="abc", Address = "efg" },
            };

            _contacts2 = new List<Contact>()
            {
                new Contact { Id = new Guid("aa2bd817-98cd-4cf3-a80a-53ea0cd9c200"),
                    Name = "contact 2", Email="abc", Address = "efg" },
                new Contact { Id = new Guid("885accac-fd5b-478a-a9d6-f171a2f6ae7f"),
                    Name = "contact 3", Email="123", Address = "456" },

            };

            _contacts3 = new List<Contact>()
            {
                new Contact { Id = new Guid("aa2bd817-98cd-4cf3-a80a-53ea0cd9c200"),
                    Name = "contact 4", Email="abc", Address = "efg" },
                new Contact { Id = new Guid("885accac-fd5b-478a-a9d6-f171a2f6ae7f"),
                    Name = "contact 5", Email="123", Address = "456" },
                new Contact { Id = new Guid("77704c4a-5b87-464c-bfb6-51971b4d18ad"),
                    Name = "contact 6", Email="hij", Address = "klm" }
            };

            _projectWithContacts = new Dictionary<Guid, List<Contact>>();
            _projectWithContacts.Add(new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200"), _contacts1);
            _projectWithContacts.Add(new Guid("815accac-fd5b-478a-a9d6-f171a2f6ae7f"), _contacts2);
            _projectWithContacts.Add(new Guid("33704c4a-5b87-464c-bfb6-51971b4d18ad"), _contacts3);
        }

        public IEnumerable<Project> GetAllProjects()
        {
            return _projects;
        }

        public Project GetProjectById(Guid id)
        {
            return _projects.Where(a => a.Id == id)
                .DefaultIfEmpty(new Project())
                .FirstOrDefault();
        }

        public IEnumerable<Contact> GetContactsById(Guid id)
        {
            return _projectWithContacts[id];
        }

        public void CreateProject(Project newItem)
        {
            newItem.Id = Guid.NewGuid();
            _projects.Add(newItem);
        }

        public void AddContact(Guid id, IEnumerable<Contact> contacts)
        {
            _projectWithContacts.Add(id, contacts.ToList<Contact>());
        }

        public void UpdateProject(Project dbProject, Project project)
        {
            dbProject.Name = project.Name;
            dbProject.Priority = project.Priority;
            dbProject.Status = dbProject.Status;
        }

        public void DeleteProject(Project project)
        {
            var existing = _projects.First(a => a.Id == project.Id);
            _projects.Remove(existing);
        }

        public void DeleteContact(Guid id, IEnumerable<Contact> contacts)
        {
            List<Contact> origList = _projectWithContacts[id];
            HashSet<Guid> guids = new HashSet<Guid>();
            foreach (var contact in contacts)
            {
                guids.Add(contact.Id);
            }
            int count = origList.Count;
            for (int i = count - 1; i >= 0; i--)
            {
                if(guids.Contains(origList.ElementAt(i).Id))
                {
                    origList.Remove(origList.ElementAt(i));
                }
            }
        }
    }

    public class RepositoryWrapperFake : IRepositoryWrapper
    {
        private RepositoryContext _repoContext;
        private IContactRepository _contact;
        private IProjectRepository _project;

        public IContactRepository Contact
        {
            get
            {
                if (_contact == null)
                {
                    _contact = new ContactRepository(_repoContext);
                }

                return _contact;
            }
        }

        public IProjectRepository Project
        {
            get
            {
                if (_project == null)
                {
                    _project = new ProjectRepositoryFake();
                }

                return _project;
            }
        }

        public RepositoryWrapperFake(RepositoryContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }
    }
}
