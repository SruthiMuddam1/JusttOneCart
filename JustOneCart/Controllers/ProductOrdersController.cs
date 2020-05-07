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
using JustOneCart.Models;

namespace JustOneCart.Controllers
{
    public class ProductOrdersController : ApiController
    {
        private JustOneCartEntities1 db = new JustOneCartEntities1();

        // GET: api/ProductOrders
        public IQueryable<ProductOrder> GetProductOrders()
        {
            return db.ProductOrders;
        }

        // GET: api/ProductOrders/5
        [ResponseType(typeof(ProductOrder))]
        public IHttpActionResult GetProductOrder(int id)
        {
            ProductOrder productOrder = db.ProductOrders.Find(id);
            if (productOrder == null)
            {
                return NotFound();
            }

            return Ok(productOrder);
        }

        // PUT: api/ProductOrders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProductOrder(int id, ProductOrder productOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productOrder.OrderId)
            {
                return BadRequest();
            }

            db.Entry(productOrder).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductOrderExists(id))
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

        // POST: api/ProductOrders
        [ResponseType(typeof(ProductOrder))]
        public IHttpActionResult PostProductOrder(ProductOrder productOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductOrders.Add(productOrder);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = productOrder.OrderId }, productOrder);
        }

        // DELETE: api/ProductOrders/5
        [ResponseType(typeof(ProductOrder))]
        public IHttpActionResult DeleteProductOrder(int id)
        {
            ProductOrder productOrder = db.ProductOrders.Find(id);
            if (productOrder == null)
            {
                return NotFound();
            }

            db.ProductOrders.Remove(productOrder);
            db.SaveChanges();

            return Ok(productOrder);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductOrderExists(int id)
        {
            return db.ProductOrders.Count(e => e.OrderId == id) > 0;
        }
    }
}