using Contracts;
using Entities.Extensions;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace ProjectManagement.Controllers
{
    [Route("api/contact")]
    public class ContactController : Controller
    {
        private IRepositoryWrapper _repository;

        public ContactController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllContacts()
        {
            try
            {
                var contacts = _repository.Contact.GetAllContacts();
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}", Name = "ContactById")]
        public IActionResult GetContactById(Guid id)
        {
            try
            {
                var contact = _repository.Contact.GetContactById(id);
                if (contact.IsEmptyObject())
                {
                    return NotFound();
                }
                else
                {
                    return Ok(contact);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public IActionResult CreateContact([FromBody]Contact contact)
        {
            try
            {
                if (contact.IsObjectNull())
                {
                    return BadRequest("Contact object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                _repository.Contact.CreateContact(contact);

                return CreatedAtRoute("ContactById", new { id = contact.Id }, contact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateContact(Guid id, [FromBody]Contact contact)
        {
            try
            {
                if (contact.IsObjectNull())
                {
                    return BadRequest("Contact object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                var dbContact = _repository.Contact.GetContactById(id);
                if (dbContact.IsEmptyObject())
                {
                    return NotFound();
                }

                _repository.Contact.UpdateContact(dbContact, contact);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteContact(Guid id)
        {
            try
            {
                var contact = _repository.Contact.GetContactById(id);
                if (contact.IsEmptyObject())
                {
                    return NotFound();
                }

                _repository.Contact.DeleteContact(contact);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
