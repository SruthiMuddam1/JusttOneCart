using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using JustOneCart.InputModels;
using JustOneCart.Models;

namespace JustOneCart.Controllers
{
    public class user1Controller : ApiController
    {
        private JustOneCartEntities1 db = new JustOneCartEntities1();

        // GET: api/user1
        public IQueryable<user1> Getusers1()
        {
            return db.users1;
        }

        // GET: api/user1/5
        [ResponseType(typeof(user1))]
        public IHttpActionResult Getuser1(int id)
        {
            user1 user1 = db.users1.Find(id);
            if (user1 == null)
            {
                return NotFound();
            }

            return Ok(user1);
        }

        [Route("Authenticate")]
        // GET: api/user1/
        public user1 Authenticate(Login login)
        {
            var user = db.users1.Where(s => s.firstName == login.username && s.password == login.password).FirstOrDefault();
            if (user != null)
                return user;
            else
                return null;
        }

        // PUT: api/user1/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putuser1(int id, user1 user1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user1.Id)
            {
                return BadRequest();
            }

            db.Entry(user1).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!user1Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/user1
        [ResponseType(typeof(user1))]
        public IHttpActionResult Postuser1(user1 user1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.users1.Add(user1);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user1.Id }, user1);
        }

        // DELETE: api/user1/5
        [ResponseType(typeof(user1))]
        public IHttpActionResult Deleteuser1(int id)
        {
            user1 user1 = db.users1.Find(id);
            if (user1 == null)
            {
                return NotFound();
            }

            db.users1.Remove(user1);
            db.SaveChanges();

            return Ok(user1);
        }

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}

        private bool user1Exists(int id)
        {
            return db.users1.Count(e => e.Id == id) > 0;
        }
    }
}