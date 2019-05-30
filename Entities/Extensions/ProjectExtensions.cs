using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Extensions
{
    public static class ProjectExtensions
    {
        public static void Map(this Project dbProject, Project project)
        {
            dbProject.Name = project.Name;
            dbProject.Status = project.Status;
            dbProject.Priority = project.Priority;
        }
    }
}
