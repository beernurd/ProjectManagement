using Entities.Models;
using System;
using System.Collections.Generic;

namespace Contracts
{
    public interface IProjectRepository
    {
        IEnumerable<Project> GetAllProjects();
        IEnumerable<Contact> GetContactsById(Guid projectId);
        Project GetProjectById(Guid projectId);
        void CreateProject(Project project);
        void AddContact(Guid projectId, IEnumerable<Contact> contacts);
        void UpdateProject(Project dbProject, Project project);
        void DeleteProject(Project project);
        void DeleteContact(Guid projectId, IEnumerable<Contact> contacts);
    }
}
