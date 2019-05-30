using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using ProjectManagement.Controllers;
using Entities.Models;
using Contracts;
using System.Linq;

namespace web_api_tests
{
    public class ProjectManagementControllerTest
    {
        ProjectController _controller;
        IRepositoryWrapper _repoWrapper;

        public ProjectManagementControllerTest()
        {
            _repoWrapper = new RepositoryWrapperFake(null);
            _controller = new ProjectController(_repoWrapper);
        }

        [Fact]
        public void GetAllProjects_ReturnsOkResult()
        {
            var okResult = _controller.GetAllProjects();
            Assert.IsType<OkObjectResult>(okResult);
        }

        [Fact]
        public void GetAllProjects_ReturnsAllItems()
        {
            var okResult = _controller.GetAllProjects() as OkObjectResult;
            var items = Assert.IsType<List<Project>>(okResult.Value);
            Assert.Equal(3, items.Count);
        }

        [Fact]
        public void GetProjectById_ReturnsNotFoundResult()
        {
            var notFoundResult = _controller.GetProjectById(Guid.NewGuid());
            Assert.IsType<NotFoundResult>(notFoundResult);
        }

        [Fact]
        public void GetProjectById_ReturnsOkResult()
        {
            var testGuid = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200");
            var okResult = _controller.GetProjectById(testGuid);
            Assert.IsType<OkObjectResult>(okResult);
        }

        [Fact]
        public void GetById_ExistingGuidPassed_ReturnsRightItem()
        {
            var testGuid = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200");
            var okResult = _controller.GetProjectById(testGuid) as OkObjectResult;
            Assert.IsType<Project>(okResult.Value);
            Assert.Equal(testGuid, (okResult.Value as Project).Id);
        }

        [Fact]
        public void CreateProject_ReturnsBadRequest()
        {
            var nameMissingItem = new Project
            {
                Priority = "Low",
                Status = "At Risk"
            };
            _controller.ModelState.AddModelError("Name", "Required");
            var badResponse = _controller.CreateProject(nameMissingItem);
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }

        [Fact]
        public void CreateProject_ReturnsCreatedResponse()
        {
            Project testItem = new Project()
            {
                Name = "New Project",
                Priority = "High",
                Status = "On Track"
            };
            var createdResponse = _controller.CreateProject(testItem);
            Assert.IsType<CreatedAtRouteResult>(createdResponse);
        }

        [Fact]
        public void CreateProject_ReturnedResponseHasCreatedItem()
        {
            Project testItem = new Project()
            {
                Name = "Another New Project",
                Priority = "Medium",
                Status = "Off Track"
            };

            var createdResponse = _controller.CreateProject(testItem) as CreatedAtRouteResult;
            var item = createdResponse.Value as Project;

            Assert.IsType<Project>(item);
            Assert.Equal("Another New Project", item.Name);
        }

        [Fact]
        public void DeleteProject_ReturnsNotFoundResponse()
        {
            var notExistingGuid = Guid.NewGuid();
            var badResponse = _controller.DeleteProject(notExistingGuid);
            Assert.IsType<NotFoundResult>(badResponse);
        }

        [Fact]
        public void DeleteProject_ReturnsNoContentResult()
        {
            var existingGuid = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200");
            var okResponse = _controller.DeleteProject(existingGuid);
            Assert.IsType<NoContentResult>(okResponse);
        }

        [Fact]
        public void DeleteProject_RemovesOneItem()
        {
            var existingGuid = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200");
            _controller.DeleteProject(existingGuid);
            var okResponse = _controller.GetAllProjects() as OkObjectResult;
            var items = Assert.IsType<List<Project>>(okResponse.Value);
            Assert.Equal(2, items.Count());
        }

        [Fact]
        public void UpdateProject_ReturnsUpdatedContent()
        {
            var testGuid = new Guid("ab2bd817-98cd-4cf3-a80a-53ea0cd9c200");
            Project testItem = new Project()
            {
                Name = "Future Project",
                Priority = "Low",
                Status = "Off Track"
            };
            _controller.UpdateProject(testGuid, testItem);
            var okResult = _controller.GetProjectById(testGuid) as OkObjectResult;
            Assert.IsType<Project>(okResult.Value);
            Assert.Equal("Future Project", (okResult.Value as Project).Name);
        }

        [Fact]
        public void GetContactsById_ReturnsProjectContacts()
        {
            var testGuid = new Guid("815accac-fd5b-478a-a9d6-f171a2f6ae7f");
            var okResult = _controller.GetContactsById(testGuid) as OkObjectResult;
            var items = Assert.IsType<List<Contact>>(okResult.Value);
            Assert.Equal(2, items.Count);
        }

        [Fact]
        public void DeleteContact_ReturnsRemainingContacts()
        {
            var projGuid = new Guid("33704c4a-5b87-464c-bfb6-51971b4d18ad");
            Contact contact = new Contact
            {
                Id = new Guid("885accac-fd5b-478a-a9d6-f171a2f6ae7f"),
                Name = "contact 5",
                Email = "123",
                Address = "456"
            };
            List<Contact> contactList = new List<Contact>();
            contactList.Add(contact);
            _controller.DeleteContact(projGuid, contactList);
            var okResult = _controller.GetContactsById(projGuid) as OkObjectResult;
            var items = Assert.IsType<List<Contact>>(okResult.Value);
            Assert.Equal(2, items.Count);
        }
    }
}
