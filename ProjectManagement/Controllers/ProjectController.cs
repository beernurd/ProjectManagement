using Contracts;
using Entities.Extensions;
using Entities.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace ProjectManagement.Controllers
{
    [Route("api/project")]
    public class ProjectController : Controller
    {
        private IRepositoryWrapper _repository;

        public ProjectController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllProjects()
        {
            try
            {
                var projects = _repository.Project.GetAllProjects();
                return Ok(projects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("contacts/{id}")]
        public IActionResult GetContactsById(Guid id)
        {
            try
            {
                var contacts = _repository.Project.GetContactsById(id);
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}", Name = "ProjectById")]
        public IActionResult GetProjectById(Guid id)
        {
            try
            {
                var project = _repository.Project.GetProjectById(id);
                if (project.IsEmptyObject())
                {
                    return NotFound();
                }
                else
                {
                    return Ok(project);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("addcontact/{id}")]
        public IActionResult AddContact(Guid id, [FromBody]IEnumerable<Contact> contacts)
        {
            try
            {
                if (contacts == null)
                {
                    return BadRequest("Contact object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                _repository.Project.AddContact(id, contacts);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public IActionResult CreateProject([FromBody]Project project)
        {
            try
            {
                if (project.IsObjectNull())
                {
                    return BadRequest("Project object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                _repository.Project.CreateProject(project);

                return CreatedAtRoute("ProjectById", new { id = project.Id }, project);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProject(Guid id, [FromBody]Project project)
        {
            try
            {
                if (project.IsObjectNull())
                {
                    return BadRequest("Project object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                var dbProject = _repository.Project.GetProjectById(id);
                if (dbProject.IsEmptyObject())
                {
                    return NotFound();
                }

                _repository.Project.UpdateProject(dbProject, project);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProject(Guid id)
        {
            try
            {
                var project = _repository.Project.GetProjectById(id);
                if (project.IsEmptyObject())
                {
                    return NotFound();
                }

                _repository.Project.DeleteProject(project);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("deletecontact/{id}")]
        public IActionResult DeleteContact(Guid id, [FromBody]IEnumerable<Contact> contacts)
        {
            try
            {
                if (contacts == null)
                {
                    return BadRequest("Contact object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                _repository.Project.DeleteContact(id, contacts);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
